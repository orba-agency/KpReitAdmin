<template>
    <div>
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
        <a-divider />

        <a-descriptions title="Profile" v-if="user.profile">
            <a-descriptions-item label="TRN">
                {{ user.profile.trn }}
            </a-descriptions-item>

            <a-descriptions-item label="Occupation">
                {{ user.profile.occupation }}
            </a-descriptions-item>

            <a-descriptions-item label="Nationality">
                {{ user.profile.nationality }}
            </a-descriptions-item>

            <a-descriptions-item label="Identification" v-if="user.profile.idetification_link">
                <a
                    class="ant-btn ant-btn-success"
                    target="_blank"
                    download="Identification"
                    :href="user.profile.idetification_link"
                    type="success"
                >
                    View
                </a>
            </a-descriptions-item>
        </a-descriptions>
        <a-divider />

        <a-descriptions title="Address and Contact Info" v-if="user.profile">
            <a-descriptions-item label="Address Line 1">
                {{ user.profile.address_line1 }}
            </a-descriptions-item>

            <a-descriptions-item label="Address Line 2">
                {{ user.profile.address_line1 }}
            </a-descriptions-item>

            <a-descriptions-item label="City">
                {{ user.profile.city }}
            </a-descriptions-item>

            <a-descriptions-item label="State">
                {{ user.profile.state }}
            </a-descriptions-item>

            <a-descriptions-item label="Country">
                {{ user.profile.country }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Cell)">
                {{ user.profile.phone_number }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Home)">
                {{ user.profile.home_phone_number }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Work)">
                {{ user.profile.work_phone_number }}
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
export default {
    props: {
        user: {},
    },
}
</script>
