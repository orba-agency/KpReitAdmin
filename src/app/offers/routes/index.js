import { Offers, OfferView, OfferNew, OfferEdit } from '../components'

const mainBC = {
    path: '/offers',
    breadcrumbName: 'Offers',
}

export default [
    {
        path: '/offers',
        component: Offers,
        name: 'offers',
        meta: {
            isAuthenticated: true,
            permission: 'offer_access',
            breadcrumb: [mainBC],
        },
    },
    {
        path: '/offers/new',
        component: OfferNew,
        name: 'offer-new',
        meta: {
            isAuthenticated: true,
            permission: 'offer_create',
            breadcrumb: [
                mainBC,
                {
                    pathw: '/offers/new',
                    breadcrumbName: 'New Offer',
                },
            ],
        },
    },
    {
        path: '/offers/:id/edit',
        component: OfferEdit,
        name: 'offer-edit',
        meta: {
            isAuthenticated: true,
            permission: 'offer_edit',
            breadcrumb: [
                mainBC,
                {
                    pathw: '/offers/:id/edit',
                    breadcrumbName: 'Edit Offer',
                },
            ],
        },
    },
    {
        path: '/offers/:id',
        component: OfferView,
        name: 'offer-view',
        meta: {
            isAuthenticated: true,
            permission: 'offer_show',
            breadcrumb: [
                mainBC,
                {
                    pathw: '/offers/:id',
                    breadcrumbName: 'View Offer',
                },
            ],
        },
    },
]
