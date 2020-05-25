<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'App',
    beforeMount() {
      this.hydrate().then(respone => {
        this.$store.siteLoading = false
        if(respone) {
          this.fetchUser().then(() => {
            this.$router.replace({ name: 'dashboard' })
          })
        }
      })
    },
    methods: {
      ...mapActions({
        hydrate: 'auth/hydrate',
        fetchUser: 'auth/fetchUser'
      })
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.invalid-feedback {
  display: block !important;
}

.c-sidebar .c-sidebar-nav-dropdown-toggle:hover, .c-sidebar .c-sidebar-nav-link:hover, .bg-success, .dropdown-item:active {
  background-color: #00969e !important;
}

.btn-success {
    color: #fff;
    background-color: #00969e !important;
    border-color: #00969e !important;
}

.btn-outline-success {
    color: #00969e;
    border-color: #00969e;
}

.btn-outline-success:hover, .btn-outline-success:not(:disabled):not(.disabled):active{
    color: #fff;
    background-color: #00969e;
    border-color: #00969e;
}

/* a, a:hover {
    color:  #00969e !important;
} */
</style>
