<template>
    <div>
        <a-descriptions title="Basic Info">
            <a-descriptions-item label="Ref Num">
                {{ application.reference_number }}
            </a-descriptions-item>

            <a-descriptions-item label="Applicant">
                <span v-if="application.type === 'Individual'">
                    {{ application.detail.first_name }} {{ application.detail.last_name }}
                </span>
                <span v-else>{{ application.detail.corporation }}</span>
            </a-descriptions-item>

            <a-descriptions-item label="Offer">
                {{ application.offer.title }}
            </a-descriptions-item>

            <a-descriptions-item label="Type">
                {{ application.type }}
            </a-descriptions-item>

            <a-descriptions-item label="Status">
                {{ application.status }}
            </a-descriptions-item>

            <a-descriptions-item label="Submitted On">
                {{ application.submitted_on }}
            </a-descriptions-item>

            <a-descriptions-item label="Units">
                {{ application.units }}
            </a-descriptions-item>

            <a-descriptions-item label="Amount">
                {{ application.amount }}
            </a-descriptions-item>

            <a-descriptions-item label="TRN">
                {{ application.detail.trn }}
            </a-descriptions-item>

            <a-descriptions-item label="Line of Business">
                {{ application.detail.line_of_business }}
            </a-descriptions-item>

            <a-descriptions-item label="Occupation">
                {{ application.detail.occupation }}
            </a-descriptions-item>

            <a-descriptions-item label="Nationality">
                {{ application.detail.nationality }}
            </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="Address and Contact Info">
            <a-descriptions-item label="Email">
                {{ application.detail.email }}
            </a-descriptions-item>

            <a-descriptions-item label="Address Line 1">
                {{ application.detail.address_line1 }}
            </a-descriptions-item>

            <a-descriptions-item label="Address Line 2">
                {{ application.detail.address_line1 }}
            </a-descriptions-item>

            <a-descriptions-item label="City">
                {{ application.detail.city }}
            </a-descriptions-item>

            <a-descriptions-item label="State">
                {{ application.detail.state }}
            </a-descriptions-item>

            <a-descriptions-item label="Country">
                {{ application.detail.country }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Cell)">
                {{ application.detail.phone_number }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Home)">
                {{ application.detail.home_phone_number }}
            </a-descriptions-item>

            <a-descriptions-item label="Phone Number (Work)">
                {{ application.detail.work_phone_number }}
            </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="Joint Holders">
            <a-descriptions-item label="Email">
                {{ application.detail.email }}
            </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="Payment & Refund">
            <a-descriptions-item label="Email">
                {{ application.detail.email }}
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
export default {
    props: {
        application: {},
    },
    methods: {
        statusBadge() {
            if (this.offer.status === 'Closed') {
                return 'error'
            } else {
                return 'processing'
            }
        },
    },
}
</script>
