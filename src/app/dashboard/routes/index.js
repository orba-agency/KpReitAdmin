import { Dashboard } from '../components'

export default [
    {
        path: '/dashboard',
        breadcrumbName: 'dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            isAuthenticated: true,
            breadcrumb: [
                {
                    path: '/dashboard',
                    breadcrumbName: 'Dashboard',
                },
            ],
        },
    },
]
