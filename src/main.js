import Vue from 'vue'
import App from './App.vue'
import router from './router'
import localforage from 'localforage'
import store from './store'
import { iconsSet as icons } from './assets/icons.js'
import 'core-js/stable'

localforage.config({
  driver: localforage.LOCALSTORAGE,
})

Vue.config.productionTip = false

import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);

new Vue({
  router,
  store,
  icons,
  render: h => h(App),
}).$mount('#app')
