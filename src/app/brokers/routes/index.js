import { Brokers, BrokerNew, BrokerEdit } from '../components'

const mainBC = {
    path: '/brokers',
    breadcrumbName: 'Brokers',
}

export default [
    {
        path: '/brokers',
        component: Brokers,
        name: 'brokers',
        meta: {
            isAuthenticated: true,
            permission: 'broker_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/broker-new',
        component: BrokerNew,
        name: 'broker-new',
        meta: {
            isAuthenticated: true,
            permission: 'broker_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/broker-new',
                    breadcrumbName: 'New Broker',
                },
            ],
        },
    },
    {
        path: '/brokers/:id/edit',
        component: BrokerEdit,
        name: 'broker-edit',
        meta: {
            isAuthenticated: true,
            permission: 'broker_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/broker-edit',
                    breadcrumbName: 'Edit Broker',
                },
            ],
        },
    },
]
