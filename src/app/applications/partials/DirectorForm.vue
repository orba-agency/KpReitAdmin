<template>
    <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="Directors">
                <a-button type="dashed" style="width: 60%;" @click="more"> <a-icon type="plus" /> Add </a-button>
            </a-form-model-item>
            <a-form-model-item
                v-for="(item, index) in form.directors.slice().reverse()"
                :key="item.key"
                prop="directors"
                class="item-margin"
            >
                <a-form-model-directors
                    :prop="'directors.' + index + '.first_name'"
                    :rules="{
                        required: true,
                        message: 'First name is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['directors.' + index + '.first_name'] ? 'error' : ''"
                    :help="
                        errors['directors.' + index + '.first_name']
                            ? errors['directors.' + index + '.first_name'][0]
                            : null
                    "
                >
                    <a-input v-model="item.first_name" placeholder="First name" />
                </a-form-model-directors>

                <a-form-model-item
                    :prop="'directors.' + index + '.last_name'"
                    :rules="{
                        required: true,
                        message: 'Last name is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['directors.' + index + '.last_name'] ? 'error' : ''"
                    :help="
                        errors['directors.' + index + '.last_name']
                            ? errors['directors.' + index + '.last_name'][0]
                            : null
                    "
                >
                    <a-input v-model="item.last_name" placeholder="Last name" />
                </a-form-model-item>

                <a-form-model-item
                    :prop="'directors.' + index + '.email'"
                    :rules="{
                        required: true,
                        message: 'Email is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['directors.' + index + '.email'] ? 'error' : ''"
                    :help="errors['directors.' + index + '.email'] ? errors['directors.' + index + '.email'][0] : null"
                >
                    <a-input v-model="item.email" placeholder="Email" />
                </a-form-model-item>

                <a-form-model-item
                    :prop="'directors.' + index + '.trn'"
                    :rules="{
                        required: true,
                        message: 'TRN is required',
                        trigger: 'blur',
                    }"
                    :validate-status="errors['directors.' + index + '.trn'] ? 'error' : ''"
                    :help="errors['directors.' + index + '.trn'] ? errors['directors.' + index + '.trn'][0] : null"
                >
                    <a-input v-model="item.trn" placeholder="TRN" />
                </a-form-model-item>

                <a-icon
                    v-if="form.directors.length > 1"
                    class="dynamic-delete-button"
                    type="minus-circle-o"
                    :disabled="form.directors.length === 1"
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
            let index = this.form.directors.indexOf(item)
            if (index !== -1) {
                this.form.directors.splice(index, 1)
            }
        },
        more() {
            this.form.directors.push({
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
