<template>
    <div>
        <a-card title="Brokers" :bordered="false">
            <router-link slot="extra" :to="{ name: 'broker-new' }">New</router-link>
            <a-table
                :columns="columns"
                :data-source="brokers"
                :pagination="page"
                :loading="loading"
                @change="handleTableChange"
            >
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: 'broker-edit', params: { id: record.id } }">Edit</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure？"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteBroker(record.id)"
                    >
                        <a href="#">Delete</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Action(s)',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
]

const key = 'updatable'

export default {
    data() {
        return {
            columns,
            loading: false,
            pagination: {},
            page: {},
            brokers: [],
            error: null,
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchAll: 'brokers/fetchAll',
            deleteRecord: 'brokers/deleteRecord',
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
        fetch(param = {}) {
            this.loading = true
            this.fetchAll(param).then((response) => {
                const page = { ...this.pagination }

                this.loading = false
                this.brokers = response.data

                page.defaultCurrent = response.current_page
                page.pageSize = response.per_page
                page.total = response.total
                this.page = page
            })
        },
        deleteBroker(id) {
            this.$message.loading({ content: 'Deleting...', key })

            this.deleteRecord({ payload: { id: id }, context: this }).then(() => {
                if (this.error) {
                    this.$message.error({ content: this.error, key, duration: 2 })
                } else {
                    this.$message.success({
                        content: 'Deleted successfully!',
                        key,
                        duration: 2,
                    })

                    var index = this.brokers
                        .map(function (obj) {
                            return obj.id
                        })
                        .indexOf(id)

                    this.brokers.splice(index, 1)
                }
            })
        },
    },
}
</script>
