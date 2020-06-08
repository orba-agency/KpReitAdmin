import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    const page = payload.page || 1
    return Repository.get(`/permissions?page=${page}`).then((response) => {
        return response.data
    })
}
