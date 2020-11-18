<template>
    <div class="main-container">
        <a-card title="Offer View" :bordered="false" :loading="!state.loaded">
            <div slot="extra">
                <router-link :to="{ name: 'offer-edit', params: { id: $route.params.id } }">Edit</router-link>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="Are you sure？"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteOffer($route.params.id)"
                >
                    <a>Delete</a>
                </a-popconfirm>
            </div>
            <a-tabs @change="callback">
                <a-tab-pane key="1" tab="Details">
                    <OfferDetail v-bind:offer="offer" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="Payment Instructions">
                    <OfferPayment v-bind:payments="offer.payments" v-bind:offer_id="offer.id" @update-offer="update" />
                </a-tab-pane>
                <a-tab-pane key="3" tab="Fees">
                    <OfferFees v-bind:fees="offer.fees" />
                </a-tab-pane>
                <a-tab-pane key="4" tab="Gallery">
                    <OfferGallery v-bind:galleries="galleries" />
                </a-tab-pane>
                <a-tab-pane key="5" tab="Videos">
                    <OfferVideo v-bind:videos="videos" />
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import OfferDetail from '../partials/OfferDetail'
import OfferFees from '../partials/OfferFees'
import OfferGallery from '../partials/OfferGallery'
import OfferVideo from '../partials/OfferVideo'
import OfferPayment from '../partials/OfferPayment'

export default {
    components: {
        OfferDetail,
        OfferFees,
        OfferGallery,
        OfferVideo,
        OfferPayment,
    },
    data() {
        return {
            offer: {},
            galleries: [],
            videos: [],
            state: {
                loaded: false,
            },
        }
    },
    watch: {
        offer: function (newData) {
            this.offer.galleries.forEach((element) => {
                if (element.type === 'Photo') {
                    this.galleries.push({
                        gallery_id: element.id,
                        uid: element.id,
                        name: Date.now().toString(),
                        status: 'done',
                        url: element.url,
                    })
                }

                if (element.type === 'Video') {
                    this.videos.push({
                        id: element.id,
                        key: element.id,
                        url: element.url,
                    })
                }
            })
        },
    },
    created() {
        this.fetchOffer({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {
            this.state.loaded = true
        })
    },
    methods: {
        ...mapActions({
            fetchOffer: 'offers/fetchOffer',
        }),
        callback(key) {
            console.log(key)
        },
        update(offer) {
            this.offer = offer
        },
    },
}
</script>
