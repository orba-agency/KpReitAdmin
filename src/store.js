import Vue from 'vue'
import Vuex from 'vuex'

import auth from './app/auth/vuex'
import offers from './app/offers/vuex'
import permissions from './app/permissions/vuex'
import roles from './app/roles/vuex'
import currencies from './app/currencies/vuex'

Vue.use(Vuex)

const mutations = {
    set(state, [variable, value]) {
        state[variable] = value
    },
}

const state = {
    sidebarShow: true,
}

export default new Vuex.Store({
    modules: {
        auth,
        offers,
        permissions,
        roles,
        currencies,
    },
    mutations,
    state,
})
