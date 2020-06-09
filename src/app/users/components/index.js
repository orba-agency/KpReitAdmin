import Vue from 'vue'

export const Users = Vue.component('users', require('./Users.vue').default)
export const UserNew = Vue.component('user-new', require('./UserNew.vue').default)
export const UserView = Vue.component('user-view', require('./UserView.vue').default)
export const UserEdit = Vue.component('user-edit', require('./UserEdit.vue').default)
