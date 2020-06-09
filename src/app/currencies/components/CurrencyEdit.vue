<template>
    <div class="main-container">
        <a-card title="Edit Currency" :bordered="false">
            <a-row v-if="message">
                <a-col :span="14" :offset="4">
                    <a-alert type="error" :message="message" banner />
                </a-col>
                <br />
                <br />
                <br />
            </a-row>
            <a-form-model
                ref="ruleForm"
                :model="currency"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-model-item
                    ref="name"
                    label="Name"
                    prop="name"
                    :validate-status="errors.name ? 'error' : ''"
                    :help="errors.title ? errors.name[0] : null"
                >
                    <a-input v-model="currency.name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="code"
                    label="Code"
                    prop="code"
                    :validate-status="errors.code ? 'error' : ''"
                    :help="errors.title ? errors.code[0] : null"
                >
                    <a-input v-model="currency.code" />
                </a-form-model-item>

                <a-form-model-item
                    ref="symbol"
                    label="Symbol"
                    prop="symbol"
                    :validate-status="errors.symbol ? 'error' : ''"
                    :help="errors.title ? errors.symbol[0] : null"
                >
                    <a-input v-model="currency.symbol" />
                </a-form-model-item>

                <a-form-model-item
                    ref="precision"
                    label="Precision"
                    prop="precision"
                    :validate-status="errors.precision ? 'error' : ''"
                    :help="errors.title ? errors.precision[0] : null"
                >
                    <a-input v-model="currency.precision" />
                </a-form-model-item>

                <a-form-model-item
                    ref="template"
                    label="Template"
                    prop="template"
                    :validate-status="errors.template ? 'error' : ''"
                    :help="errors.title ? errors.template[0] : null"
                >
                    <a-input v-model="currency.template" />
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" :disabled="submitButton.processing" @click="onSubmit">
                        {{ submitButton.name }}
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            message: null,
            errors: [],
            submitButton: {
                name: 'Save',
                processing: false,
            },
            currency: {},
            rules: {
                name: [{ required: true, message: 'Please add a name', trigger: 'blur' }],
                code: [{ required: true, message: 'Please add a code', trigger: 'blur' }],
                symbol: [{ required: true, message: 'Please add a symbol', trigger: 'blur' }],
                precision: [{ required: true, message: 'Please add a precision', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.fetchCurrency({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {})
    },
    methods: {
        ...mapActions({
            updateCurrency: 'currencies/updateCurrency',
            fetchCurrency: 'currencies/fetchCurrency',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.updateCurrency({
                        payload: {
                            id: this.$route.params.id,
                            form: this.currency,
                        },
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Save'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'currencies' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
    },
}
</script>
