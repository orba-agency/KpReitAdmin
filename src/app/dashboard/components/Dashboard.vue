<template>
    <div>
        <a-row :gutter="16">
            <h3>Summary</h3>
            <a-col :span="8" style="text-align: center;">
                <a-statistic title="Clients" :value="data.total_users" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="usergroup-add" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8" style="text-align: center;">
                <a-statistic title="Applications" :value="data.total_applications" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="schedule" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8" style="text-align: center;">
                <a-statistic title="Offers" :value="data.total_offers" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="bulb" />
                    </template>
                </a-statistic>
            </a-col>
        </a-row>

        <br />
        <br />
        <br />
        <br />

        <a-row :gutter="16">
            <a-col :span="2" style="text-align: center;"></a-col>
            <a-col :span="8" style="text-align: center;">
                <h3>Application status</h3>
                <PieChart
                    v-if="loaded"
                    :chartdata="[data.pie_draft, data.pie_pending, data.pie_approved, data.pie_rejected]"
                />
            </a-col>
            <a-col :span="4" style="text-align: center;"></a-col>
            <a-col :span="8" style="text-align: center;">
                <h3>Offer total</h3>
                <BarChart v-if="loaded" :barlabel="barLabel" :bartotal="barTotal" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PieChart from './PieChart'
import BarChart from './BarChart'
export default {
    components: {
        PieChart,
        BarChart,
    },
    data() {
        return {
            data: {},
            loaded: false,
            barLabel: [],
            barTotal: [],
        }
    },
    created() {
        this.fetchDashboard({
            payload: {},
            context: this,
        }).then(() => {
            this.loaded = true
            for (var prop in this.data.offers) {
                this.barLabel.push(this.data.offers[prop].title)
                this.barTotal.push(this.data.offers[prop].total)
            }
        })
    },
    methods: {
        ...mapActions({
            fetchDashboard: 'dashboard/fetchDashboard',
        }),
    },
}
</script>
