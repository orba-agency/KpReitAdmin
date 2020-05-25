import Vue from 'vue'
import Vuex from 'vuex'

import auth from './app/auth/vuex'
import offers from './app/offers/vuex'

Vue.use(Vuex)

const mutations = {
    set (state, [variable, value]) {
        state[variable] = value
    },
}

const state = {
    sidebarShow: true
}

export default new Vuex.Store({
    modules: {
        auth,
        offers
    },
    mutations,
    state
})