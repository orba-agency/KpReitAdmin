import Repository from '../../../repository'

export const fetchAll = ({ commit }, payload) => {
    var queryString = ``

    if (payload.all) {
        queryString = `?all=true`
    } else {
        const page = payload.page || 1
        queryString = `?page=${page}`
    }

    return Repository.get(`/roles${queryString}`).then((response) => {
        return response.data
    })
}

export const fetchRole = ({ commit }, { payload, context }) => {
    return Repository.get(`/roles/${payload.id}`)
        .then((response) => {
            context.role = response.data

            if (context.form) {
                context.form.title = response.data.title
                context.form.permissions = response.data.permissions.map((item) => {
                    return item.id
                })
                console.log(context)
            }
        })
        .catch((error) => {})
}

export const updateRole = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.put(`/roles/${payload.id}`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const deleteRecord = ({ commit }, { payload, context }) => {
    context.error = null
    return Repository.delete(`/roles/${payload.id}`)
        .then(() => {})
        .catch((error) => {
            context.error = error.response.data.message
        })
}

export const createRole = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post('/roles', payload)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
