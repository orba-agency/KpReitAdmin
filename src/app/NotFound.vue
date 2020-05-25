<template>
    <div class="c-app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-muted">The page you are looking for was not found.</p>
          </div>
          <div class="input-prepend input-group">
            
            <router-link 
                :to="{ name: 'login' }" 
                v-if="!$store.getters['auth/isLoggedIn']"
                class="btn btn-block btn-outline-success">
                    Login Now
            </router-link>

            <div class="col-6 col-sm-4 col-md-2 col-xl" v-if="$store.getters['auth/isLoggedIn']">
                <router-link 
                    :to="{ name: 'dashboard' }"
                    class="btn btn-block btn-outline-success">
                        Back to Dashboard
                </router-link>
            </div>
            <div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0" v-if="$store.getters['auth/isLoggedIn']">
                <button 
                    @click="signout"
                    class="btn btn-block btn-outline-danger">
                        Logout
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        methods: {
            ...mapActions({
                logout: "auth/logout",
            }),
            signout() {
                this.logout()
                    .then(() => {
                        this.$router.replace({ name: "login" });
                    })
                    .catch(() => {});
            },
        }
    }

</script>
