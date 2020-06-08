import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    const page = payload.page || 1
    return Repository.get(`/permissions?page=${page}`).then((response) => {
        return response.data
    })
}

export const fetchPermission = ({ commit }, { payload, context }) => {
    return Repository.get(`/permissions/${payload.id}`)
        .then((response) => {
            context.permission = response.data
        })
        .catch((error) => {})
}

export const updatePermission = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/permissions/${payload.id}`, payload.permission)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/permissions/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createPermission = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/permissions', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
