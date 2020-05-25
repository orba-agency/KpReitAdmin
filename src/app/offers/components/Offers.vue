<template>
    <div>
        Offers
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        created(){
            this.fetchOfferListing().then(() => {
                
            });
        },
        methods: {
            ...mapActions({
                fetchOfferListing: 'offers/fetchOfferListing'
            })
        }
    }

</script>
