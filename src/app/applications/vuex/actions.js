import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    var queryString = ``

    if (payload.all) {
        queryString = `?all=true`
    } else {
        const page = payload.page || 1
        queryString = `?page=${page}`
    }

    if (payload.status) {
        queryString += '&status=' + payload.status
    }

    return Repository.get(`/applications`, { params: payload }).then((response) => {
        // return Repository.get(`/applications${queryString}`).then((response) => {
        return response.data
    })
}

export const fetchApplication = ({ commit }, { payload, context }) => {
    return Repository.get(`/applications/${payload.id}`)
        .then((response) => {
            context.application = response.data
        })
        .catch((error) => {})
}

export const updateApplication = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/applications/${payload.id}`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/applications/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createApplication = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/applications', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const approveApplication = ({ commit }, { payload, context }) => {
    return Repository.put(`/applications/${payload.id}/approve`)
        .then((response) => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const rejectApplication = ({ commit }, { payload, context }) => {
    context.error = ''
    return Repository.put(`/applications/${payload.id}/reject`, { reason: payload.reason })
        .then((response) => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}
