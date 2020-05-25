import Repository from '../../../repository'

export const fetchOfferListing = ({commit, state}) => {
    return Repository.get('/offers').then(response => {
        commit('setOfferData', response.data)
    })
}