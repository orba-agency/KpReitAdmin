<template>
    <a-table :columns="columns" :data-source="fees">
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
        fees: [],
    },
    data() {
        return {
            columns,
        }
    },
}
</script>
