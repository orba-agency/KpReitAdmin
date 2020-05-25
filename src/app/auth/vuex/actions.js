import Repository from '../../../repository'

import { setHttpToken } from '../../../helpers'
import localforage from 'localforage'

export const login = ({dispatch}, {payload, context}) => {
    context.errors = []
    context.message = null
    return Repository.post('/auth/login', payload)
        .then(response => {
            dispatch('setToken', response.data.token)
        })
        .catch(error => {
            context.errors = error.response.data.errors || []
            context.message = error.response.data.message
        })
}

export const logout = ({ dispatch }) => {
    return Repository.get('/auth/logout')
        .then(() => {
            dispatch('clearAuth')
        })
        .catch(error => {
            dispatch('clearAuth')
            console.log(error)
        })
}

export const fetchUser = async ({ commit }) => {
    try {
        const response = await Repository.get('/user/me')
        commit('setAuthenticated', true)
        commit('setUserData', response.data)
    } catch(error) {
        return
    } 
}

export const setToken = ({ commit }, token) => {
    commit('setToken', token)
    setHttpToken(token)
}

export const clearAuth = ({ commit }) => {
    commit('setAuthenticated', false)
    commit('setToken', null)
    commit('setUserData', null)
    setHttpToken(null)
}

export const refreshToken = async ({ dispatch}) => {
    try {
        const response = await Repository.get('/auth/refresh-token')
        dispatch('setToken', response.data.token)   
        return response.data.token
    } catch(err) {
        return
    }
}

export const hydrate = async ({dispatch}) => {
    try {
        const token = await localforage.getItem('auth_token')
        dispatch('setToken', token)
        return token
    } catch(err) {
        return
    }
}