<template>
    <div>
        <a-button type="primary" @click="showFormModal({ type: null, description: null })">
            New
        </a-button>

        <a-table :columns="columns" :data-source="payments">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="action" slot-scope="text, record">
                <a-button type="link" @click="showModal(record)"> View </a-button>
                <a-divider type="vertical" />
                <a-button type="link" @click="showFormModal(record)"> Edit </a-button>
                <a-divider type="vertical" />
                <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No" @confirm="deleteRecord(record.id)">
                    <a-button type="link">Delete</a-button>
                </a-popconfirm>
            </span>
        </a-table>

        <a-modal v-model="visible" :title="payment.type" @ok="handleOk">
            <span v-html="payment.description"> {{ payment.description }} </span>
        </a-modal>

        <a-modal v-model="formVisible" title="Store payment" width="720px" @ok="handleFormOk">
            <a-form-model ref="ruleForm" :model="payment" :rules="rules">
                <a-form-model-item
                    label="Type"
                    prop="type"
                    :validate-status="errors.type ? 'error' : ''"
                    :help="errors.type ? errors.type[0] : null"
                >
                    <a-select v-model="payment.type" placeholder="Please select type">
                        <a-select-option value="Cheque">
                            Cheque
                        </a-select-option>
                        <a-select-option value="Electronic">
                            Electronic
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    prop="description"
                    :validate-status="errors.description ? 'error' : ''"
                    :help="errors.description ? errors.description[0] : null"
                >
                    <wysiwyg v-model="payment.description" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const columns = [
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
]

export default {
    props: {
        payments: Array,
        offer_id: Number,
    },
    data() {
        return {
            columns,
            visible: false,
            formVisible: false,
            payment: {},
            errors: [],
            rules: {
                type: [{ required: true, message: 'Please select a type', trigger: 'blur' }],
                description: [{ required: true, message: 'Please add a description', trigger: 'blur' }],
            },
        }
    },
    methods: {
        ...mapActions({
            save: 'offers/savePayment',
            destroy: 'offers/deletePayment',
        }),
        showModal(payment) {
            this.payment = payment
            this.visible = true
        },
        handleOk(e) {
            console.log(e)
            this.visible = false
        },
        showFormModal(payment) {
            this.errors = []
            this.payment = payment
            this.formVisible = true
        },
        handleFormOk(e) {
            console.log(e)
            console.log(this.$refs.ruleForm)

            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // alert('submit!')

                    this.save({
                        payload: this.payment,
                        context: this,
                    }).then((response) => {
                        // console.log(response)
                        // this.payments = response.payments
                        this.$emit('update-offer', response)

                        if (this.errors.root) {
                            return
                        }
                        this.formVisible = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        deleteRecord(id) {
            this.destroy({
                payload: { id: id },
                context: this,
            }).then((response) => {
                this.$emit('update-offer', response)

                if (this.errors.root) {
                    return
                }
            })
        },
    },
}
</script>
