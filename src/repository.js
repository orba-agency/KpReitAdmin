import axios from 'axios'
import { removeWrappedQuotesFromString } from './helpers'
import localforage from 'localforage'
import store from './store'
import router from './router'

let baseDomain = 'https://kpapi.clientloop.io'

if (process.env.NODE_ENV === 'development') {
    // baseDomain = 'http://kpreitapi.test'
}

const baseVersionedUrl = `${baseDomain}/api/v1/admin`

let instance = axios.create({
    baseURL: baseVersionedUrl,
})

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

function onRrefreshed(token) {
    refreshSubscribers.map((cb) => cb(token))
}

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // console.log('TCL: err', err);

        if (!error.response) {
            return Promise.reject(error)
        }

        const {
            response: { status },
        } = error

        const originalRequest = error.config

        if (
            (originalRequest.url.indexOf('login') > -1 && status === 401) ||
            (originalRequest.url.indexOf('logout') > -1 && status === 401)
        ) {
            return Promise.reject({ error: { message: 'Please try logging in again' } })
        }

        // // Todo: change status to 498
        console.log('TCL: err', status)
        if (status === 401) {
            if (!isRefreshing && localforage.getItem('auth_token')) {
                console.log('TCL: err', status)
                isRefreshing = true

                store.dispatch('auth/refreshToken').then((newToken) => {
                    if (newToken) {
                        isRefreshing = false
                        onRrefreshed(newToken)
                        refreshSubscribers = []
                    } else {
                        console.log(router.currentRoute)
                        store.dispatch('auth/clearAuth').then(() => {
                            router.replace({ name: 'login' })
                        })
                    }
                })
            } else {
                return Promise.reject(error)
            }

            const retryOrigReq = new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    // replace the expired token and retry
                    originalRequest.headers.Authorization = `Bearer ${removeWrappedQuotesFromString(token)}`
                    resolve(instance(originalRequest))
                })
            })

            return retryOrigReq
        } else {
            return Promise.reject(error)
        }
    }
)

export default instance
