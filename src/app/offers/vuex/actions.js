import Repository from '../../../repository'

export const fetchOfferListing = ({ commit, state }, payload) => {
    const page = payload.page || 1
    return Repository.get(`/offers?page=${page}`).then((response) => {
        commit('setOfferData', response.data)
        return response.data
    })
}

export const fetchOffer = ({ commit }, { payload, context }) => {
    return Repository.get(`/offers/${payload.id}`).then((response) => {
        context.offer = response.data
    })
}

export const createOffer = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/offers', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
