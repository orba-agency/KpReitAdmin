import { Users, UserNew, UserView, UserEdit } from '../components'

export default [
    {
        path: '/users',
        component: Users,
        name: 'users',
        meta: {
            isAuthenticated: true,
            permission: 'user_access',
        },
    },
    {
        path: '/user-new',
        component: UserNew,
        name: 'user-new',
        meta: {
            isAuthenticated: true,
            permission: 'user_create',
        },
    },
    {
        path: '/users/:id/edit',
        component: UserEdit,
        name: 'user-edit',
        meta: {
            isAuthenticated: true,
            permission: 'user_edit',
        },
    },
    {
        path: '/users/:id',
        component: UserView,
        name: 'user-view',
        meta: {
            isAuthenticated: true,
            permission: 'user_show',
        },
    },
]
