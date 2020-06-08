import Layout from '../components/Layout'
import NotFound from './NotFound'

import auth from './auth/routes'
import dashboard from './dashboard/routes'
import offers from './offers/routes'
import applications from './applications/routes'
import users from './users/routes'
import permissions from './permissions/routes'
import roles from './roles/routes'
import reports from './reports/routes'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'home',
        component: Layout,
        children: [...dashboard, ...offers, ...permissions, ...roles],
    },
    ...auth,
    {
        path: '*',
        name: 'not-found',
        component: NotFound,
    },
]

export default routes
