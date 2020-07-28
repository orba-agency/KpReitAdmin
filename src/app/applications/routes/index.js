import { Applications, ApplicationView, ApplicationEdit, ApplicationNew } from '../components'

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
        path: '/application-new',
        component: ApplicationNew,
        name: 'application-new',
        meta: {
            isAuthenticated: true,
            permission: 'application_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/application-new',
                    breadcrumbName: 'New Application',
                },
            ],
        },
    },
    {
        path: '/applications/:id/edit',
        component: ApplicationEdit,
        name: 'application-edit',
        meta: {
            isAuthenticated: true,
            permission: 'application_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/application-edit',
                    breadcrumbName: 'Edit Application',
                },
            ],
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
