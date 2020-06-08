<template>
    <div class="main-container">
        <a-card title="Edit Permission" :bordered="false">
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
                :model="permission"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-model-item
                    ref="title"
                    label="Title"
                    prop="title"
                    :validate-status="errors.title ? 'error' : ''"
                    :help="errors.title ? errors.title[0] : null"
                >
                    <a-input v-model="permission.title" />
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
            permission: {
                title: null,
            },
            rules: {
                title: [{ required: true, message: 'Please add a title', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.fetchPermission({
            payload: {
                id: this.$route.params.id,
            },
            context: this,
        }).then(() => {
            this.state.loaded = true
        })
    },
    methods: {
        ...mapActions({
            updatePermission: 'permissions/updatePermission',
            fetchPermission: 'permissions/fetchPermission',
        }),
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitButton.processing = true
                    this.submitButton.name = 'Processing...'

                    this.updatePermission({
                        payload: {
                            id: this.$route.params.id,
                            permission: this.permission,
                        },
                        context: this,
                    }).then((response) => {
                        console.log(response)
                        this.submitButton.processing = false
                        this.submitButton.name = 'Save'

                        if (this.errors.root) {
                            return
                        } else {
                            this.$router.replace({ name: 'permissions' })
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
