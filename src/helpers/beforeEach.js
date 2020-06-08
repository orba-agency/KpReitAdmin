import store from '../store'
import localforage from 'localforage'
import { isEmpty } from 'lodash'

const beforeEach = async (to, from, next) => {
    store
        .dispatch('auth/checkTokenExists')
        .then(() => {
            if (
                !isEmpty(to.meta.permission) &&
                store.state.auth.user.permissions.findIndex((permission) => permission === to.meta.permission) === -1
            ) {
                next({ name: 'dashboard' })
                return
            }

            next()
        })
        .catch((error) => {
            if (to.meta.isAuthenticated) {
                localforage.setItem('intended', to.name)

                next({ name: 'login' })
                return
            }

            next()
        })
}

export default beforeEach
