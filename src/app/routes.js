import Layout from '../components/Layout'
import NotFound from './NotFound'

import auth from './auth/routes'
import dashboard from './dashboard/routes'
import offers from './offers/routes'
import applications from './applications/routes'
import users from './users/routes'
import reports from './reports/routes'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'home',
        component: Layout,
        children: [...dashboard, ...offers],
    },
    ...auth,
    {
        path: '*',
        name: 'not-found',
        component: NotFound,
    },
]

export default routes
