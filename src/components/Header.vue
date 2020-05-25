<template>
      <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
            <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
                  <svg class="c-icon c-icon-lg">
                        <use xlink:href="@coreui/icons/sprites/free.svg#cil-menu"></use>
                  </svg>
            </button>
            <a class="c-header-brand d-lg-none" href="#">
                  <svg width="118" height="46" alt="CoreUI Logo">
                        <use xlink:href="assets/brand/coreui.svg#full"></use>
                  </svg>
            </a>
            <button @click="minimize" class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" responsive="true">
                  <svg class="c-icon c-icon-lg">
                        <use xlink:href="@coreui/icons/sprites/free.svg#cil-menu"></use>
                  </svg>
            </button>
            <ul class="c-header-nav d-md-down-none">
                  <li class="c-header-nav-item px-3">
                        <router-link :to="{ name: 'dashboard' }">
                              <a class="c-header-nav-link">Dashboard</a>
                        </router-link>
                  </li>
                  <li class="c-header-nav-item px-3">
                        <router-link :to="{ name: 'offers' }">
                              <a class="c-header-nav-link">Offers</a>
                        </router-link>
                  </li>
                  <li class="c-header-nav-item px-3">
                        <router-link :to="{ name: 'users' }">
                              <a class="c-header-nav-link">Users</a>
                        </router-link>
                  </li>
            </ul>
            <ul class="c-header-nav ml-auto mr-4">
                  <li class="c-header-nav-item dropdown">
                        <a class="c-header-nav-link" @click="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                              <div class="c-avatar">
                                    <img class="c-avatar-img" src="../assets/avatar.png" alt="user@email.com" />
                                    <!-- <span>Romario Hall</span> -->
                              </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right pt-0" v-bind:class="{show:headerDropDown}">
                              <a class="dropdown-item" href="#">
                                    <svg class="c-icon mr-2">
                                          <use xlink:href="@coreui/icons/sprites/free.svg#cil-user"></use>
                                    </svg>
                                    Profile
                              </a>
                              <a class="dropdown-item" @click.prevent="signout">
                                    <svg class="c-icon mr-2">
                                          <use xlink:href="@coreui/icons/sprites/free.svg#cil-account-logout"></use>
                                    </svg>
                                    Logout
                              </a>
                        </div>
                  </li>
            </ul>
            <div class="c-subheader px-3">
                  <!-- Breadcrumb-->
                  <ol class="breadcrumb border-0 m-0">
                        <li class="breadcrumb-item">Home</li>
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                        <!-- Breadcrumb Menu-->
                  </ol>
            </div>
      </header>
</template>

<script>
      import { mapActions } from "vuex";

      export default {
            data() {
                  return {
                        headerDropDown: false,
                  };
            },
            methods: {
                  ...mapActions({
                        logout: "auth/logout",
                  }),
                  dropdown() {
                        this.headerDropDown = !this.headerDropDown;
                  },
                  minimize() {
                        this.$store.state.sidebarShow = !this.$store.state.sidebarShow;
                  },
                  signout() {
                        this.logout()
                              .then(() => {
                                    this.$router.replace({ name: "login" });
                              })
                              .catch(() => {
                                    this.$router.replace({ name: "login" });
                              });
                  },
            },
      };
</script>
