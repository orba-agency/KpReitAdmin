import store from '../store'

const beforeEach = async (to, from, next) => {
    if(to.name === 'login' && store.getters['auth/isLoggedIn']){
        next('dashboard')
    } else  if(to.matched.some(record => record.meta.isAuthenticated)) {
        if(store.getters['auth/isLoggedIn']) {
            next()
            return
        } 
        next('login')
    } else {
        next()
    }
}

export default beforeEach
