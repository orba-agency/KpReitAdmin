import { Roles, RoleNew, RoleView, RoleEdit } from '../components'

export default [
    {
        path: '/roles',
        component: Roles,
        name: 'roles',
        meta: {
            isAuthenticated: true,
            permission: 'role_access',
        },
    },
    {
        path: '/role-new',
        component: RoleNew,
        name: 'role-new',
        meta: {
            isAuthenticated: true,
            permission: 'role_create',
        },
    },
    {
        path: '/roles/:id/edit',
        component: RoleEdit,
        name: 'role-edit',
        meta: {
            isAuthenticated: true,
            permission: 'role_edit',
        },
    },
    {
        path: '/roles/:id',
        component: RoleView,
        name: 'role-view',
        meta: {
            isAuthenticated: true,
            permission: 'role_show',
        },
    },
]
