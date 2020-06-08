<template>
    <div class="main-container">
        <a-card title="Offers" :bordered="false">
            <router-link slot="extra" :to="{ name: 'offer-new' }">New</router-link>
            <a-table
                :columns="columns"
                :data-source="this.$store.getters['offers/offers'].all"
                :pagination="this.$store.getters['offers/offers'].pagination"
                :loading="loading"
                @change="handleTableChange"
            >
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> Title</span>
                <span slot="badge" slot-scope="badge">
                    <a-badge
                        :status="statusBadge(badge)"
                        :color="badge === 'Open' ? 'green' : badge === 'Closed' ? 'red' : 'geekblue'"
                        :text="badge"
                    />
                </span>
                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: 'offer-view', params: { id: record.key } }">Show</router-link>
                    <a-divider type="vertical" />
                    <router-link :to="{ name: 'offer-edit', params: { id: record.key } }">Edit</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure？"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteOffer(record.key)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { remove } from 'lodash'

const columns = [
    {
        dataIndex: 'title',
        key: 'title',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'title' },
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Broker',
        dataIndex: 'broker',
        key: 'broker',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'badge' },
        filters: [
            {
                text: 'Pre-open',
                value: 'Pre-open',
            },
            {
                text: 'Open',
                value: 'Open',
            },
            {
                text: 'Closed',
                value: 'Closed',
            },
        ],
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    },
    {
        title: 'Invest. Dates',
        dataIndex: 'investmentDate',
        key: 'investmentDate',
    },
    {
        title: 'Action(s)',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
]

export default {
    data() {
        return {
            pagination: {},
            loading: false,
            columns,
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchOfferListing: 'offers/fetchOfferListing',
        }),
        handleTableChange(pagination, filters, sorter) {
            const pager = { ...this.pagination }
            pager.current = pagination.current
            this.pagination = pager

            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            })
        },
        fetch(params = {}) {
            this.loading = true
            this.fetchOfferListing(params).then((response) => {
                this.loading = false
            })
        },
        statusBadge(badge) {
            if (badge === 'Closed') {
                return 'error'
            } else {
                return 'processing'
            }
        },
        deleteOffer(id) {
            console.log(id)
        },
    },
}
</script>
