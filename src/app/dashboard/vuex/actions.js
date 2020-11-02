import Repository from '../../../repository'

export const fetchDashboard = ({ commit }, { payload, context }) => {
    return Repository.get(`/dashboard`)
        .then((response) => {
            context.data = response.data
        })
        .catch((error) => {})
}
