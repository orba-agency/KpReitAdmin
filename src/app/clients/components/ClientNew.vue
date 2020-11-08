<template>
    <div class="main-container">
        <a-card title="New Client" :bordered="false">
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
                    label="Account Type"
                    prop="type"
                    :validate-status="errors.type ? 'error' : ''"
                    :help="errors.type ? errors.type[0] : null"
                >
                    <a-select v-model="form.type" placeholder="Please select a type">
                        <a-select-option value="Individual">
                            Individual
                        </a-select-option>
                        <a-select-option value="Corporation">
                            Corporation
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    ref="corporation"
                    label="Corporation"
                    prop="corporation"
                    v-if="form.type === 'Corporation'"
                    :validate-status="errors.corporation ? 'error' : ''"
                    :help="errors.corporation ? errors.corporation[0] : null"
                >
                    <a-input v-model="form.corporation" />
                </a-form-model-item>

                <a-form-model-item
                    ref="first_name"
                    label="First Name"
                    prop="first_name"
                    v-if="form.type === 'Individual'"
                    :validate-status="errors.first_name ? 'error' : ''"
                    :help="errors.first_name ? errors.first_name[0] : null"
                >
                    <a-input v-model="form.first_name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="last_name"
                    label="Last Name"
                    prop="last_name"
                    v-if="form.type === 'Individual'"
                    :validate-status="errors.last_name ? 'error' : ''"
                    :help="errors.last_name ? errors.last_name[0] : null"
                >
                    <a-input v-model="form.last_name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="email"
                    label="Email Address"
                    prop="email"
                    :validate-status="errors.email ? 'error' : ''"
                    :help="errors.email ? errors.email[0] : null"
                >
                    <a-input v-model="form.email" />
                </a-form-model-item>

                <a-form-model-item
                    ref="password"
                    label="Password"
                    prop="password"
                    :validate-status="errors.password ? 'error' : ''"
                    :help="errors.password ? errors.password[0] : null"
                >
                    <a-input-password v-model="form.password" />
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
                name: 'Create',
                processing: false,
            },
            form: {
                type: 'Individual',
                corporation: null,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
            rules: {
                corporation: [{ required: true, message: 'Please add corporation', trigger: 'blur' }],
                first_name: [{ required: true, message: 'Please add first name', trigger: 'blur' }],
                last_name: [{ required: true, message: 'Please add last name', trigger: 'blur' }],
                email: [{ required: true, message: 'Please add email', trigger: 'blur' }],
                password: [{ required: true, message: 'Please add password', trigger: 'blur' }],
            },
        }
    },
    created() {},
    methods: {
        ...mapActions({
            createUser: 'clients/createUser',
        }),
        onSubmit() {
            this.errors = []
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.createUser({
                        payload: this.form,
                        context: this,
                    }).then((response) => {
                        this.submitButton.processing = false
                        this.submitButton.name = 'Create'

                        console.log(response.id)
                        if (this.errors.length) {
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
