import Vue from 'vue'
import App from './App.vue'
import router from './router'
import localforage from 'localforage'
import store from './store'
import { iconsSet as icons } from './assets/icons.js'
import Antd from 'ant-design-vue'
import 'core-js/stable'

localforage.config({
    driver: localforage.LOCALSTORAGE,
})
Vue.use(Antd)

store
    .dispatch('auth/setToken')
    .then(() => {
        store.dispatch('auth/fetchUser').catch(() => {
            // These complicate the development process by clearing state with hot reload etc so disable them locally
            if (process.env.NODE_ENV !== 'development') {
                store.dispatch('auth/clearAuth').catch(() => {})
                router.replace({ name: 'login' }).catch(() => {})
            }
        })
    })
    .catch(() => {
        // These complicate the development process by clearing state with hot reload etc so disable them locally
        if (process.env.NODE_ENV !== 'development') {
            store.dispatch('auth/clearAuth').catch(() => {})
        }
    })

Vue.config.productionTip = false

import CoreuiVue from '@coreui/vue'
Vue.use(CoreuiVue)

new Vue({
    router,
    store,
    icons,
    render: (h) => h(App),
}).$mount('#app')
