import { Users, UserNew, UserView, UserEdit } from '../components'

const mainBC = {
    path: '/users',
    breadcrumbName: 'Users',
}

export default [
    {
        path: '/users',
        component: Users,
        name: 'users',
        meta: {
            isAuthenticated: true,
            permission: 'user_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/user-new',
        component: UserNew,
        name: 'user-new',
        meta: {
            isAuthenticated: true,
            permission: 'user_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/user-new',
                    breadcrumbName: 'New User',
                },
            ],
        },
    },
    {
        path: '/users/:id/edit',
        component: UserEdit,
        name: 'user-edit',
        meta: {
            isAuthenticated: true,
            permission: 'user_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/users/:id/edit',
                    breadcrumbName: 'Edit User',
                },
            ],
        },
    },
    {
        path: '/users/:id',
        component: UserView,
        name: 'user-view',
        meta: {
            isAuthenticated: true,
            permission: 'user_show',
            breadcrumb: [
                mainBC,
                {
                    path: '/users/:id',
                    breadcrumbName: 'View User',
                },
            ],
        },
    },
]
