import Repository from '../../../repository'

export const fetchSettings = ({ commit }, { payload, context }) => {
    return Repository.get(`/settings`)
        .then((response) => {
            context.form = response.data
        })
        .catch((error) => {})
}

export const updateSettings = ({ commit }, { payload, context }) => {
    context.errors = []
    context.message = null

    return Repository.post(`/settings`, payload.form)
        .then((response) => {})
        .catch((error) => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}
