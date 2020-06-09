<template>
    <a-descriptions title="Currency Info">
        <a-descriptions-item label="Name" span="3">
            {{ currency.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Code" span="3">
            {{ currency.code }}
        </a-descriptions-item>
        <a-descriptions-item label="Symbol" span="3">
            {{ currency.symbol }}
        </a-descriptions-item>
        <a-descriptions-item label="Precision" span="3">
            {{ currency.precision }}
        </a-descriptions-item>
        <a-descriptions-item label="Template" span="3">
            {{ currency.template }}
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            currency: {},
            state: {
                loaded: false,
            },
        }
    },
    created() {
        this.fetchCurrency({
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
            fetchCurrency: 'currencies/fetchCurrency',
        }),
    },
}
</script>
