<template>
    <!-- <div class="c-app">
        <Navigation />
        <div class="c-wrapper c-fixed-components">
            <Header />
            <div class="c-body">
                <main class="c-main">
                    <router-view></router-view>
                </main>
            </div>
            <Footer class="footer"></Footer>
        </div>
    </div> -->
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider class="slider" theme="light" v-model="collapsed" :trigger="null" collapsible>
            <div class="logo">
                <img src="../assets/logo.png" alt="logo" />
            </div>
            <a-menu style="margin-top: 30px;" mode="inline" :default-selected-keys="['dashboard_access']">
                <a-menu-item key="dashboard_access">
                    <router-link :to="{ name: 'dashboard' }">
                        <a-icon type="dashboard" />
                        <span>Dashboard</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="application_access">
                    <a-icon type="schedule" />
                    <span>Applications</span>
                </a-menu-item>

                <a-menu-item
                    key="offer_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'offer_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'offers' }">
                        <a-icon type="bulb" />
                        <span>Offers</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="client_access">
                    <a-icon type="team" />
                    <span>Clients</span>
                </a-menu-item>

                <a-menu-item
                    key="user_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'user_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'users' }">
                        <a-icon type="user" />
                        <span>Users</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="bank_access">
                    <a-icon type="bank" />
                    <span>Banks</span>
                </a-menu-item>

                <a-menu-item
                    key="broker_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'broker_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'brokers' }">
                        <a-icon type="bold" />
                        <span>Brokers</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item
                    key="currency_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'currency_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'currencies' }">
                        <a-icon type="dollar" />
                        <span>Currencies</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item
                    key="permission_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'permission_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'permissions' }">
                        <a-icon type="unlock" />
                        <span>Permissions</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item
                    key="role_access"
                    v-if="
                        this.$store.state.auth.user.permissions.findIndex(
                            (permission) => permission === 'role_access'
                        ) !== -1
                    "
                >
                    <router-link :to="{ name: 'roles' }">
                        <a-icon type="solution" />
                        <span>Roles</span>
                    </router-link>
                </a-menu-item>
                <!-- <a-sub-menu key="setting_access" style="background-color: inherit;">
                    <span slot="title"><a-icon type="setting" />Settings</span>
                    <a-menu-item key="1">
                        option1
                    </a-menu-item>
                    <a-menu-item key="2">
                        option2
                    </a-menu-item>
                    <a-menu-item key="3">
                        option3
                    </a-menu-item>
                    <a-menu-item key="permission_access">
                        <router-link :to="{ name: 'permissions' }">
                            Permissions
                        </router-link>
                    </a-menu-item>
                </a-sub-menu> -->
                <a-menu-item key="report_access">
                    <a-icon type="line-chart" />
                    <span>Reports</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0;">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)"
                />
                <a-dropdown v-model="visible">
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                        <a-avatar icon="user" />
                        Romario Hall
                    </a>
                    <a-menu slot="overlay" @click="handleMenuClick">
                        <a-menu-item key="1">
                            Logout
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer>
                <div class="ml-auto">Powered by&nbsp;<a href="https://coreui.io/">Orba Tech</a></div>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

export default {
    name: 'Layout',

    components: {},
    data() {
        return {
            collapsed: false,
            visible: false,
        }
    },
    methods: {
        handleMenuClick(e) {
            if (e.key === '3') {
                this.visible = false
            }
        },
    },
}
</script>

<style scoped>
/* .main-container {
    background: #ececec;
    padding-left: 30px;
    padding-right: 30px;
} */

#components-layout-demo-custom-trigger {
    height: -webkit-fill-available;
}

#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 45px;
    background: #2a2f43;
    margin: 16px;
}

#components-layout-demo-custom-trigger .logo img {
    height: inherit;
}

.slider {
    flex: 0 0 250px !important;
    max-width: 250px !important;
    min-width: 250px !important;
    width: 250px !important;
    background: #2a2f43;
}

.ant-layout-sider-collapsed {
    flex: 0 0 80px !important;
    max-width: 80px !important;
    min-width: 80px !important;
    width: 80px !important;
}

.ant-menu,
.ant-menu-submenu > .ant-menu,
.ant-menu-sub.ant-menu-inline,
.ant-menu-sub {
    background-color: #2a2f43 !important;
    color: #fff !important;
}

.ant-menu-item > a,
.ant-menu-submenu-title span {
    color: #fff;
}

.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
    border-right: 3px solid #017477;
}

/* .ant-menu-item:hover {
    color: #2a2f43;
    border: #017477;
} */

.ant-menu-item:hover,
.ant-menu-item-active,
.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.ant-menu-submenu-active,
.ant-menu-submenu-title:hover,
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    color: #2a2f43 !important;
    border-right: 3px solid #017477;
    /* background-color: #e6f7ff; */
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a {
    color: #2a2f43 !important;
    /* background-color: #e6f7ff; */
}

.ant-layout-header {
    z-index: 999;
}
</style>
