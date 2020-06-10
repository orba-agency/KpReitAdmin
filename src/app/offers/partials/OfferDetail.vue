<template>
    <a-descriptions bordered>
        <a-descriptions-item label="Title" :span="3">
            {{ offer.title }}
        </a-descriptions-item>
        <a-descriptions-item label="Logo" :span="3">
            <img :src="offer.logo" style="height: 100px;" />
        </a-descriptions-item>
        <a-descriptions-item label="Description" :span="3">
            {{ offer.description }}
        </a-descriptions-item>
        <a-descriptions-item label="Short Name" :span="3">
            {{ offer.short_name }}
        </a-descriptions-item>
        <a-descriptions-item label="Prefix" :span="3">
            {{ offer.prefix }}
        </a-descriptions-item>
        <a-descriptions-item label="Borker" :span="3">
            {{ offer.broker.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Currency" :span="3">
            {{ offer.currency.name }} - {{ offer.currency.code }}
        </a-descriptions-item>
        <a-descriptions-item label="Unit Price" :span="3">
            {{ Number(offer.unit_price).toLocaleString() }}
        </a-descriptions-item>
        <a-descriptions-item label="Status" :span="3">
            <a-badge
                :status="statusBadge()"
                :color="offer.status === 'Open' ? 'green' : offer.status === 'Closed' ? 'red' : 'geekblue'"
                :text="offer.status"
            />
        </a-descriptions-item>
        <a-descriptions-item label="Published" :span="3">
            {{ offer.published }}
        </a-descriptions-item>
        <a-descriptions-item label="Type" :span="3">
            {{ offer.type }}
        </a-descriptions-item>
        <a-descriptions-item label="Max. Invest." :span="3">
            {{ Number(offer.maximum).toLocaleString() }}
        </a-descriptions-item>
        <a-descriptions-item label="Min. Invest." :span="3">
            {{ Number(offer.minimum).toLocaleString() }}
        </a-descriptions-item>
        <a-descriptions-item label="Increment Size" :span="3">
            {{ Number(offer.increment_size).toLocaleString() }}
        </a-descriptions-item>
        <a-descriptions-item label="Closing Date" :span="3">
            {{ offer.closing_date }}
        </a-descriptions-item>
        <a-descriptions-item label="Opening Date" :span="3">
            {{ offer.opening_date }}
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
export default {
    props: {
        offer: {},
    },
    methods: {
        statusBadge() {
            if (this.offer.status === 'Closed') {
                return 'error'
            } else {
                return 'processing'
            }
        },
    },
}
</script>
