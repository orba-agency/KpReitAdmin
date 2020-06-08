<template>
    <div class="main-container">
        <a-card title="Permissions" :bordered="false">
            <a-table :columns="columns" :data-source="permissions" :loading="loading" @change="handleTableChange">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="action">
                    <a>Show</a>
                    <a-divider type="vertical" />
                    <a>Edit</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No">
                        <a>Delete</a>
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
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
            columns,
            loading: false,
            permissions: [],
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchAll: 'permissions/fetchAll',
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
                this.loading = false
                this.permissions = response.data
            })
        },
    },
}
</script>
