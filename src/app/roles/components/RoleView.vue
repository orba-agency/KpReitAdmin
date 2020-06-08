<template>
    <a-descriptions title="Role Info">
        <a-descriptions-item label="Title" span="3">
            {{ role.title }}
        </a-descriptions-item>
        <a-descriptions-item label="Permissions" span="3">
            <a-tag color="green" v-for="val in role.permissions" :key="val.id">
                {{ val.title }}
            </a-tag>
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            role: {},
            state: {
                loaded: false,
            },
        }
    },
    created() {
        this.fetchRole({
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
            fetchRole: 'roles/fetchRole',
        }),
    },
}
</script>
