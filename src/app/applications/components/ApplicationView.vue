<template>
    <div class="main-container">
        <a-card title="Application View" :bordered="false" :loading="!state.loaded">
            <div slot="extra">
                <router-link :to="{ name: 'offer-edit', params: { id: $route.params.id } }">Edit</router-link>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="Are you sure？"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteOffer($route.params.id)"
                >
                    <a>Delete</a>
                </a-popconfirm>
            </div>
            <a-descriptions title="Basic Info">
                <a-descriptions-item label="Ref Num">
                    {{ application.reference_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Applicant">
                    <span v-if="application.type === 'Individual'">
                        {{ application.detail.title }} {{ application.detail.first_name }}
                        {{ application.detail.last_name }}
                    </span>
                    <span v-else>{{ application.detail.corporation }}</span>
                </a-descriptions-item>

                <a-descriptions-item label="Offer">
                    {{ application.offer.title }}
                </a-descriptions-item>

                <a-descriptions-item label="Gender">
                    {{ application.detail.gender }}
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

            <a-descriptions title="Directors">
                <div v-for="item in application.directors" :key="item.created_at">
                    {{ item.first_name }} {{ item.last_name }}
                </div>

                <a-descriptions v-for="item in application.directors" :key="item.created_at">
                    <a-descriptions-item label="Full name">
                        {{ item.first_name }} {{ item.last_name }}
                    </a-descriptions-item>

                    <a-descriptions-item label="Email">
                        {{ item.email }}
                    </a-descriptions-item>
                </a-descriptions>
            </a-descriptions>

            <a-descriptions title="Payment">
                <a-descriptions-item label="Source of Funds">
                    {{ application.payment.source_of_funds }}
                </a-descriptions-item>

                <a-descriptions-item label="Type">
                    {{ application.payment.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Institution">
                    {{ application.payment.institution }}
                </a-descriptions-item>

                <a-descriptions-item label="Confirmation Reference">
                    {{ application.payment.confirmation_reference }}
                </a-descriptions-item>

                <a-descriptions-item label="Sender Name">
                    {{ application.payment.sender_name }}
                </a-descriptions-item>

                <a-descriptions-item label="Sender Account Number">
                    {{ application.payment.sender_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Transit Code">
                    {{ application.payment.transit_code }}
                </a-descriptions-item>

                <a-descriptions-item label="Cheque Number">
                    {{ application.payment.cheque_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Broker Account Number">
                    {{ application.payment.broker_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Payment Date">
                    {{ application.payment.payment_date }}
                </a-descriptions-item>
            </a-descriptions>

            <a-descriptions title="Refund">
                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>

                <a-descriptions-item label="bank_name">
                    {{ application.refund.bank_name }}
                </a-descriptions-item>

                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>
            </a-descriptions>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            application: {},
            state: {
                loaded: false,
            },
        }
    },
    created() {
        this.fetchApplication({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {
            this.state.loaded = true
        })
    },
    methods: {
        ...mapActions({
            fetchApplication: 'applications/fetchApplication',
        }),
        callback(key) {
            console.log(key)
        },
    },
}
</script>
