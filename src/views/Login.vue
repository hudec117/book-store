<template>
    <div class="login">
        <b-form @submit.prevent="onSubmit">
            <b-form-group id="email-input-group"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
                              v-bind:disabled="loggingIn"
                              type="email"
                              required
                              placeholder="Enter email">
                </b-form-input>
            </b-form-group>

            <b-form-group id="password-input-group"
                          label="Password:"
                          label-for="password-input">
                <b-form-input id="password-input"
                              v-model="password"
                              v-bind:disabled="loggingIn"
                              type="password"
                              required
                              placeholder="Enter password">
                </b-form-input>
            </b-form-group>

            <b-button v-bind:disabled="loggingIn"
                      type="submit"
                      variant="primary">
                <b-spinner v-if="loggingIn" small></b-spinner>
                {{ loggingIn ? 'Logging in...' : 'Login' }}
            </b-button>
        </b-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                loggingIn: false
            };
        },
        methods: {
            onSubmit: function() {
                const loginBody = {
                    email: this.email,
                    password: this.password
                };

                this.loggingIn = true;

                fetch('/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginBody)
                }).then(async response => {
                    const body = await response.json();
                    if (body.success) {
                        window.sessionStorage.setItem('token', body.token);

                        this.$router.push('books');
                        this.$store.commit('setAuthenticated', true);
                    } else {
                        // TODO: handle
                    }
                // eslint-disable-next-line no-unused-vars
                }).catch(err => {
                    // TODO: handle
                }).finally(() => {
                    this.loggingIn = false;
                })
            }
        }
    };
</script>