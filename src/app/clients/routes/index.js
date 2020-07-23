import { Clients, ClientNew, ClientView, ClientEdit } from '../components'

const mainBC = {
    path: '/clients',
    breadcrumbName: 'Clients',
}

export default [
    {
        path: '/clients',
        component: Clients,
        name: 'clients',
        meta: {
            isAuthenticated: true,
            permission: 'client_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/client-new',
        component: ClientNew,
        name: 'client-new',
        meta: {
            isAuthenticated: true,
            permission: 'client_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/client-new',
                    breadcrumbName: 'New Client',
                },
            ],
        },
    },
    {
        path: '/clients/:id/edit',
        component: ClientEdit,
        name: 'client-edit',
        meta: {
            isAuthenticated: true,
            permission: 'client_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/clients/:id/edit',
                    breadcrumbName: 'Edit Client',
                },
            ],
        },
    },
    {
        path: '/clients/:id',
        component: ClientView,
        name: 'client-view',
        meta: {
            isAuthenticated: true,
            permission: 'client_show',
            breadcrumb: [
                mainBC,
                {
                    path: '/clients/:id',
                    breadcrumbName: 'View Client',
                },
            ],
        },
    },
]
