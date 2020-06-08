<template>
    <div class="main-container">
        <a-card title="New Role" :bordered="false">
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
                    ref="title"
                    label="Title"
                    prop="title"
                    :validate-status="errors.title ? 'error' : ''"
                    :help="errors.title ? errors.title[0] : null"
                >
                    <a-input v-model="form.title" />
                </a-form-model-item>

                <a-form-model-item
                    ref="permissions"
                    label="Permissions"
                    prop="permissions"
                    :validate-status="errors.permissions ? 'error' : ''"
                    :help="errors.permissions ? errors.permissions[0] : null"
                >
                    <a-select
                        mode="multiple"
                        :default-value="form.permissions"
                        style="width: 100%;"
                        placeholder="Please select permissions"
                        @change="handleChange"
                    >
                        <a-select-option v-for="val in permissions" :key="val.id">
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
            permissions: [],
            submitButton: {
                name: 'Create',
                processing: false,
            },
            form: {
                title: null,
                permissions: [],
            },
            rules: {
                title: [{ required: true, message: 'Please add a title', trigger: 'blur' }],
                permissions: [{ required: true, message: 'Please select permission', trigger: 'change' }],
            },
        }
    },
    created() {
        this.fetchAll({ all: true }).then((resp) => {
            this.permissions = resp
        })
    },
    methods: {
        ...mapActions({
            createRole: 'roles/createRole',
            fetchAll: 'permissions/fetchAll',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.createRole({
                        payload: this.form,
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Create'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'roles' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        handleChange(value) {
            this.form.permissions = value
        },
    },
}
</script>
