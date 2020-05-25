import Repository from '../../../repository'

import isEmpty from 'lodash'

import localforage from 'localforage'
import { setHttpToken } from '../../../helpers'

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
        .then(response => {
            dispatch('clearAuth')
        })
        .catch(error => {
            console.log(error)
        })
}

export const fetchUser = ({ commit, dispatch }) => {
    return Repository.get('/user/me').then(response => {
        commit('setAuthenticated', true)
        commit('setUserData', response.data)
    })
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

export const refreshToken = async ({commit, dispatch}) => {
    try {
        const response = await Repository.get('/auth/refresh-token')
        dispatch('setToken', response.data.token)   
        return response.data.token
    } catch(err) {
        return
    }
}