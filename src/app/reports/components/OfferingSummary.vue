<template>
    <div class="main-container">
        <a-card title="Offering Summary" :bordered="false">
            <a-table :columns="columns" :data-source="report.offers" bordered>
                <template slot="name" slot-scope="text">
                    <a>{{ text }}</a>
                </template>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

const columns = [
    {
        title: 'Title',
        dataIndex: 'offer',
        key: 'offer',
    },
    {
        title: 'Total',
        dataIndex: 'summary.total_count',
        key: 'count',
    },
    // {
    //     title: 'Unit Price',
    //     dataIndex: 'unit_price',
    //     key: 'unit_price',
    // },
    // {
    //     title: 'Units',
    //     dataIndex: 'summary.total_units',
    //     key: 'units',
    // },
    {
        title: 'Amount',
        dataIndex: 'summary.total_amount',
        key: 'amount',
    },
]

const key = 'updatable'

export default {
    data() {
        return {
            columns,
            report: {
                offers: [],
            },
        }
    },
    created() {
        this.fetchOfferingSummary({
            payload: {},
            context: this,
        })
    },
    methods: {
        ...mapActions({
            fetchOfferingSummary: 'reports/fetchOfferingSummary',
        }),
    },
}
</script>
