import localforage from 'localforage'
import { isEmpty } from 'lodash'

export const setToken = (state, token) => {
    if (isEmpty(token)) {
        localforage.removeItem('auth_token')
        return
    }

    localforage.setItem('auth_token', token)
    state.user.token = token
}

export const setAuthenticated = (state, trueOrFalse) => {
    state.user.authenticated = trueOrFalse
}

export const setPermissions = (state, data) => {
    state.user.permissions = data
}

export const setUserData = (state, data) => {
    state.user.data = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
    }
}
