<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <b-form-group v-bind:disabled="registering"
                          label="Name:"
                          label-for="name-input">
                <b-form-input id="name-input"
                              v-model="name"
                              required
                              placeholder="Enter your name">
                </b-form-input>
            </b-form-group>

            <b-form-group v-bind:disabled="registering"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
                              type="email"
                              required
                              placeholder="Enter your email">
                </b-form-input>
            </b-form-group>

            <b-form-group v-bind:disabled="registering"
                          label="Password:"
                          label-for="password-input">
                <b-form-input id="password-input"
                              v-model="password"
                              type="password"
                              required
                              placeholder="Enter password">
                </b-form-input>
            </b-form-group>

            <b-form-group v-bind:disabled="registering"
                          label="Retype password:"
                          label-for="password-input-2">
                <b-form-input id="password-input-2"
                              v-model="passwordRetype"
                              v-bind:state="passwordsMatch"
                              type="password"
                              required
                              placeholder="Enter password again">
                </b-form-input>
                <b-form-invalid-feedback :state="passwordsMatch">
                    Passwords must match.
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button v-bind:disabled="registering"
                      type="submit"
                      variant="primary">
                <b-spinner v-if="registering" small></b-spinner>
                {{ registering ? 'Registering...' : 'Register' }}
            </b-button>
        </b-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                passwordRetype: '',
                registering: false,
                errorReasonLookup: {
                    'name_invalid': 'Invalid name',
                    'email_invalid': 'invalid email',
                    'password_invalid': 'Invalid password',
                    'user_exists': 'A user with this email already exists.'
                }
            };
        },
        computed: {
            passwordsMatch() {
                if (this.password === '' || this.passwordRetype === '') {
                    return null;
                }

                return this.password === this.passwordRetype;
            }
        },
        methods: {
            onSubmit: function() {
                const registerBody = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };

                this.registering = true;

                this.$store.dispatch('hideAlert');

                fetch('/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerBody)
                }).then(async response => {
                    const body = await response.json();
                    if (body.success) {
                        window.localStorage.setItem('token', body.token);

                        this.$root.$bvToast.toast('You have successfully registered.', {
                            title: 'Register',
                            autoHideDelay: 2500,
                            solid: true
                        });

                        this.$store.dispatch('hideAlert');
                        this.$store.dispatch('decodeTokenAndSetUser', body.token);
                        this.$router.push({ name: 'catalogue' });
                    } else {
                        this.$store.dispatch('showWarningAlert', this.errorReasonLookup[body.reason]);
                    }
                }).catch(error => {
                    console.error(error);
                    this.$store.dispatch('showErrorAlert', `Failed to register, reason: ${error.message}`);
                }).finally(() => {
                    this.registering = false;
                });
            }
        }
    };
</script>