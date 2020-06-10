<template>
    <div class="main-container">
        <a-card title="Offer View" :bordered="false" :loading="!state.loaded">
            <a-tabs @change="callback">
                <a-tab-pane key="1" tab="Details">
                    <OfferDetail v-bind:offer="offer" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="Fees">
                    <OfferFees v-if="offer.fees" v-bind:fees="offer.fees" />
                </a-tab-pane>
                <a-tab-pane key="3" tab="Gallery">
                    <OfferGallery v-if="offer.galleries" v-bind:galleries="galleries" />
                </a-tab-pane>
                <a-tab-pane key="4" tab="Videos">
                    Content of Tab Pane 4
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

export default {
    components: {
        OfferDetail,
        OfferFees,
        OfferGallery,
    },
    data() {
        return {
            offer: {},
            galleries: [],
            state: {
                loaded: false,
            },
        }
    },
    watch: {
        offer: function (newData) {
            this.galleries = this.offer.galleries.map((item) => {
                return {
                    gallery_id: item.id,
                    uid: item.id,
                    name: Date.now().toString(),
                    status: 'done',
                    url: item.url,
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
    },
}
</script>
