import { isEmpty } from 'lodash'

import Repository from '../repository'

export const setHttpToken = (token) => {
    console.log(token)
    if (isEmpty(token)) {
        Repository.defaults.headers.common['Authorization'] = null
    } else {
        Repository.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}

export const removeWrappedQuotesFromString = (str) => {
    // console.log('removeWrappedQuotesFromString', str && typeof str === 'string', str);
    return str && typeof str === 'string' ? str.replace(/^"(.*)"$/, '$1') : str
}

export const upload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    }

    try {
        let result = await Repository.post('/uploads', formData)
        return result.data
    } catch (err) {
        console.log(err)
        return
    }
}
