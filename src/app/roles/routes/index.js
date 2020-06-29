import { Roles, RoleNew, RoleView, RoleEdit } from '../components'

const mainBC = {
    path: '/roles',
    breadcrumbName: 'Roles',
}

export default [
    {
        path: '/roles',
        component: Roles,
        name: 'roles',
        meta: {
            isAuthenticated: true,
            permission: 'role_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/role-new',
        component: RoleNew,
        name: 'role-new',
        meta: {
            isAuthenticated: true,
            permission: 'role_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/role-new',
                    breadcrumbName: 'New Role',
                },
            ],
        },
    },
    {
        path: '/roles/:id/edit',
        component: RoleEdit,
        name: 'role-edit',
        meta: {
            isAuthenticated: true,
            permission: 'role_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/roles/:id/edit',
                    breadcrumbName: 'Edit Role',
                },
            ],
        },
    },
    {
        path: '/roles/:id',
        component: RoleView,
        name: 'role-view',
        meta: {
            isAuthenticated: true,
            permission: 'role_show',
            breadcrumb: [
                mainBC,
                {
                    path: '/roles/:id',
                    breadcrumbName: 'View Role',
                },
            ],
        },
    },
]
