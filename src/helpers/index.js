import { isEmpty } from 'lodash'

import Repository from '../repository'

export const setHttpToken = token => {
    console.log(token)
    if (isEmpty(token)) {
        Repository.defaults.headers.common['Authorization'] = null
    } else {
        Repository.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}

export const removeWrappedQuotesFromString = (str) => {
    // console.log('removeWrappedQuotesFromString', str && typeof str === 'string', str);
    return str && typeof str === 'string' ? str.replace(/^"(.*)"$/, '$1') : str;
};