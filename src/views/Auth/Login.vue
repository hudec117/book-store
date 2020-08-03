<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <b-form-group v-bind:disabled="loggingIn"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
                              type="email"
                              required
                              placeholder="Enter email">
                </b-form-input>
            </b-form-group>

            <b-form-group v-bind:disabled="loggingIn"
                          label="Password:"
                          label-for="password-input">
                <b-form-input id="password-input"
                              v-model="password"
                              type="password"
                              required
                              placeholder="Enter password">
                </b-form-input>
            </b-form-group>

            <b-button v-bind:disabled="loggingIn"
                      variant="primary"
                      type="submit">
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
                loggingIn: false,
                errorReasonLookup: {
                    'email_invalid': 'Invalid email',
                    'password_invalid': 'Invalid password',
                    'unauthorised': 'Invalid password or user not found.'
                }
            };
        },
        methods: {
            onSubmit: function() {
                const loginBody = {
                    email: this.email,
                    password: this.password
                };

                this.loggingIn = true;

                this.$store.dispatch('hideAlert');

                // Perform login requests.
                fetch('/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginBody)
                }).then(async response => {
                    const body = await response.json();

                    // Check if successful
                    if (body.success) {
                        window.localStorage.setItem('token', body.token);

                        this.$root.$bvToast.toast('You have successfully logged in.', {
                            title: 'Login',
                            autoHideDelay: 2500,
                            solid: true
                        });

                        // Hide alert, setup the user in store and redirect to catalogue.
                        this.$store.dispatch('hideAlert');
                        this.$store.dispatch('decodeTokenAndSetUser', body.token);
                        this.$router.push({ name: 'catalogue' });
                    } else {
                        this.$store.dispatch('showWarningAlert', this.errorReasonLookup[body.reason]);
                    }
                }).catch(error => {
                    console.error(error);
                    this.$store.dispatch('showErrorAlert', `Failed to login, reason: ${error.message}`);
                }).finally(() => {
                    this.loggingIn = false;
                });
            }
        }
    };
</script>