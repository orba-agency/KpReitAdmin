import moment from 'moment'

export const setOfferData = (state, data) => {
    // state.offers.all = data.data
    state.offers.all = data.data.map((offer) => {
        return {
            key: offer.id,
            logo: offer.logo,
            title: offer.title,
            type: offer.type,
            broker: offer.broker.name,
            status: offer.status,
            unitPrice: `${offer.currency.symbol}${offer.unit_price} ${offer.currency.code}`,
            investmentDate: `${moment(offer.opening_date).format('MMM D')} - ${moment(offer.closing_date).format(
                'MMM D, YYYY'
            )}`,
        }
    })

    // state.offers.pagination.current = data.current_page
    state.offers.pagination.defaultCurrent = data.current_page
    // state.offers.pagination.defaultPageSize = data.per_page
    state.offers.pagination.pageSize = data.per_page
    state.offers.pagination.total = data.total
}
