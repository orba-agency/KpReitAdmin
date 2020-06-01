import { Offers, OfferView, OfferNew, OfferEdit } from '../components'

export default [
    {
        path: '/offers',
        component: Offers,
        name: 'offers',
        meta: {
            isAuthenticated: true,
        },
    },
    {
        path: '/offers/new',
        component: OfferNew,
        name: 'offer-new',
        meta: {
            isAuthenticated: true,
        },
    },
    {
        path: '/offers/:id/edit',
        component: OfferEdit,
        name: 'offer-edit',
        meta: {
            isAuthenticated: true,
        },
    },
    {
        path: '/offers/:id',
        component: OfferView,
        name: 'offer-view',
        meta: {
            isAuthenticated: true,
        },
    },
]
