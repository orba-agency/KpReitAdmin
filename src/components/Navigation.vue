<template>
     <div class="c-sidebar c-sidebar-dark c-sidebar-fixed" v-bind:class="{ 'c-sidebar-lg-show': $store.state.sidebarShow }" id="sidebar">
          <div class="c-sidebar-brand d-lg-down-none">
               <img id="logo" src="../assets/logo.png" alt="logo" />
          </div>
          <ul class="c-sidebar-nav">
               <li class="c-sidebar-nav-item">
                    <router-link :to="{ name: 'dashboard' }">
                        <a class="c-sidebar-nav-link">
                            <svg class="c-sidebar-nav-icon">
                                <use xlink:href="@coreui/icons/sprites/free.svg#cil-speedometer"></use>
                            </svg>
                            Dashboard
                        </a>
                    </router-link>
               </li>
               <li class="c-sidebar-nav-item">
                    <router-link :to="{ name: 'offers' }">
                        <a class="c-sidebar-nav-link">
                            <svg class="c-sidebar-nav-icon">
                                <use xlink:href="@coreui/icons/sprites/free.svg#cil-puzzle"></use>
                            </svg>
                            Offers
                        </a>
                    </router-link>
               </li>
               <li class="c-sidebar-nav-item">
                    <router-link :to="{ name: 'applications' }">
                        <a class="c-sidebar-nav-link">
                            <svg class="c-sidebar-nav-icon">
                                <use xlink:href="@coreui/icons/sprites/free.svg#cil-pencil"></use>
                            </svg>
                            Applications
                        </a>
                    </router-link>
               </li>
               <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-bind:class="{ 'c-show': minimizeSetting }">
                    <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" @click="minimize('settings')">
                         <svg class="c-sidebar-nav-icon">
                              <use xlink:href="@coreui/icons/sprites/free.svg#cil-settings"></use>
                         </svg>
                         Settings
                    </a>
                    <ul class="c-sidebar-nav-dropdown-items">
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Banks</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Brokers</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Currencies</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> FAQ</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Videos</a>
                            </router-link>
                        </li>
                    </ul>
               </li>

               <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-bind:class="{ 'c-show': minimizeUserManagement }">
                    <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" @click="minimize('users')">
                         <svg class="c-sidebar-nav-icon">
                              <use xlink:href="@coreui/icons/sprites/free.svg#cil-user"></use>
                         </svg>
                         User Management
                    </a>
                    <ul class="c-sidebar-nav-dropdown-items">
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Permissions</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'offers' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Roles</a>
                            </router-link>
                        </li>
                        <li class="c-sidebar-nav-item">
                            <router-link :to="{ name: 'users' }">
                                <a class="c-sidebar-nav-link"><span class="c-sidebar-nav-icon"></span> Users</a>
                            </router-link>
                        </li>
                    </ul>
               </li>
               <li class="c-sidebar-nav-item">
                    <router-link :to="{ name: 'reports' }">
                        <a class="c-sidebar-nav-link">
                            <svg class="c-sidebar-nav-icon">
                                <use xlink:href="@coreui/icons/sprites/free.svg#cil-bar-chart"></use>
                            </svg>
                            Reports
                        </a>
                    </router-link>
               </li>
          </ul>
          <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
     </div>
</template>

<script>
     export default {
          data() {
               return {
                    minimizeSetting: false,
                    minimizeUserManagement: false,
               };
          },
          methods: {
                show() {
                    return this.$store.state.sidebarShow
                },
                minimize(option) {
                    console.log(option)
                    if(option=='settings') {
                        this.minimizeSetting = !this.minimizeSetting
                        this.minimizeUserManagement = false
                    }
                    if(option=='users') {
                        this.minimizeSetting = false
                        this.minimizeUserManagement = !this.minimizeUserManagement
                    }
                },
          },
     };
</script>

<style scoped>
    #logo {
        width: 220px;
    }
</style>
