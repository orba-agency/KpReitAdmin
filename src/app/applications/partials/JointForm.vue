<template>
    <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="Joint Holders">
                <a-button type="dashed" style="width: 60%;" @click="more"> <a-icon type="plus" /> Add </a-button>
            </a-form-model-item>
            <a-form-model-item
                v-for="(item, index) in form.joint_accounts.slice().reverse()"
                :key="item.key"
                prop="joint_accounts"
                class="item-margin"
            >
                <a-form-model-item
                    :prop="'joint_accounts.' + index + '.first_name'"
                    :rules="{
                        required: true,
                        message: 'Firstname is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['joint_accounts.' + index + '.first_name'] ? 'error' : ''"
                    :help="
                        errors['joint_accounts.' + index + '.first_name']
                            ? errors['joint_accounts.' + index + '.first_name'][0]
                            : null
                    "
                >
                    <a-input v-model="item.first_name" placeholder="First name" />
                </a-form-model-item>

                <a-form-model-item
                    :prop="'joint_accounts.' + index + '.last_name'"
                    :rules="{
                        required: true,
                        message: 'Firstname is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['joint_accounts.' + index + '.last_name'] ? 'error' : ''"
                    :help="
                        errors['joint_accounts.' + index + '.last_name']
                            ? errors['joint_accounts.' + index + '.last_name'][0]
                            : null
                    "
                >
                    <a-input v-model="item.last_name" placeholder="Last name" />
                </a-form-model-item>

                <a-form-model-item
                    :prop="'joint_accounts.' + index + '.email'"
                    :rules="{
                        required: true,
                        message: 'Email is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['joint_accounts.' + index + '.email'] ? 'error' : ''"
                    :help="
                        errors['joint_accounts.' + index + '.email']
                            ? errors['joint_accounts.' + index + '.email'][0]
                            : null
                    "
                >
                    <a-input v-model="item.email" placeholder="Email" />
                </a-form-model-item>

                <a-form-model-item
                    :prop="'joint_accounts.' + index + '.trn'"
                    :rules="{
                        required: true,
                        message: 'TRN is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['joint_accounts.' + index + '.trn'] ? 'error' : ''"
                    :help="
                        errors['joint_accounts.' + index + '.trn']
                            ? errors['joint_accounts.' + index + '.trn'][0]
                            : null
                    "
                >
                    <a-input v-model="item.trn" placeholder="TRN" />
                </a-form-model-item>

                <a-icon
                    v-if="form.joint_accounts.length > 1"
                    class="dynamic-delete-button"
                    type="minus-circle-o"
                    :disabled="form.joint_accounts.length === 1"
                    @click="remove(item)"
                />
                <a-divider />
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
            currency: {
                code: 'JMD',
                symbol: '$',
            },
            rules: {
                title: [{ required: true, message: 'Please add a title', trigger: 'blur' }],
            },
        }
    },
    methods: {
        remove(item) {
            let index = this.form.joint_accounts.indexOf(item)
            if (index !== -1) {
                this.form.joint_accounts.splice(index, 1)
            }
        },
        more() {
            this.form.joint_accounts.push({
                first_name: '',
                last_name: '',
                email: '',
                trn: '',
                key: Date.now(),
            })
        },
    },
}
</script>
