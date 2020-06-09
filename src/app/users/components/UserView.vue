<template>
    <a-descriptions title="User Info">
        <a-descriptions-item label="Name" span="3"> {{ user.first_name }} {{ user.last_name }} </a-descriptions-item>
        <a-descriptions-item label="Email" span="3">
            {{ user.email }}
        </a-descriptions-item>
        <a-descriptions-item label="Roles" span="3">
            <a-tag color="green" v-for="val in user.roles" :key="val.id">
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
            user: {},
            state: {
                loaded: false,
            },
        }
    },
    created() {
        this.fetchUser({
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
            fetchUser: 'users/fetchUser',
        }),
    },
}
</script>
