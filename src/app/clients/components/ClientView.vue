<template>
    <div>
        <a-popconfirm
            style="float: right;"
            title="Are you sure？"
            ok-text="Yes"
            cancel-text="No"
            v-if="!user.accredited_investor"
            @confirm="accreditedNow($route.params.id)"
        >
            <a-button type="primary">
                Make Accredited Investor
            </a-button>
        </a-popconfirm>

        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="Customer Info">
                <ClientInfo v-bind:user="user" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Accreditation Info" force-render>
                <AccreditationInfo v-bind:user="user" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ClientInfo from '../partials/ClientInfo'
import AccreditationInfo from '../partials/AccreditationInfo'
import moment from 'moment'

const key = 'updatable'

export default {
    components: {
        ClientInfo,
        AccreditationInfo,
    },
    data() {
        return {
            user: {},
            state: {
                loaded: false,
            },
        }
    },
    created() {
        this.fetchUser({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {
            this.state.loaded = true
            if (this.user.type === 'Individual') {
                this.user.total_assets =
                    this.user.accredited_investor_data.questionnaire.asset_cash +
                    this.user.accredited_investor_data.questionnaire.asset_investments +
                    this.user.accredited_investor_data.questionnaire.asset_life_insurance +
                    this.user.accredited_investor_data.questionnaire.asset_others +
                    this.user.accredited_investor_data.questionnaire.asset_personal_property +
                    this.user.accredited_investor_data.questionnaire.asset_real_estate +
                    this.user.accredited_investor_data.questionnaire.asset_retirement_funds +
                    this.user.accredited_investor_data.questionnaire.asset_securities
                this.user.total_liabilities =
                    this.user.accredited_investor_data.questionnaire.liability_others +
                    this.user.accredited_investor_data.questionnaire.liability_debt +
                    this.user.accredited_investor_data.questionnaire.liability_real_estate
            }
            this.user.email_verified_at = moment(this.user.email_verified_at).format('MMM D, YYYY hh:mm A')
            if (this.user.accredited_investor_data.identification) {
                if (this.user.accredited_investor_data.identification.back) {
                    this.user.accredited_investor_data.documents.unshift({
                        type: this.user.accredited_investor_data.identification.type + ' - Back',
                        link: this.user.accredited_investor_data.identification.front,
                    })
                }

                this.user.accredited_investor_data.documents.unshift({
                    type: this.user.accredited_investor_data.identification.type,
                    link: this.user.accredited_investor_data.identification.front,
                })
            }
        })
    },
    methods: {
        ...mapActions({
            fetchUser: 'clients/fetchUser',
            makeAccreditedInvestor: 'clients/makeAccreditedInvestor',
        }),
        accreditedNow(id) {
            this.$message.loading({ content: 'Processing...', key })

            this.makeAccreditedInvestor({ payload: { id: id }, context: this }).then(() => {
                if (this.error) {
                    this.$message.error({ content: this.error, key, duration: 2 })
                } else {
                    this.$message.success({
                        content: 'Updated successfully!',
                        key,
                        duration: 2,
                    })

                    this.user.accredited_investor = true
                }
            })
        },
    },
}
</script>
