import Repository from '../../../repository'

export const fetchAllBanks = ({ commit }) => {
    Repository.get('/banks').then((response) => {
        commit('setBanks', response.data)
    })
}

export const fetchAllBrokers = ({ commit }) => {
    Repository.get('/brokers').then((response) => {
        commit('setBrokers', response.data)
    })
}

export const fetchAllCurrencies = ({ commit }) => {
    Repository.get('/currencies').then((response) => {
        commit('setCurrencies', response.data)
    })
}
