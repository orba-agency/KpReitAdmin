<template>
    <div>
        <a-card title="Roles" :bordered="false">
            <router-link slot="extra" :to="{ name: 'role-new' }">New</router-link>
            <a-table
                :columns="columns"
                :data-source="roles"
                :pagination="page"
                :loading="loading"
                @change="handleTableChange"
            >
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="tags" slot-scope="tags">
                    <a-tag v-for="tag in tags" :key="tag.created_at" :color="'green'">
                        {{ tag.title.toUpperCase() }}
                    </a-tag>
                </span>
                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: 'role-view', params: { id: record.id } }">Show</router-link>
                    <a-divider type="vertical" />
                    <router-link :to="{ name: 'role-edit', params: { id: record.id } }">Edit</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure？"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteRole(record.id)"
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Permissions',
        dataIndex: 'permissions',
        key: 'permissions',
        scopedSlots: { customRender: 'tags' },
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
            roles: [],
            error: null,
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchAll: 'roles/fetchAll',
            deleteRecord: 'roles/deleteRecord',
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
                this.roles = response.data

                page.defaultCurrent = response.current_page
                page.pageSize = response.per_page
                page.total = response.total
                this.page = page
            })
        },
        deleteRole(id) {
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

                    var index = this.roles
                        .map(function (obj) {
                            return obj.id
                        })
                        .indexOf(id)

                    this.roles.splice(index, 1)
                }
            })
        },
    },
}
</script>
