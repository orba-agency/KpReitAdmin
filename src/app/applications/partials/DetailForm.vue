<template>
    <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item
                label="Type"
                prop="type"
                :validate-status="errors.type ? 'error' : ''"
                :help="errors.type ? errors.type[0] : null"
            >
                <a-select v-model="form.type" placeholder="Please select type">
                    <a-select-option value="Individual">
                        Individual
                    </a-select-option>
                    <a-select-option value="Corporation">
                        Corporation
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item
                label="Shares Amount"
                prop="units"
                :validate-status="errors.units ? 'error' : ''"
                :help="errors.units ? errors.units[0] : null"
            >
                <a-input-number
                    v-model="form.units"
                    :formatter="(value) => `${currency.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                />
            </a-form-model-item>

            <a-form-model-item
                ref="name"
                label="Name"
                prop="name"
                v-if="form.type === 'Corporation'"
                :validate-status="errors.name ? 'error' : ''"
                :help="errors.address_line1 ? errors.name[0] : null"
            >
                <a-input v-model="form.name" />
            </a-form-model-item>

            <a-form-model-item
                ref="email"
                label="Email"
                prop="email"
                :validate-status="errors.email ? 'error' : ''"
                :help="errors.address_line1 ? errors.email[0] : null"
            >
                <a-input v-model="form.email" />
            </a-form-model-item>

            <a-form-model-item
                ref="phone_number"
                label="Phone"
                prop="phone_number"
                :validate-status="errors.phone_number ? 'error' : ''"
                :help="errors.address_line1 ? errors.phone_number[0] : null"
            >
                <a-input v-model="form.phone_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="work_phone_number"
                label="Phone(Work)"
                prop="work_phone_number"
                v-if="form.type === 'Corporation'"
                :validate-status="errors.work_phone_number ? 'error' : ''"
                :help="errors.address_line1 ? errors.work_phone_number[0] : null"
            >
                <a-input v-model="form.work_phone_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="trn"
                label="TRN"
                prop="trn"
                :validate-status="errors.trn ? 'error' : ''"
                :help="errors.address_line1 ? errors.trn[0] : null"
            >
                <a-input v-model="form.trn" />
            </a-form-model-item>

            <a-form-model-item
                ref="broker_id"
                label="Broker"
                prop="broker_id"
                :validate-status="errors.broker_id ? 'error' : ''"
                :help="errors.address_line1 ? errors.broker_id[0] : null"
            >
                <a-input v-model="form.broker_id" />
            </a-form-model-item>

            <a-form-model-item
                ref="jcsd_account_number"
                label="JCSD Account Number"
                prop="jcsd_account_number"
                :validate-status="errors.jcsd_account_number ? 'error' : ''"
                :help="errors.address_line1 ? errors.jcsd_account_number[0] : null"
            >
                <a-input v-model="form.jcsd_account_number" />
            </a-form-model-item>

            <a-form-model-item
                ref="address_line1"
                label="Address Line 1"
                prop="address_line1"
                :validate-status="errors.address_line1 ? 'error' : ''"
                :help="errors.address_line1 ? errors.address_line1[0] : null"
            >
                <a-input v-model="form.address_line1" />
            </a-form-model-item>

            <a-form-model-item
                ref="address_line2"
                label="Address Line 2"
                prop="address_line2"
                :validate-status="errors.address_line2 ? 'error' : ''"
                :help="errors.address_line1 ? errors.address_line2[0] : null"
            >
                <a-input v-model="form.address_line2" />
            </a-form-model-item>

            <a-form-model-item
                ref="city"
                label="City"
                prop="city"
                :validate-status="errors.city ? 'error' : ''"
                :help="errors.address_line1 ? errors.city[0] : null"
            >
                <a-input v-model="form.city" />
            </a-form-model-item>

            <a-form-model-item
                ref="parish"
                label="Parish"
                prop="parish"
                :validate-status="errors.parish ? 'error' : ''"
                :help="errors.address_line1 ? errors.parish[0] : null"
            >
                <a-input v-model="form.parish" />
            </a-form-model-item>

            <a-form-model-item
                ref="postal_code"
                label="Postal Code"
                prop="postal_code"
                :validate-status="errors.postal_code ? 'error' : ''"
                :help="errors.address_line1 ? errors.postal_code[0] : null"
            >
                <a-input v-model="form.postal_code" />
            </a-form-model-item>

            <a-form-model-item
                ref="country"
                label="Country"
                prop="country"
                :validate-status="errors.country ? 'error' : ''"
                :help="errors.address_line1 ? errors.country[0] : null"
            >
                <a-input v-model="form.country" />
            </a-form-model-item>

            <a-form-model-item
                ref="occupation"
                label="Occupation"
                prop="occupation"
                v-if="form.type === 'Individual'"
                :validate-status="errors.occupation ? 'error' : ''"
                :help="errors.address_line1 ? errors.occupation[0] : null"
            >
                <a-input v-model="form.occupation" />
            </a-form-model-item>

            <a-form-model-item
                ref="line_of_business"
                label="Line of Business"
                prop="line_of_business"
                v-if="form.type === 'Corporation'"
                :validate-status="errors.line_of_business ? 'error' : ''"
                :help="errors.address_line1 ? errors.line_of_business[0] : null"
            >
                <a-input v-model="form.line_of_business" />
            </a-form-model-item>

            <a-form-model-item
                ref="incorporation"
                label="Country of Incorporation"
                prop="incorporation"
                v-if="form.type === 'Corporation'"
                :validate-status="errors.incorporation ? 'error' : ''"
                :help="errors.address_line1 ? errors.incorporation[0] : null"
            >
                <a-input v-model="form.incorporation" />
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
}
</script>
