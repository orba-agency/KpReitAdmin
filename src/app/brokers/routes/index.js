import { Brokers, BrokerNew, BrokerEdit } from '../components'

export default [
    {
        path: '/brokers',
        component: Brokers,
        name: 'brokers',
        meta: {
            isAuthenticated: true,
            permission: 'broker_access',
        },
    },
    {
        path: '/broker-new',
        component: BrokerNew,
        name: 'broker-new',
        meta: {
            isAuthenticated: true,
            permission: 'broker_create',
        },
    },
    {
        path: '/brokers/:id/edit',
        component: BrokerEdit,
        name: 'broker-edit',
        meta: {
            isAuthenticated: true,
            permission: 'broker_edit',
        },
    },
]
