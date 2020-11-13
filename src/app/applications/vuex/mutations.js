export const setApplications = (state, payload) => {
    state.applications.applications = payload.map((application) => {
        return {
            key: application.id,
            amountFormatted: `${application.offer.currency.symbol}${application.amount} ${application.offer.currency.code}`,
        }
    })
}
