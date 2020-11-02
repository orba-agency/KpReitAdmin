import Repository from '../../../repository'

export const fetchOfferingSummary = ({ commit }, { payload, context }) => {
    return Repository.get(`/reports/offering-summary`)
        .then((response) => {
            context.report = response.data
        })
        .catch((error) => {})
}
