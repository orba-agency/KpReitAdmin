<template>
    <div class="main-container">
        <a-card title="Settings" :bordered="false">
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
                    ref="notify_email"
                    label="Notify Email"
                    prop="notify_email"
                    :validate-status="errors.notify_email ? 'error' : ''"
                    :help="errors.title ? errors.notify_email[0] : null"
                >
                    <a-input v-model="form.notify_email" />
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

const key = 'updatable'

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            message: null,
            errors: [],
            submitButton: {
                name: 'Update',
                processing: false,
            },
            form: {
                notify_email: null,
            },
            rules: {
                notify_email: [{ required: true, message: 'Please add notify email', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.fetchSettings({
            payload: {},
            context: this,
        }).then(() => {})

        this.fetchAll({ all: true }).then((resp) => {
            this.form = resp
        })
    },
    methods: {
        ...mapActions({
            fetchSettings: 'settings/fetchSettings',
            updateSettings: 'settings/updateSettings',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.updateSettings({
                        payload: {
                            form: this.form,
                        },
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Update'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$message.success({
                                content: 'Updated successfully!',
                                key,
                                duration: 2,
                            })
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
