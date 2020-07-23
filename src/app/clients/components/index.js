import Vue from 'vue'

export const Clients = Vue.component('clients', require('./Clients.vue').default)
export const ClientNew = Vue.component('client-new', require('./ClientNew.vue').default)
export const ClientView = Vue.component('client-view', require('./ClientView.vue').default)
export const ClientEdit = Vue.component('client-edit', require('./ClientEdit.vue').default)
