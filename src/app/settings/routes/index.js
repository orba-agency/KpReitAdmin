import { Setting } from '../components'

const mainBC = {
    path: '/settings',
    breadcrumbName: 'Settings',
}

export default [
    {
        path: '/settings',
        component: Setting,
        name: 'settings',
        meta: {
            isAuthenticated: true,
            permission: 'setting_access',
            breadcrumb: [mainBC],
        },
    },
]
