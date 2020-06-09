import { Currencies, CurrencyNew, CurrencyView, CurrencyEdit } from '../components'

export default [
    {
        path: '/currencies',
        component: Currencies,
        name: 'currencies',
        meta: {
            isAuthenticated: true,
            permission: 'currency_access',
        },
    },
    {
        path: '/currency-new',
        component: CurrencyNew,
        name: 'currency-new',
        meta: {
            isAuthenticated: true,
            permission: 'currency_create',
        },
    },
    {
        path: '/currencies/:id/edit',
        component: CurrencyEdit,
        name: 'currency-edit',
        meta: {
            isAuthenticated: true,
            permission: 'currency_edit',
        },
    },
    {
        path: '/currencies/:id',
        component: CurrencyView,
        name: 'currency-view',
        meta: {
            isAuthenticated: true,
            permission: 'currency_show',
        },
    },
]
