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

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

// export const downloadDocument = async function (id, config) {
//     const result = await Repository.download<ErrorResponseData, ApplicationModel>(
//        `${APPLICATION_BASE_ENDPOINT}/${id}/generate`,
//        { ext: 'pdf', fileName: 'Application', mimeType: 'application/pdf' },
//        config
//     );
//     return matchAndTransfrom(
//        result,
//        (error) => returnErrorData(error),
//        (data) => {
//           if (data.form_link) {
//              let link = document.createElement('a');
//              link.href = data.form_link;
//              link.download = `${'Application'}-${data.offer.title}.${'pdf'}`;
//              link.target = '_blank';
//              link.click();
//           }
//        }
//     );
//  });
