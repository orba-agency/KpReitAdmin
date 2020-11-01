<template>
    <div>
        <a-card title="Applications" :bordered="false">
            <div slot="extra">
                <router-link :to="{ name: 'application-new' }">New</router-link>
            </div>
            <a-table
                :columns="columns"
                :data-source="applications"
                :pagination="page"
                :loading="loading"
                @change="handleTableChange"
            >
                <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px;"
                >
                    <a-input
                        v-ant-ref="(c) => (searchInput = c)"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                        @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    />
                    <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px;"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    >
                        Search
                    </a-button>
                    <a-button size="small" style="width: 90px;" @click="() => handleReset(clearFilters)">
                        Reset
                    </a-button>
                </div>
                <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
                />
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="status" slot-scope="status">
                    <a-tag color="orange" v-if="status === 'Draft'">{{ status }}</a-tag>
                    <a-tag color="blue" v-if="status === 'Pending'">{{ status }}</a-tag>
                    <a-tag color="green" v-if="status === 'Approved'">{{ status }}</a-tag>
                    <a-tag color="red" v-if="status === 'Rejected'">{{ status }}</a-tag>
                </span>
                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: 'application-view', params: { id: record.id } }">Show</router-link>
                    <a-divider type="vertical" />
                    <a>Edit</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure？"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteApplication(record.id)"
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
        title: 'Reference #',
        dataIndex: 'reference_number',
        key: 'reference_number',
    },
    {
        title: 'Applicant',
        dataIndex: 'applicant',
        key: 'applicant',
        scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
        },
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    this.searchInput.focus()
                }, 0)
            }
        },
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
            {
                text: 'Individual',
                value: 'Individual',
            },
            {
                text: 'Corporation',
                value: 'Corporation',
            },
        ],
        filterMultiple: false,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
        filters: [
            {
                text: 'Draft',
                value: 'Draft',
            },
            {
                text: 'Pending',
                value: 'Pending',
            },
            {
                text: 'Approved',
                value: 'Approved',
            },
            {
                text: 'Rejected',
                value: 'Rejected',
            },
        ],
        filterMultiple: false,
    },
    {
        title: 'Units',
        dataIndex: 'units',
        key: 'units',
    },
    {
        title: 'Value',
        dataIndex: 'amount',
        key: 'amount',
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
            applications: [],
            error: null,
            searchText: '',
            searchInput: null,
            searchedColumn: '',
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        ...mapActions({
            fetchAll: 'applications/fetchAll',
            // deleteRecord: 'currencies/deleteRecord',
        }),
        handleTableChange(pagination, filters, sorter) {
            console.log(pagination, filters, sorter)

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
                this.applications = response.data.map((item) => {
                    item.broker_name = item.broker.name
                    item.applicant =
                        item.type === 'Corporation'
                            ? item.detail.corporation
                            : item.detail.first_name + ' ' + item.detail.last_name
                    return item
                })

                page.defaultCurrent = response.current_page
                page.pageSize = response.per_page
                page.total = response.total
                this.page = page
            })
        },
        deleteApplication(id) {
            this.$message.loading({ content: 'Deleting currently in development', key })
            // this.$message.loading({ content: 'Deleting...', key })

            // this.deleteRecord({ payload: { id: id }, context: this }).then(() => {
            //     if (this.error) {
            //         this.$message.error({ content: this.error, key, duration: 2 })
            //     } else {
            //         this.$message.success({
            //             content: 'Deleted successfully!',
            //             key,
            //             duration: 2,
            //         })

            //         var index = this.currencies
            //             .map(function (obj) {
            //                 return obj.id
            //             })
            //             .indexOf(id)

            //         this.currencies.splice(index, 1)
            //     }
            // })
        },
        handleSearch(selectedKeys, confirm, dataIndex) {
            confirm()
            this.searchText = selectedKeys[0]
            this.searchedColumn = dataIndex
        },

        handleReset(clearFilters) {
            clearFilters()
            this.searchText = ''
        },
    },
}
</script>
