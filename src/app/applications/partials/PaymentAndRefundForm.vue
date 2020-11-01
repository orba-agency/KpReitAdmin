<template>
    <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item
                ref="source_of_funds"
                label="Source of Funds"
                prop="source_of_funds"
                :validate-status="errors.source_of_funds ? 'error' : ''"
                :help="errors.source_of_funds ? errors.source_of_funds[0] : null"
            >
                <a-input v-model="form.source_of_funds" />
            </a-form-model-item>
            <a-divider />
            <h5>Payment</h5>
            <a-form-model-item
                label="Type"
                prop="type"
                :validate-status="errors.type ? 'error' : ''"
                :help="errors.type ? errors.type[0] : null"
            >
                <a-select v-model="form.payment.type" placeholder="Please select type">
                    <a-select-option value="Cheque">
                        Managers Cheque
                    </a-select-option>
                    <a-select-option value="Electronic">
                        Electronic Transfer
                    </a-select-option>
                </a-select>
            </a-form-model-item>

            <a-form-model-item
                ref="cheque_number"
                label="Cheque Number"
                prop="cheque_number"
                v-if="form.payment.type === 'Cheque'"
                :validate-status="errors.cheque_number ? 'error' : ''"
                :help="errors.cheque_number ? errors.cheque_number[0] : null"
            >
                <a-input v-model="form.payment.cheque_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="transfer_type"
                label="Transfer Type"
                prop="transfer_type"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.transfer_type ? 'error' : ''"
                :help="errors.transfer_type ? errors.transfer_type[0] : null"
            >
                <a-input v-model="form.payment.transfer_type" />
            </a-form-model-item>

            <a-form-model-item
                ref="confirmation_reference"
                label="Confirmation Reference"
                prop="confirmation_reference"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.confirmation_reference ? 'error' : ''"
                :help="errors.confirmation_reference ? errors.confirmation_reference[0] : null"
            >
                <a-input v-model="form.payment.confirmation_reference" />
            </a-form-model-item>

            <a-form-model-item
                ref="institution"
                label="Institution"
                prop="institution"
                :validate-status="errors.institution ? 'error' : ''"
                :help="errors.institution ? errors.institution[0] : null"
            >
                <a-input v-model="form.payment.institution" />
            </a-form-model-item>

            <a-form-model-item
                ref="sender_name"
                label="Sender's Account Name"
                prop="sender_name"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.sender_name ? 'error' : ''"
                :help="errors.sender_name ? errors.sender_name[0] : null"
            >
                <a-input v-model="form.payment.sender_name" />
            </a-form-model-item>

            <a-form-model-item
                ref="sender_account_number"
                label="Sender's Account Number"
                prop="sender_account_number"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.sender_account_number ? 'error' : ''"
                :help="errors.sender_account_number ? errors.sender_account_number[0] : null"
            >
                <a-input v-model="form.payment.sender_account_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="transit_code"
                label="Transit Code"
                prop="transit_code"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.transit_code ? 'error' : ''"
                :help="errors.transit_code ? errors.transit_code[0] : null"
            >
                <a-input v-model="form.payment.transit_code" />
            </a-form-model-item>

            <a-form-model-item
                ref="payment_date"
                label="Payment Date"
                prop="payment_date"
                v-if="form.payment.type === 'Electronic'"
                :validate-status="errors.payment_date ? 'error' : ''"
                :help="errors.payment_date ? errors.payment_date[0] : null"
            >
                <a-input v-model="form.payment.payment_date" />
            </a-form-model-item>

            <a-divider />
            <h5>Refund</h5>

            <a-form-model-item
                ref="bank_id"
                label="Bank"
                prop="bank_id"
                :validate-status="errors.bank_id ? 'error' : ''"
                :help="errors.bank_id ? errors.bank_id[0] : null"
            >
                <a-input v-model="form.payment.bank_id" />
            </a-form-model-item>

            <a-form-model-item
                ref="bank_account_number"
                label="Bank Account Number"
                prop="bank_account_number"
                :validate-status="errors.bank_account_number ? 'error' : ''"
                :help="errors.bank_account_number ? errors.bank_account_number[0] : null"
            >
                <a-input v-model="form.payment.bank_account_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="bank_account_type"
                label="Bank Account Type"
                prop="bank_account_type"
                :validate-status="errors.bank_account_type ? 'error' : ''"
                :help="errors.bank_account_type ? errors.bank_account_type[0] : null"
            >
                <a-input v-model="form.payment.bank_account_type" />
            </a-form-model-item>

            <a-form-model-item
                ref="branch_id"
                label="Branch"
                prop="branch_id"
                :validate-status="errors.branch_id ? 'error' : ''"
                :help="errors.branch_id ? errors.branch_id[0] : null"
            >
                <a-input v-model="form.payment.branch_id" />
            </a-form-model-item>

            <a-form-model-item
                ref="branch_number"
                label="Branch Number"
                prop="branch_number"
                :validate-status="errors.branch_number ? 'error' : ''"
                :help="errors.branch_number ? errors.branch_number[0] : null"
            >
                <a-input v-model="form.payment.branch_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="bic"
                label="BIC"
                prop="bic"
                :validate-status="errors.bic ? 'error' : ''"
                :help="errors.bic ? errors.bic[0] : null"
            >
                <a-input v-model="form.payment.bic" />
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
    props: {
        form: {},
    },
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            errors: [],
            rules: {
                source_of_funds: [{ required: true, message: 'Please add a title', trigger: 'blur' }],
            },
        }
    },
}
</script>
