import store from '../store'
import localforage from 'localforage'

const beforeEach = async (to, from, next) => {
    store
        .dispatch('auth/checkTokenExists')
        .then(() => {
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
