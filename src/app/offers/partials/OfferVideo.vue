<template>
    <a-table :columns="columns" :data-source="videos">
        <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
</template>

<script>
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
    },
]

export default {
    props: {
        videos: Array,
    },
    data() {
        return {
            columns,
        }
    },
}
</script>
