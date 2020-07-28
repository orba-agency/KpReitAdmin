<template>
    <div class="main-container">
        <a-card title="New Offer" :bordered="false">
            <a-row v-if="message">
                <a-col :span="14" :offset="4">
                    <a-alert type="error" :message="message" banner />
                </a-col>
                <br />
                <br />
                <br />
            </a-row>
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="Upload Logo" prop="logo">
                    <a-upload
                        name="logo"
                        list-type="picture-card"
                        class="logo-uploader"
                        :multiple="false"
                        :show-upload-list="false"
                        :custom-request="customRequest"
                        :before-upload="beforeLogoUpload"
                        @change="handleLogoChange"
                    >
                        <img v-if="logoUrl" :src="logoUrl" alt="logo" />
                        <div v-else>
                            <a-icon :type="loadingLogo ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                                Upload Logo
                            </div>
                        </div>
                    </a-upload>
                </a-form-model-item>

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
                    ref="short_name"
                    label="Short Name"
                    prop="short_name"
                    :validate-status="errors.short_name ? 'error' : ''"
                    :help="errors.short_name ? errors.short_name[0] : ''"
                >
                    <a-input v-model="form.short_name" />
                </a-form-model-item>

                <a-form-model-item
                    ref="prefix"
                    label="Prefix"
                    prop="prefix"
                    :validate-status="errors.prefix ? 'error' : ''"
                    :help="errors.prefix ? errors.prefix[0] : null"
                >
                    <a-input v-model="form.prefix" />
                </a-form-model-item>

                <a-form-model-item
                    label="Description"
                    prop="description"
                    :validate-status="errors.description ? 'error' : ''"
                    :help="errors.description ? errors.description[0] : null"
                >
                    <a-input v-model="form.description" type="textarea" />
                </a-form-model-item>

                <a-form-model-item
                    label="Broker"
                    prop="broker_id"
                    :validate-status="errors.broker_id ? 'error' : ''"
                    :help="errors.broker_id ? errors.broker_id[0] : null"
                >
                    <a-select v-model="form.broker_id" placeholder="Please select broker">
                        <a-select-option v-for="(value, index) in brokers" :key="index" :value="value.id">
                            {{ value.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    label="Type"
                    prop="type"
                    :validate-status="errors.type ? 'error' : ''"
                    :help="errors.type ? errors.type[0] : null"
                >
                    <a-select v-model="form.type" placeholder="Please select type">
                        <a-select-option value="Land">
                            Land
                        </a-select-option>
                        <a-select-option value="Residential">
                            Residential
                        </a-select-option>
                        <a-select-option value="Commercial">
                            Commercial
                        </a-select-option>
                        <a-select-option value="Industrial">
                            Industrial
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    label="Opening Date"
                    required
                    prop="opening_date"
                    :validate-status="errors.opening_date ? 'error' : ''"
                    :help="errors.opening_date ? errors.opening_date[0] : null"
                >
                    <a-date-picker
                        v-model="form.opening_date"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%;"
                    />
                </a-form-model-item>

                <a-form-model-item
                    label="Closing Date"
                    required
                    prop="closing_date"
                    :validate-status="errors.closing_date ? 'error' : ''"
                    :help="errors.closing_date ? errors.closing_date[0] : null"
                >
                    <a-date-picker
                        v-model="form.closing_date"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%;"
                    />
                </a-form-model-item>

                <a-form-model-item
                    label="Currency"
                    prop="currency_id"
                    :validate-status="errors.currency_id ? 'error' : ''"
                    :help="errors.currency_id ? errors.currency_id[0] : null"
                >
                    <a-select v-model="form.currency_id" placeholder="Please select currency" @change="handleCurrency">
                        <a-select-option v-for="(value, index) in currencies" :key="index" :value="value.id">
                            {{ value.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    label="Unit Price"
                    prop="unit_price"
                    :validate-status="errors.unit_price ? 'error' : ''"
                    :help="errors.unit_price ? errors.unit_price[0] : null"
                >
                    <a-input
                        v-model="form.unit_price"
                        :prefix="currency.symbol"
                        :suffix="currency.code"
                        :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                        style="width: 30%;"
                    />
                </a-form-model-item>

                <a-form-model-item
                    label="Min. Invest."
                    prop="minimum"
                    :validate-status="errors.minimum ? 'error' : ''"
                    :help="errors.minimum ? errors.minimum[0] : null"
                >
                    <a-input
                        v-model="form.minimum"
                        :prefix="currency.symbol"
                        :suffix="currency.code"
                        :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                        style="width: 30%;"
                    />
                </a-form-model-item>

                <a-form-model-item
                    label="Max. Invest."
                    prop="maximum"
                    :validate-status="errors.maximum ? 'error' : ''"
                    :help="errors.maximum ? errors.maximum[0] : null"
                >
                    <a-input
                        v-model="form.maximum"
                        :prefix="currency.symbol"
                        :suffix="currency.code"
                        :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                        style="width: 30%;"
                    />
                </a-form-model-item>

                <a-form-model-item
                    label="Available"
                    prop="available"
                    :validate-status="errors.available ? 'error' : ''"
                    :help="errors.available ? errors.available[0] : null"
                >
                    <a-input-number v-model="form.available" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Increment Size"
                    prop="increment_size"
                    :validate-status="errors.increment_size ? 'error' : ''"
                    :help="errors.increment_size ? errors.increment_size[0] : null"
                >
                    <a-input-number v-model="form.increment_size" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Market Value"
                    prop="market_value"
                    :validate-status="errors.market_value ? 'error' : ''"
                    :help="errors.market_value ? errors.market_value[0] : null"
                >
                    <a-input-number v-model="form.market_value" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Distribution Value"
                    prop="distribution_value"
                    :validate-status="errors.distribution_value ? 'error' : ''"
                    :help="errors.distribution_value ? errors.distribution_value[0] : null"
                >
                    <a-input-number v-model="form.distribution_value" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Cash Yield"
                    prop="cash_yield"
                    :validate-status="errors.cash_yield ? 'error' : ''"
                    :help="errors.cash_yield ? errors.cash_yield[0] : null"
                >
                    <a-input-number v-model="form.cash_yield" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Internal Rate of Return (IRR)"
                    prop="irr"
                    :validate-status="errors.irr ? 'error' : ''"
                    :help="errors.irr ? errors.irr[0] : null"
                >
                    <a-input-number v-model="form.irr" style="width: 30%;" />
                </a-form-model-item>

                <a-form-model-item
                    label="Status"
                    prop="status"
                    :validate-status="errors.status ? 'error' : ''"
                    :help="errors.status ? errors.status[0] : null"
                >
                    <a-radio-group v-model="form.status">
                        <a-radio value="Pre-open">
                            Pre-open
                        </a-radio>
                        <a-radio value="Open">
                            Open
                        </a-radio>
                        <a-radio value="Closed">
                            Closed
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>

                <a-form-model-item
                    label="Published"
                    prop="published"
                    :validate-status="errors.published ? 'error' : ''"
                    :help="errors.published ? errors.published[0] : null"
                >
                    <a-switch v-model="form.published" />
                </a-form-model-item>

                <a-form-model-item label="Gallery">
                    <a-upload
                        list-type="picture-card"
                        :file-list="fileList"
                        :custom-request="customRequest"
                        @preview="handleGalleryPreview"
                        @change="handleGalleryChange"
                    >
                        <div>
                            <a-icon type="plus" />
                            <div class="ant-upload-text">
                                Upload Photo
                            </div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%;" :src="previewImage" />
                    </a-modal>
                </a-form-model-item>

                <a-form-model-item label="Fee">
                    <a-button type="dashed" style="width: 60%;" @click="addFee"> <a-icon type="plus" /> Add </a-button>
                </a-form-model-item>

                <a-form-model-item
                    v-for="(fee, index) in form.fees.slice().reverse()"
                    :key="fee.key"
                    prop="fees"
                    class="item-margin"
                >
                    <a-form-model-item
                        style="float: left; width: 35%;"
                        :prop="'fees.' + index + '.name'"
                        :rules="{
                            required: true,
                            message: 'Name is required',
                            trigger: 'blur',
                        }"
                        :validate-status="errors['fees.' + index + '.name'] ? 'error' : ''"
                        :help="errors['fees.' + index + '.name'] ? errors['fees.' + index + '.name'][0] : null"
                    >
                        <a-input v-model="fee.name" placeholder="Fee name" />
                    </a-form-model-item>

                    <a-form-model-item
                        style="float: left; margin-left: 10px; width: 25%;"
                        :validate-status="errors['fees.' + index + '.type'] ? 'error' : ''"
                        :help="errors['fees.' + index + '.type'] ? errors['fees.' + index + '.type'][0] : null"
                    >
                        <a-select v-model="fee.type" placeholder="Please select type">
                            <a-select-option value="Flat">
                                Flat
                            </a-select-option>
                            <a-select-option value="Percentage">
                                Percentage
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item
                        style="float: left; margin-left: 10px; width: 30%;"
                        :prop="'fees.' + index + '.amount'"
                        :rules="{
                            required: true,
                            message: 'Amount is required',
                            trigger: 'blur',
                        }"
                        :validate-status="errors['fees.' + index + '.amount'] ? 'error' : ''"
                        :help="errors['fees.' + index + '.amount'] ? errors['fees.' + index + '.amount'][0] : null"
                    >
                        <a-input
                            v-model="fee.amount"
                            :prefix="fee.type === 'Flat' ? currency.symbol : ''"
                            :suffix="fee.type === 'Percentage' ? '%' : currency.code"
                            placeholder="Amount"
                        />
                    </a-form-model-item>

                    <a-icon
                        v-if="form.fees.length > 1"
                        class="dynamic-delete-button"
                        type="minus-circle-o"
                        :disabled="form.fees.length === 1"
                        @click="removeFee(fee)"
                    />
                </a-form-model-item>

                <a-form-model-item label="Video Link">
                    <a-button type="dashed" style="width: 60%;" @click="addVideo">
                        <a-icon type="plus" /> Add
                    </a-button>
                </a-form-model-item>

                <a-form-model-item
                    v-for="(gallery, index) in form.galleries"
                    :key="gallery.key"
                    :prop="'videos.' + index + '.url'"
                    class="item-margin"
                    :rules="{
                        required: true,
                        message: 'Url is required',
                        trigger: 'blur',
                    }"
                >
                    <div v-if="gallery.type === 'Video'">
                        <a-input
                            v-model="gallery.url"
                            placeholder="Please input video link"
                            style="width: 60%; margin-right: 8px;"
                        />
                        <a-icon
                            v-if="form.videos.length > 1"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            :disabled="form.videos.length === 1"
                            @click="removeVideo(video)"
                        />
                    </div>
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
import { upload, getBase64 } from '../../../helpers'
import { mapActions, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            logoUrl: null,
            loadingLogo: false,
            other: '',
            previewImage: null,
            previewVisible: false,
            fileList: [],
            message: null,
            errors: [],
            brokers: [],
            currencies: [],
            submitButton: {
                name: 'Create',
                processing: false,
            },
            currency: {
                code: null,
                symbol: null,
            },
            form: {
                prefix: null,
                title: null,
                short_name: null,
                description: null,
                type: null,
                broker_id: null,
                currency_id: null,
                status: null,
                opening_date: null,
                closing_date: null,
                unit_price: null,
                minimum: null,
                maximum: null,
                available: null,
                increment_size: null,
                market_value: null,
                distribution_value: null,
                cash_yield: null,
                irr: null,
                published: false,
                logo_upload_id: null,
                fees: [],
                galleries: [],
                videos: [],
            },
            rules: {
                // logo: [{ required: true, message: 'Please add a logo', trigger: 'change' }],
                title: [{ required: true, message: 'Please add a title', trigger: 'blur' }],
                prefix: [{ required: true, message: 'Please add aprefix', trigger: 'blur' }],
                short_name: [{ required: true, message: 'Please add a short name', trigger: 'blur' }],
                description: [{ required: true, message: 'Please add a description', trigger: 'blur' }],
                broker_id: [{ required: true, message: 'Please select a broker', trigger: 'change' }],
                currency_id: [{ required: true, message: 'Please select a currency', trigger: 'change' }],
                type: [{ required: true, message: 'Please select a type', trigger: 'change' }],
                opening_date: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
                closing_date: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
                unit_price: [{ required: true, message: 'Please add a unit price', trigger: 'blur' }],
                minimum: [{ required: true, message: 'Please add a minimum investment', trigger: 'blur' }],
                maximum: [{ required: true, message: 'Please add a maximum investment', trigger: 'blur' }],
                increment_size: [{ required: true, message: 'Please add a increment size', trigger: 'blur' }],
                available: [{ required: true, message: 'Please add a available', trigger: 'blur' }],
                market_value: [{ required: true, message: 'Please add a market vale', trigger: 'blur' }],
                distribution_value: [{ required: true, message: 'Please add a distribution value', trigger: 'blur' }],
                cash_yield: [{ required: true, message: 'Please add a cash yield', trigger: 'blur' }],
                irr: [{ required: true, message: 'Please add an IRR', trigger: 'blur' }],
                status: [{ required: true, message: 'Please add a status' }],
                fee: [
                    {
                        type: 'object',
                        fields: {
                            name: { type: 'string', required: true, trigger: 'blur' },
                            type: { type: 'string', required: true },
                            amount: { type: 'number', required: true },
                        },
                    },
                ],
            },
        }
    },
    created() {
        if (isEmpty(this.brokers)) {
            this.fetchAllBrokers({ all: true }).then((response) => {
                this.brokers = response
            })
        }
        if (isEmpty(this.currencies)) {
            this.fetchAllCurrencies({ all: true }).then((response) => {
                this.currencies = response
                if (!isEmpty(this.offer.currency_id)) {
                    this.handleCurrency(this.offer.currency_id)
                }
            })
        }
    },
    methods: {
        ...mapActions({
            createOffer: 'offers/createOffer',
            fetchAllBrokers: 'brokers/fetchAll',
            fetchAllCurrencies: 'currencies/fetchAll',
        }),
        handleLogoChange(info) {
            if (info.file.status === 'uploading') {
                this.loadingLogo = true
                return
            }
            if (info.file.status === 'done') {
                this.logoUrl = info.file.xhr.url
                this.form.logo_upload_id = info.file.xhr.id
                this.loadingLogo = false
            }
        },
        beforeLogoUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            return isJpgOrPng && isLt2M
        },
        customRequest: ({ onSuccess, onError, file }) => {
            upload(file).then((result) => {
                if (result) {
                    onSuccess(file, result)
                }
            })
        },
        handleGalleryChange(info) {
            console.log(info)
            this.fileList = info.fileList
            this.form.galleries = info.fileList.map((value) => {
                return {
                    upload_id: value.xhr.id,
                    url: value.xhr.url,
                    type: 'Photo',
                }
            })
        },
        handleCancel() {
            this.previewVisible = false
        },
        async handleGalleryPreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
        },
        handleUpload() {
            console.log('upload')
        },
        handleCurrency(value) {
            this.currencies.map((cur) => {
                if (value === cur.id) this.currency = cur
            })
        },
        onSubmit() {
            // this.$refs.ruleForm.validate((valid) => {
            //     if (valid) {
            // alert('submit!')
            this.submitButton.processing = true
            this.submitButton.name = 'Processing...'

            this.createOffer({
                payload: this.form,
                context: this,
            }).then((response) => {
                console.log(response)
                this.submitButton.processing = false
                this.submitButton.name = 'Create'

                if (this.errors.root) {
                    return
                } else {
                    // Redirect to new offer view
                }
            })
            // } else {
            //     console.log('error submit!!')
            //     return false
            // }
            // })
        },
        removeVideo(item) {
            let index = this.form.galleries.indexOf(item)
            if (index !== -1) {
                this.form.galleries.splice(index, 1)
            }
        },
        addVideo() {
            this.form.galleries.push({
                url: null,
                key: Date.now(),
                type: 'Video',
            })
        },
        removeFee(item) {
            let index = this.form.fees.indexOf(item)
            if (index !== -1) {
                this.form.fees.splice(index, 1)
            }
        },
        addFee() {
            this.form.fees.push({
                name: '',
                type: 'Flat',
                amount: null,
                key: Date.now(),
            })
        },
    },
}
</script>

<style>
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
}
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.item-margin {
    margin-left: 200px;
}

.ant-form-item-label {
    padding: 0 !important;
}
</style>
