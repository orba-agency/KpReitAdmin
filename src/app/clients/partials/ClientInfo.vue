<template>
    <a-descriptions title="Client Info">
        <a-descriptions-item label="Name" span="3">
            {{ user.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Email" span="3">
            {{ user.email }}
        </a-descriptions-item>
        <a-descriptions-item label="Email Verified At" span="3">
            {{ user.email_verified_at }}
        </a-descriptions-item>
        <a-descriptions-item label="Type" span="3">
            {{ user.type }}
        </a-descriptions-item>
        <a-descriptions-item label="Accredited Investor" span="3">
            <a-tag color="orange" v-if="user.accredited_investor_data.status === 'Draft'">{{
                user.accredited_investor_data.status
            }}</a-tag>
            <a-tag color="blue" v-if="user.accredited_investor_data.status === 'Pending'">{{
                user.accredited_investor_data.status
            }}</a-tag>
            <a-tag color="green" v-if="user.accredited_investor_data.status === 'Accepted'">{{
                user.accredited_investor_data.status
            }}</a-tag>
            <a-tag color="red" v-if="user.accredited_investor_data.status === 'Rejected'">{{
                user.accredited_investor_data.status
            }}</a-tag>
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
export default {
    props: {
        user: {},
    },
}
</script>
