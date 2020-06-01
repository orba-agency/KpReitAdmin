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
            <a-menu mode="inline" :default-selected-keys="['1']">
                <a-menu-item key="1">
                    <a-icon type="dashboard" />
                    <span>Dashboard</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="bulb" />
                    <span>Offers</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="team" />
                    <span>Users</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <a-icon type="setting" />
                    <span>Settings</span>
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

.ant-menu {
    background: #2a2f43;
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

.ant-layout-header {
    z-index: 999;
}
</style>
