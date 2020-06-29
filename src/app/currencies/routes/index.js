import { Currencies, CurrencyNew, CurrencyView, CurrencyEdit } from '../components'

const mainBC = {
    path: '/currencies',
    breadcrumbName: 'Currencies',
}

export default [
    {
        path: '/currencies',
        component: Currencies,
        name: 'currencies',
        meta: {
            isAuthenticated: true,
            permission: 'currency_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/currency-new',
        component: CurrencyNew,
        name: 'currency-new',
        meta: {
            isAuthenticated: true,
            permission: 'currency_create',
            breadcrumb: [
                mainBC,
                {
                    path: '/currency-new',
                    breadcrumbName: 'New Currency',
                },
            ],
        },
    },
    {
        path: '/currencies/:id/edit',
        component: CurrencyEdit,
        name: 'currency-edit',
        meta: {
            isAuthenticated: true,
            permission: 'currency_edit',
            breadcrumb: [
                mainBC,
                {
                    path: '/currency-edit',
                    breadcrumbName: 'Edit Currency',
                },
            ],
        },
    },
    {
        path: '/currencies/:id',
        component: CurrencyView,
        name: 'currency-view',
        meta: {
            isAuthenticated: true,
            permission: 'currency_show',
            breadcrumb: [
                mainBC,
                {
                    path: '/currency-view',
                    breadcrumbName: 'View Currency',
                },
            ],
        },
    },
]
