import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    var queryString = ``

    if (payload.all) {
        queryString = `?all=true`
    } else {
        const page = payload.page || 1
        queryString = `?page=${page}`
    }

    return Repository.get(`/currencies${queryString}`).then((response) => {
        return response.data
    })
}

export const fetchCurrency = ({ commit }, { payload, context }) => {
    return Repository.get(`/currencies/${payload.id}`)
        .then((response) => {
            context.currency = response.data
        })
        .catch((error) => {})
}

export const updateCurrency = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/currencies/${payload.id}`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/currencies/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createCurrency = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/currencies', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
