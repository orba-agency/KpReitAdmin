<template>
    <div class="c-app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group">
                        <div class="card p-4">
                            <div class="card-body">
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <div v-if="message" class="alert alert-danger" role="alert">
                                    {{ message }}
                                </div>
                                <form @submit.prevent="submit" role="form">
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
                                    <div class="input-group mb-4">
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
                                            placeholder="Password"
                                            required
                                            minlength="8"
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
                                        :to="{ name: 'forgot' }"
                                        class="btn btn-lg btn-outline-light mt-3"
                                        type="button"
                                        >Forgot Password</router-link
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
            email: 'romario@orba.io',
            password: 'password',
            message: null,
            errors: [],
            submitButton: {
                name: 'Login',
                processing: false,
            },
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            fetchUser: 'auth/fetchUser',
        }),
        submit() {
            this.submitButton.processing = true
            this.submitButton.name = 'Processing...'
            this.login({
                payload: {
                    email: this.email,
                    password: this.password,
                },
                context: this,
            }).then(() => {
                this.submitButton.processing = false
                this.submitButton.name = 'Login'
                if (this.errors.root) {
                    return
                } else {
                    this.fetchUser().then(() => {
                        this.$router.replace({ name: 'dashboard' })
                    })
                }
            })
        },
    },
}
</script>
