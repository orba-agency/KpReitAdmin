import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    var queryString = ``

    if (payload.all) {
        queryString = `?all=true`
    } else {
        const page = payload.page || 1
        queryString = `?page=${page}`
    }

    return Repository.get(`/clients${queryString}`).then((response) => {
        return response.data
    })
}

export const fetchUser = ({ commit }, { payload, context }) => {
    return Repository.get(`/clients/${payload.id}`)
        .then((response) => {
            context.user = response.data

            if (context.form) {
                context.form.first_name = response.data.first_name
                context.form.last_name = response.data.last_name
                context.form.roles = response.data.roles.map((item) => {
                    return item.id
                })
            }
        })
        .catch((error) => {})
}

export const updateUser = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/clients/${payload.id}`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/clients/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createUser = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/clients', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const makeAccreditedInvestor = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.put(`/clients/${payload.id}/accredited_investor`)
        .then((response) => {
            return response
        })
        .catch((error) => {
            context.error = error.response.data.message
        })
}
