import Vue from 'vue'

// Need the .default or will spit errors about template or render function not defined
// https://github.com/vuejs/vue-router/issues/713#issuecomment-341070680
export const Offers = Vue.component('offers', require('./Offers.vue').default)
export const OfferView = Vue.component('offer-view', require('./OfferView.vue').default)
export const OfferNew = Vue.component('offer-new', require('./OfferNew.vue').default)
export const OfferEdit = Vue.component('offer-edit', require('./OfferEdit.vue').default)