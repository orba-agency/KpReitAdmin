<template>
    <div class="main-container">
        <a-card title="Edit Client" :bordered="false">
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
                    ref="first_name"
                    label="First Name"
                    prop="first_name"
                    :validate-status="errors.first_name ? 'error' : ''"
                    :help="errors.title ? errors.first_name[0] : null"
                >
                    <a-input v-model="form.first_name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="last_name"
                    label="Last Name"
                    prop="last_name"
                    :validate-status="errors.last_name ? 'error' : ''"
                    :help="errors.title ? errors.last_name[0] : null"
                >
                    <a-input v-model="form.last_name" />
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
            roles: [],
            submitButton: {
                name: 'Save',
                processing: false,
            },
            user: {},
            form: {
                first_name: null,
                last_name: null,
                password: null,
            },
            rules: {
                first_name: [{ required: true, message: 'Please add first name', trigger: 'blur' }],
                last_name: [{ required: true, message: 'Please add last name', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.fetchUser({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {})

        this.fetchAll({ all: true }).then((resp) => {
            this.roles = resp
        })
    },
    methods: {
        ...mapActions({
            updateUser: 'clients/updateUser',
            fetchUser: 'clients/fetchUser',
            fetchAll: 'clients/fetchAll',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.updateUser({
                        payload: {
                            id: this.$route.params.id,
                            form: this.form,
                        },
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Save'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'clients' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        handleChange(value) {
            this.form.roles = value
        },
    },
}
</script>
