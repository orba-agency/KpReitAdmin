import { Login, Forgot, Reset } from '../components'

export default [
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/forgot',
        component: Forgot,
        name: 'forgot',
    },
    {
        path: '/reset/:token',
        component: Reset,
        name: 'reset',
    }
]