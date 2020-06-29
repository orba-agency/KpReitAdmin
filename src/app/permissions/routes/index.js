import { Permissions, PermissionNew, PermissionEdit } from '../components'

const mainBC = {
    path: '/permissions',
    breadcrumbName: 'Permissions',
}

export default [
    {
        path: '/permissions',
        component: Permissions,
        name: 'permissions',
        meta: {
            isAuthenticated: true,
            permission: 'permission_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/permission-new',
        component: PermissionNew,
        name: 'permission-new',
        meta: {
            isAuthenticated: true,
            permission: 'permission_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/permission-new',
                    breadcrumbName: 'New Permission',
                },
            ],
        },
    },
    {
        path: '/permissions/:id/edit',
        component: PermissionEdit,
        name: 'permission-edit',
        meta: {
            isAuthenticated: true,
            permission: 'permission_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/permissions/:id/edit',
                    breadcrumbName: 'Edit Permission',
                },
            ],
        },
    },
]
