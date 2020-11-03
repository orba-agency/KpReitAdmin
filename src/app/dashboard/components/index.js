import Vue from 'vue'

export const Dashboard = Vue.component('dashboard', require('./Dashboard.vue').default)
export const PieChart = Vue.component('pie-chart', require('./PieChart.vue').default)
export const BarChart = Vue.component('bar-chart', require('./BarChart.vue').default)
