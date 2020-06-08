import { Permissions, PermissionNew, PermissionEdit } from '../components'

export default [
    {
        path: '/permissions',
        component: Permissions,
        name: 'permissions',
        meta: {
            isAuthenticated: true,
            permission: 'permission_access',
        },
    },
    {
        path: '/permission-new',
        component: PermissionNew,
        name: 'permission-new',
        meta: {
            isAuthenticated: true,
            permission: 'permission_create',
        },
    },
    {
        path: '/permissions/:id/edit',
        component: PermissionEdit,
        name: 'permission-edit',
        meta: {
            isAuthenticated: true,
            permission: 'permission_edit',
        },
    },
]
