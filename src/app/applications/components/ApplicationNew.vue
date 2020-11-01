<template>
    <div>
        <a-steps :current="current" @change="onChange">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
            <DetailForm v-if="current === 0" v-bind:form="form" />
            <JointForm v-if="current === 1 && form.type === 'Individual'" v-bind:form="form" />
            <DirectorForm v-if="current === 1 && form.type === 'Corporation'" v-bind:form="form" />
            <PaymentAndRefundForm v-if="current === 2" v-bind:form="form" />
            <Review v-if="current === 3" v-bind:form="form" />
        </div>
        <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                Next
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('Processing complete!')"
            >
                Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px;" @click="prev">
                Previous
            </a-button>
        </div>
    </div>
</template>
<script>
import DetailForm from '../partials/DetailForm'
import JointForm from '../partials/JointForm'
import DirectorForm from '../partials/DirectorForm'
import PaymentAndRefundForm from '../partials/PaymentAndRefundForm'
import Review from '../partials/Review'

export default {
    components: {
        DetailForm,
        JointForm,
        DirectorForm,
        PaymentAndRefundForm,
        Review,
    },
    data() {
        return {
            current: 0,
            steps: [
                {
                    title: 'Details',
                },
                {
                    title: 'Signatories',
                },
                {
                    title: 'Payment & Refund',
                },
                {
                    title: 'Review',
                },
            ],
            brokers: [],
            currency: {
                code: null,
                symbol: null,
            },
            form: {
                title: null,
                type: 'Individual',
                units: null,
                joint_accounts: [],
                directors: [],
                payment: {
                    type: 'Cheque',
                    cheque_number: null,
                    institution: null,
                },
            },
        }
    },
    methods: {
        onChange(current) {
            console.log('onChange:', current)
            this.current = current
        },
        next() {
            this.current++
        },
        prev() {
            this.current--
        },
    },
}
</script>

<style scoped>
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

.steps-action {
    margin-top: 24px;
}
</style>
