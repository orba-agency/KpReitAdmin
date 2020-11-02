<template>
    <div class="main-container">
        <a-card title="Application View" :bordered="false" :loading="!state.loaded">
            <div slot="extra">
                <router-link :to="{ name: 'application-edit', params: { id: $route.params.id } }">Edit</router-link>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="Are you sure？"
                    ok-text="Yes"
                    cancel-text="No"
                    v-if="application.status !== 'Approved'"
                    @confirm="deleteOffer($route.params.id)"
                >
                    <a>Delete</a>
                </a-popconfirm>
            </div>
            <div style="float: right;" v-if="application.status === 'Pending'">
                <a-popconfirm
                    title="Are you sure？"
                    ok-text="Yes"
                    cancel-text="No"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'application_approve'
                        ) !== -1
                    "
                    @confirm="approve($route.params.id)"
                >
                    <a-button type="success" class="m5">
                        Approve
                    </a-button>
                </a-popconfirm>
                <a-button
                    type="danger"
                    class="m5"
                    @click="showModal"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'application_reject'
                        ) !== -1
                    "
                >
                    Reject
                </a-button>
                <a-modal
                    title="Reject Application. Why?"
                    :visible="visible"
                    :confirm-loading="confirmLoading"
                    @ok="handleOk"
                    @cancel="handleCancel"
                >
                    <a-textarea
                        v-model="reason"
                        placeholder="Reason for rejection"
                        :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
                </a-modal>
            </div>

            <a-row v-if="application.status === 'Rejected'">
                <a-col :span="24">
                    <a-alert type="error" :message="application.reason" banner />
                </a-col>
                <br />
                <br />
                <br />
            </a-row>

            <a-descriptions title="Basic Info">
                <a-descriptions-item label="Ref Num">
                    {{ application.reference_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Applicant">
                    <router-link :to="{ name: 'client-view', params: { id: application.user_id } }">
                        <span v-if="application.type === 'Individual'">
                            {{ application.detail.title }} {{ application.detail.first_name }}
                            {{ application.detail.last_name }}
                        </span>
                        <span v-else>{{ application.detail.corporation }}</span>
                    </router-link>
                </a-descriptions-item>

                <a-descriptions-item label="Offer">
                    <router-link :to="{ name: 'offer-view', params: { id: application.offer.id } }">{{
                        application.offer.title
                    }}</router-link>
                </a-descriptions-item>

                <a-descriptions-item label="Broker">
                    {{ application.broker.name }}
                </a-descriptions-item>

                <!-- <a-descriptions-item label="Gender" v-if="application.type === 'Individual'">
                    {{ application.detail.gender }}
                </a-descriptions-item> -->

                <a-descriptions-item label="Type">
                    {{ application.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Status">
                    <a-tag color="orange" v-if="application.status === 'Draft'">{{ application.status }}</a-tag>
                    <a-tag color="blue" v-if="application.status === 'Pending'">{{ application.status }}</a-tag>
                    <a-tag color="green" v-if="application.status === 'Approved'">{{ application.status }}</a-tag>
                    <a-tag color="red" v-if="application.status === 'Rejected'">{{ application.status }}</a-tag>
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

                <a-descriptions-item label="Line of Business" v-if="application.type === 'Corporation'">
                    {{ application.detail.line_of_business }}
                </a-descriptions-item>

                <a-descriptions-item label="Occupation" v-if="application.type === 'Individual'">
                    {{ application.detail.occupation }}
                </a-descriptions-item>

                <a-descriptions-item label="Nationality" v-if="application.type === 'Individual'">
                    {{ application.detail.nationality }}
                </a-descriptions-item>

                <a-descriptions-item label="Country of Incorporation" v-if="application.type === 'Corporation'">
                    {{ application.detail.incorporation }}
                </a-descriptions-item>

                <a-descriptions-item label="JCSD Account Number">
                    {{ application.jcsd_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Pdf Form" v-if="application.form_link">
                    <a
                        class="ant-btn ant-btn-success"
                        target="_blank"
                        download="application_form"
                        :href="application.form_link"
                        type="success"
                    >
                        View
                    </a>
                </a-descriptions-item>
            </a-descriptions>
            <a-divider />

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

                <a-descriptions-item label="Phone Number (Home)" v-if="application.type === 'Individual'">
                    {{ application.detail.home_phone_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Phone Number (Work)">
                    {{ application.detail.work_phone_number }}
                </a-descriptions-item>
            </a-descriptions>
            <a-divider />

            <a-descriptions title="Joint Holders" v-if="application.type === 'Individual'"></a-descriptions>
            <div v-for="item in application.joint_accounts" :key="item.created_at">
                <a-descriptions :span="3">
                    <a-descriptions-item label="Name"> {{ item.first_name }} {{ item.last_name }} </a-descriptions-item>
                    <a-descriptions-item label="Email">
                        {{ item.email }}
                    </a-descriptions-item>
                    <a-descriptions-item label="TRN">
                        {{ item.trn }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Occupation">
                        {{ item.occupation }}
                    </a-descriptions-item>

                    <a-descriptions-item label="Document" v-if="item.document_link">
                        <a
                            class="ant-btn ant-btn-success"
                            target="_blank"
                            download="document"
                            :href="item.document_link"
                        >
                            View
                        </a>
                    </a-descriptions-item>

                    <a-descriptions-item label="Document" v-if="item.other_document_link">
                        <a
                            class="ant-btn ant-btn-success"
                            target="_blank"
                            download="other_document"
                            :href="item.other_document_link"
                        >
                            View
                        </a>
                    </a-descriptions-item>
                </a-descriptions>
                <a-divider />
            </div>

            <a-descriptions title="Directors" v-if="application.type === 'Corporation'"></a-descriptions>
            <div v-for="item in application.directors" :key="item.created_at">
                <a-descriptions>
                    <a-descriptions-item label="Name"> {{ item.first_name }} {{ item.last_name }} </a-descriptions-item>
                    <a-descriptions-item label="Email">
                        {{ item.email }}
                    </a-descriptions-item>
                    <a-descriptions-item label="TRN">
                        {{ item.trn }}
                    </a-descriptions-item>
                </a-descriptions>
                <a-divider />
            </div>

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

                <a-descriptions-item label="Confirmation Reference" v-if="application.payment.type === 'Electronic'">
                    {{ application.payment.confirmation_reference }}
                </a-descriptions-item>

                <a-descriptions-item label="Sender Name" v-if="application.payment.type === 'Electronic'">
                    {{ application.payment.sender_name }}
                </a-descriptions-item>

                <a-descriptions-item label="Sender Account Number" v-if="application.payment.type === 'Electronic'">
                    {{ application.payment.sender_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Transit Code" v-if="application.payment.type === 'Electronic'">
                    {{ application.payment.transit_code }}
                </a-descriptions-item>

                <a-descriptions-item label="Cheque Number" v-if="application.payment.type === 'Cheque'">
                    {{ application.payment.cheque_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Broker Account Number" v-if="application.payment.type === 'Broker'">
                    {{ application.payment.broker_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Payment Upload" v-if="application.payment.link">
                    <a
                        class="ant-btn ant-btn-success"
                        target="_blank"
                        download="payment_upload"
                        :href="application.payment.link"
                    >
                        View
                    </a>
                </a-descriptions-item>

                <a-descriptions-item label="Payment Upload" v-if="application.payment.other_link">
                    <a
                        class="ant-btn ant-btn-success"
                        target="_blank"
                        download="other_payment_upload"
                        :href="application.payment.other_link"
                    >
                        View
                    </a>
                </a-descriptions-item>

                <!-- <a-descriptions-item label="Payment Date">
                    {{ application.payment.payment_date }}
                </a-descriptions-item> -->
            </a-descriptions>
            <a-divider />

            <a-descriptions title="Refund">
                <a-descriptions-item label="Type">
                    {{ application.refund.type }}
                </a-descriptions-item>

                <a-descriptions-item label="Broker A/C Number" v-if="application.refund.type === 'Broker'">
                    {{ application.refund.broker_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Bank" v-if="application.refund.type === 'Bank'">
                    {{ application.refund.bank ? application.refund.bank.name : application.refund.bank_name }}
                </a-descriptions-item>

                <a-descriptions-item label="Bank A/C Type" v-if="application.refund.type === 'Bank'">
                    {{ application.refund.bank_account_type }}
                </a-descriptions-item>

                <a-descriptions-item label="Bank A/C Number" v-if="application.refund.type === 'Bank'">
                    {{ application.refund.bank_account_number }}
                </a-descriptions-item>

                <a-descriptions-item label="Branch" v-if="application.refund.type === 'Bank'">
                    {{
                        application.refund.branch
                            ? application.refund.branch.branch_name
                            : application.refund.branch_name
                    }}
                </a-descriptions-item>

                <a-descriptions-item label="Branch Number" v-if="application.refund.type === 'Bank'">
                    {{
                        application.refund.branch
                            ? application.refund.branch.branch_number
                            : application.refund.branch_number
                    }}
                </a-descriptions-item>

                <a-descriptions-item label="ABA Number" v-if="application.refund.type === 'Bank'">
                    {{
                        application.refund.branch ? application.refund.branch.aba_number : application.refund.aba_number
                    }}
                </a-descriptions-item>

                <a-descriptions-item label="BIC" v-if="application.refund.type === 'Bank'">
                    {{ application.refund.branch ? application.refund.branch.bic : application.refund.bic }}
                </a-descriptions-item>
            </a-descriptions>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const key = 'updatable'

export default {
    data() {
        return {
            application: {},
            state: {
                loaded: false,
            },
            visible: false,
            confirmLoading: false,
            reason: null,
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
            approveApplication: 'applications/approveApplication',
            rejectApplication: 'applications/rejectApplication',
        }),
        callback(key) {
            console.log(key)
        },
        approve(id) {
            this.approveApplication({
                payload: {
                    id: id,
                },
                context: this,
            }).then((res) => {
                if (this.error) {
                    this.$message.error({ content: this.error, key, duration: 2 })
                } else {
                    this.$message.success({
                        content: 'Approved successfully!',
                        key,
                        duration: 2,
                    })

                    this.application.status = 'Approved'
                }
            })
        },
        showModal() {
            this.visible = true
        },
        handleOk(e) {
            this.confirmLoading = true
            this.rejectApplication({
                payload: {
                    id: this.$route.params.id,
                    reason: this.reason,
                },
                context: this,
            }).then((res) => {
                this.visible = false
                this.confirmLoading = false
                if (this.error) {
                    this.$message.error({ content: this.error, key, duration: 2 })
                } else {
                    this.$message.success({
                        content: 'Rejected successfully!',
                        key,
                        duration: 2,
                    })

                    this.application.status = 'Rejected'
                }
            })
        },
        handleCancel(e) {
            this.visible = false
        },
    },
}
</script>

<style scoped>
.m5 {
    margin: 5px !important;
}
</style>
