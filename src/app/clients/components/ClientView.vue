<template>
    <div>
        <a-popconfirm
            style="float: right;"
            title="Are you sure？"
            ok-text="Yes"
            cancel-text="No"
            v-if="!user.accredited_investor"
            @confirm="accreditedNow($route.params.id)"
        >
            <a-button type="primary">
                Make Accredited Investor
            </a-button>
        </a-popconfirm>
        <a-descriptions title="Client Info">
            <a-descriptions-item label="Name" span="3">
                {{ user.first_name }} {{ user.last_name }}
            </a-descriptions-item>
            <a-descriptions-item label="Email" span="3">
                {{ user.email }}
            </a-descriptions-item>
            <a-descriptions-item label="Email Verified At" span="3">
                {{ user.email_verified_at }}
            </a-descriptions-item>
            <a-descriptions-item label="Accredited Investor" span="3">
                {{ user.accredited_investor ? 'YES' : 'NO' }}
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const key = 'updatable'

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
            fetchUser: 'clients/fetchUser',
            makeAccreditedInvestor: 'clients/makeAccreditedInvestor',
        }),
        accreditedNow(id) {
            this.$message.loading({ content: 'Processing...', key })

            this.makeAccreditedInvestor({ payload: { id: id }, context: this }).then(() => {
                if (this.error) {
                    this.$message.error({ content: this.error, key, duration: 2 })
                } else {
                    this.$message.success({
                        content: 'Updated successfully!',
                        key,
                        duration: 2,
                    })

                    this.user.accredited_investor = true
                }
            })
        },
    },
}
</script>
