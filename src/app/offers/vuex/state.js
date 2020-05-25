const getOfferState = () => {
    return {
        prefix: null,
        title: null,
        shortName: null,
        description: null,
        type: null,
        marketType: "Private",
        status: null,
        openingDate: null,
        closingDate: null,
        unitPrice: null,
        minimum: null,
        maximum: null,
        available: null,
        incrementSize: null,
        published: null,
        logo: null,
        thumbnailLogo: null,
        link: null,
        researchLink: null,
        createdAt: null,
        updatedAt: null
    }
}

export default {
    offer: getOfferState(),
    offers: {
        all: []
    }
}