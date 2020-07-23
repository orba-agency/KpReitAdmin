import { Applications, ApplicationView } from '../components'

const mainBC = {
    path: '/applications',
    breadcrumbName: 'Applications',
}

export default [
    {
        path: '/applications',
        component: Applications,
        name: 'applications',
        meta: {
            isAuthenticated: true,
            permission: 'application_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/applications/:id',
        component: ApplicationView,
        name: 'application-view',
        meta: {
            isAuthenticated: true,
            permission: 'application_show',
            breadcrumb: [
                mainBC,
                {
                    path: '/applications/:id',
                    breadcrumbName: 'View Application',
                },
            ],
        },
    },
]
