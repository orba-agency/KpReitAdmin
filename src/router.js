import Vue from 'vue'
import Router from 'vue-router'

import beforeEach from './helpers/beforeEach'

import { routes } from './app/index'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: routes
})

router.beforeEach(beforeEach)

export default router