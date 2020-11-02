<template>
    <div>
        <a-card title="Reports" :bordered="false">
            <a-table :columns="columns" :data-source="reports" @change="handleTableChange">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="tags" slot-scope="tags">
                    <a-tag v-for="tag in tags" :key="tag.created_at" :color="'green'">
                        {{ tag.title.toUpperCase() }}
                    </a-tag>
                </span>
                <span slot="action" slot-scope="record">
                    <router-link :to="{ name: record.action, params: {} }">Run</router-link>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
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
            page: {},
            reports: [{ title: 'Offering Summary', action: 'offering-summary' }],
            error: null,
        }
    },
}
</script>
