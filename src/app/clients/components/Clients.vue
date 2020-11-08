<template>
    <div>
        <a-card title="Clients" :bordered="false">
            <router-link slot="extra" :to="{ name: 'client-new' }">New</router-link>
            <a-table
                :columns="columns"
                :data-source="users"
                :pagination="page"
                :loading="loading"
                @change="handleTableChange"
            >
                <a slot="name" slot-scope="text">{{ text }}</a>

                <span slot="full-name" slot-scope="record">{{ record.first_name + ' ' + record.last_name }}</span>

                <span slot="is_investor" slot-scope="record">{{ record.accredited_investor ? 'YES' : 'NO' }}</span>

                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: 'client-view', params: { id: record.id } }">Show</router-link>
                    <a-divider type="vertical" />
                    <router-link :to="{ name: 'client-edit', params: { id: record.id } }">Edit</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure？"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteUser(record.id)"
                    >
                        <a href="#">Delete</a>
                        <!-- v-if="this.$store.getters['auth/user'].data.id !== record.id" -->
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
        // scopedSlots: { customRender: 'full-name' },
    },
    {
        title: 'Account',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Accredited Investor',
        key: 'accredited_investor',
        scopedSlots: { customRender: 'is_investor' },
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
            users: [],
            error: null,
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchAll: 'clients/fetchAll',
            deleteRecord: 'clients/deleteRecord',
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
                this.users = response.data

                page.defaultCurrent = response.current_page
                page.pageSize = response.per_page
                page.total = response.total
                this.page = page
            })
        },
        deleteUser(id) {
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

                    var index = this.users
                        .map(function (obj) {
                            return obj.id
                        })
                        .indexOf(id)

                    this.users.splice(index, 1)
                }
            })
        },
    },
}
</script>
