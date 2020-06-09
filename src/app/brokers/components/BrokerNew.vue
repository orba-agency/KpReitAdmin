<template>
    <div class="main-container">
        <a-card title="New Broker" :bordered="false">
            <a-row v-if="message">
                <a-col :span="14" :offset="4">
                    <a-alert type="error" :message="message" banner />
                </a-col>
                <br />
                <br />
                <br />
            </a-row>
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item
                    ref="name"
                    label="Name"
                    prop="name"
                    :validate-status="errors.name ? 'error' : ''"
                    :help="errors.title ? errors.name[0] : null"
                >
                    <a-input v-model="form.name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="code"
                    label="Code"
                    prop="code"
                    :validate-status="errors.code ? 'error' : ''"
                    :help="errors.title ? errors.code[0] : null"
                >
                    <a-input v-model="form.code" />
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
                name: 'Create',
                processing: false,
            },
            form: {
                name: null,
                code: null,
            },
            rules: {
                name: [{ required: true, message: 'Please add a name', trigger: 'blur' }],
                code: [{ required: true, message: 'Please add a code', trigger: 'blur' }],
            },
        }
    },
    methods: {
        ...mapActions({
            createBroker: 'brokers/createBroker',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.createBroker({
                        payload: this.form,
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Create'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'brokers' })
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
