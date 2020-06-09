import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    var queryString = ``

    if (payload.all) {
        queryString = `?all=true`
    } else {
        const page = payload.page || 1
        queryString = `?page=${page}`
    }

    return Repository.get(`/brokers${queryString}`).then((response) => {
        return response.data
    })
}

export const fetchBroker = ({ commit }, { payload, context }) => {
    return Repository.get(`/brokers/${payload.id}`)
        .then((response) => {
            context.broker = response.data
        })
        .catch((error) => {})
}

export const updateBroker = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/brokers/${payload.id}`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/brokers/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createBroker = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/brokers', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
