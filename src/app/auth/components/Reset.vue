<template>
    <div class="c-app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group">
                        <div class="card p-4">
                            <div class="card-body">
                                <h1>Reset Password</h1>
                                <p class="text-muted">Please fill out the form below</p>

                                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>
                                <div v-if="message" class="alert alert-success" role="alert">{{ message }}</div>
                                <div v-if="verfiying">Verfiying token...</div>
                                <div v-if="!verfiying && !token" class="alert alert-warning">Invalid token</div>

                                <form @submit.prevent="submit" role="form" v-if="!verfiying && token">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <svg class="c-icon">
                                                    <use
                                                        xlink:href="@coreui/icons/sprites/free.svg#cil-envelope-closed"
                                                    ></use>
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            class="form-control"
                                            type="email"
                                            placeholder="Email"
                                            required
                                            v-model="email"
                                        />
                                        <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <svg class="c-icon">
                                                    <use
                                                        xlink:href="@coreui/icons/sprites/free.svg#cil-lock-locked"
                                                    ></use>
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            class="form-control"
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            v-model="password"
                                        />
                                        <div v-if="errors.password" class="invalid-feedback">
                                            {{ errors.password[0] }}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 text-left">
                                            <button
                                                :disabled="submitButton.processing"
                                                class="btn btn-success px-4"
                                                type="submit"
                                            >
                                                {{ submitButton.name }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card text-white bg-success py-5 d-md-down-none" style="width: 44%;">
                            <div class="card-body text-center">
                                <div>
                                    <h2>Kingston Properties Admin Panel</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <router-link
                                        :to="{ name: 'login' }"
                                        class="btn btn-lg btn-outline-light mt-3"
                                        type="button"
                                        >Back to login</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            email: null,
            password: null,
            token: null,
            message: null,
            errorMessage: null,
            errors: [],
            verfiying: true,
            submitButton: {
                name: 'Submit',
                processing: false,
            },
        }
    },
    beforeCreate() {
        // react to route changes...
        // don't forget to call next()
        this.$store.dispatch('auth/checkToken', this.$route.params.token).then((response) => {
            if (response) {
                this.email = response.email
                this.token = response.token
                this.verfiying = false
            } else {
                // this.$router.replace({ name: 'login' })
                this.verfiying = false
            }
        })
    },
    methods: {
        ...mapActions({
            reset: 'auth/reset',
            checkToken: 'auth/checkToken',
        }),
        submit() {
            this.submitButton.processing = true
            this.submitButton.name = 'Processing...'
            this.reset({
                payload: {
                    email: this.email,
                    token: this.token,
                    password: this.password,
                },
                context: this,
            }).then((response) => {
                this.submitButton.processing = false
                this.submitButton.name = 'Submit'
                if (this.errors.root) {
                    return
                } else {
                    setTimeout(() => {
                        this.$router.replace({ name: 'login' })
                    }, 3000)
                }
            })
        },
    },
}
</script>
