<template>
    <div class="main-container">
        <a-card title="New User" :bordered="false">
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

                <a-form-model-item
                    ref="email"
                    label="Email Address"
                    prop="email"
                    :validate-status="errors.email ? 'error' : ''"
                    :help="errors.title ? errors.email[0] : null"
                >
                    <a-input v-model="form.email" />
                </a-form-model-item>

                <a-form-model-item
                    ref="password"
                    label="Password"
                    prop="password"
                    :validate-status="errors.password ? 'error' : ''"
                    :help="errors.title ? errors.password[0] : null"
                >
                    <a-input v-model="form.password" />
                </a-form-model-item>

                <a-form-model-item
                    ref="roles"
                    label="Roles"
                    prop="roles"
                    :validate-status="errors.roles ? 'error' : ''"
                    :help="errors.roles ? errors.roles[0] : null"
                >
                    <a-select
                        mode="multiple"
                        :default-value="form.roles"
                        style="width: 100%;"
                        placeholder="Please select roles"
                        @change="handleChange"
                    >
                        <a-select-option v-for="val in roles" :key="val.id">
                            {{ val.title }}
                        </a-select-option>
                    </a-select>
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
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                roles: [],
            },
            rules: {
                first_name: [{ required: true, message: 'Please add first name', trigger: 'blur' }],
                last_name: [{ required: true, message: 'Please add last name', trigger: 'blur' }],
                email: [{ required: true, message: 'Please add email', trigger: 'blur' }],
                password: [{ required: true, message: 'Please add password', trigger: 'blur' }],
                roles: [{ required: true, message: 'Please select role', trigger: 'change' }],
            },
        }
    },
    created() {
        this.fetchAll({ all: true }).then((resp) => {
            this.roles = resp
        })
    },
    methods: {
        ...mapActions({
            createUser: 'users/createUser',
            fetchAll: 'roles/fetchAll',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.createUser({
                        payload: this.form,
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Create'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'users' })
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
