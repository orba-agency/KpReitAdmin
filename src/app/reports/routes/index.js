import { Reports, OfferingSummary } from '../components'

const mainBC = {
    path: '/reports',
    breadcrumbName: 'Reports',
}

export default [
    {
        path: '/reports',
        component: Reports,
        name: 'reports',
        meta: {
            isAuthenticated: true,
            permission: 'report_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/reports/offering-summary',
        component: OfferingSummary,
        name: 'offering-summary',
        meta: {
            isAuthenticated: true,
            permission: 'report_access',
            breadcrumb: [
                mainBC,
                {
                    pathw: '/reports/offering-summary',
                    breadcrumbName: 'Offering Summary',
                },
            ],
        },
    },
]
