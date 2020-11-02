<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-statistic title="Clients" :value="data.total_users" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="usergroup-add" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8">
                <a-statistic title="Applications" :value="data.total_applications" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="schedule" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8">
                <a-statistic title="Offers" :value="data.offers" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="bulb" />
                    </template>
                </a-statistic>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            data: {},
        }
    },
    created() {
        this.fetchDashboard({
            payload: {},
            context: this,
        })
    },
    methods: {
        ...mapActions({
            fetchDashboard: 'dashboard/fetchDashboard',
        }),
    },
}
</script>
