<template>
    <div>
        <a-upload
            list-type="picture-card"
            :file-list="fileList"
            :custom-request="customRequest"
            @preview="handlePreview"
            @change="handleChange"
        >
            <div v-if="galleries.length < 15">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                    Upload
                </div>
            </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%;" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { upload, getBase64 } from '../../../helpers'
import { mapActions } from 'vuex'

const key = 'updatable'

export default {
    props: {
        galleries: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            action: null,
            error: null,
            previewVisible: false,
            previewImage: '',
        }
    },
    computed: {
        fileList() {
            return this.galleries
        },
    },
    methods: {
        ...mapActions({
            updateGallery: 'offers/updateGallery',
            deleteGallery: 'offers/deleteGallery',
        }),
        customRequest: ({ onSuccess, onError, file }) => {
            upload(file).then((result) => {
                if (result) {
                    onSuccess(file, result)
                }
            })
        },
        handleCancel() {
            this.previewVisible = false
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
        },
        handleChange(info) {
            if (this.galleries.length < info.fileList.length) {
                this.action = 'add'
            } else if (this.galleries.length > info.fileList.length) {
                this.action = 'delete'
            }
            this.galleries = info.fileList

            console.log(this.action)
            console.log(info)

            if (this.action === 'add' && info.file.status === 'done') {
                this.updateGallery({
                    payload: {
                        id: this.$route.params.id,
                        upload_id: info.file.xhr.id,
                    },
                    context: this,
                }).then((resp) => {
                    this.action = null
                    if (this.error) {
                        this.$message.error({ content: this.error, key, duration: 2 })
                    } else {
                        console.log('response', resp)
                        this.galleries = resp.galleries.map((item) => {
                            return {
                                gallery_id: item.id,
                                uid: item.id,
                                name: Date.now().toString(),
                                status: 'done',
                                url: item.url,
                            }
                        })
                        this.$message.success({
                            content: 'Uploaded successfully!',
                            key,
                            duration: 2,
                        })
                    }
                })
            }

            if (this.action === 'delete') {
                this.deleteGallery({
                    payload: {
                        id: this.$route.params.id,
                        gallery_id: info.file.gallery_id,
                    },
                    context: this,
                }).then(() => {
                    if (this.error) {
                        this.$message.error({ content: this.error, key, duration: 2 })
                        info.file.status = 'done'
                        this.galleries.push(info.file)
                    } else {
                        this.$message.success({
                            content: 'Deleted successfully!',
                            key,
                            duration: 2,
                        })
                    }
                })
            }
        },
    },
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
