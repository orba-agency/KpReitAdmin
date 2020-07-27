<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-statistic title="Clients" :value="1128" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="usergroup-add" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8">
                <a-statistic title="Applications" :value="1128" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="schedule" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span="8">
                <a-statistic title="Offers" :value="1128" style="margin-right: 50px;">
                    <template #suffix>
                        <a-icon type="bulb" />
                    </template>
                </a-statistic>
            </a-col>
        </a-row>

        <a-row :gutter="16">
            <a-col :span="12" style="padding: 30px;">
                <h4 style="text-align: center;">Application Status</h4>
                Draft
                <a-progress :percent="30" />
                Pending
                <a-progress :percent="50" status="active" />
                Rejected
                <a-progress :percent="70" status="exception" />
                Approved
                <a-progress :percent="100" />
            </a-col>
            <a-col :span="12" style="padding: 30px; text-align: center;">
                <h4>Offer Status</h4>
                <a-progress type="circle" :percent="75" />
                <a-progress type="circle" :percent="70" status="exception" />
                <a-progress type="circle" :percent="100" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {}
</script>
