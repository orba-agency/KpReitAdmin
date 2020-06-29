<template>
    <a-table :columns="columns" :data-source="fees" rowKey="{record => record.id}">
        <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
</template>

<script>
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Value',
        dataIndex: 'amount',
        key: 'amount',
    },
]

export default {
    props: {
        fees: Array,
    },
    data() {
        return {
            columns,
        }
    },
}
</script>
