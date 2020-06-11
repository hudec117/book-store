<template>
    <div class="register">
        <b-form @submit.prevent="onSubmit">
            <b-form-group id="name-input-group"
                          label="Name:"
                          label-for="name-input">
                <b-form-input id="name-input"
                              v-model="name"
                              v-bind:disabled="registering"
                              required
                              placeholder="Enter your name">
                </b-form-input>
            </b-form-group>

            <b-form-group id="email-input-group"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
                              v-bind:disabled="registering"
                              type="email"
                              required
                              placeholder="Enter your email">
                </b-form-input>
            </b-form-group>

            <b-form-group id="password-input-group"
                          label="Password:"
                          label-for="password-input">
                <b-form-input id="password-input"
                              v-model="password"
                              v-bind:disabled="registering"
                              type="password"
                              required
                              placeholder="Enter password">
                </b-form-input>
            </b-form-group>

            <b-form-group id="password-input-group-2"
                          label="Retype password:"
                          label-for="password-input-2">
                <b-form-input id="password-input-2"
                              v-model="passwordRetype"
                              v-bind:disabled="registering"
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
                registering: false
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

                fetch('/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerBody)
                }).then(async response => {
                    const body = await response.json();
                    if (body.success) {
                        this.$router.push('books');
                    } else {
                        // TODO: handle
                    }
                // eslint-disable-next-line no-unused-vars
                }).catch(err => {
                    // TODO: handle
                }).finally(() => {
                    this.registering = false;
                });
            }
        }
    };
</script>