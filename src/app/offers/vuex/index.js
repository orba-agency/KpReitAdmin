import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default {
    // Keep these under the auth namespace
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
