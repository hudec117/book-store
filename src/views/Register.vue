<template>
    <div class="register">
        <b-form @submit.prevent="onSubmit">
            <b-form-group id="name-input-group"
                          label="Name:"
                          label-for="name-input">
                <b-form-input id="name-input"
                              v-model="name"
                              required
                              placeholder="Enter your name">
                </b-form-input>
            </b-form-group>

            <b-form-group id="email-input-group"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
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
                              type="password"
                              required
                              :state="passwordsMatch"
                              placeholder="Enter password again">
                </b-form-input>
                <b-form-invalid-feedback :state="passwordsMatch">
                    Passwords must match.
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary">Register</b-button>
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
                passwordRetype: ''
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

                fetch('/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerBody)
                }).then(response => {
                    console.log(response);
                }).catch(console.error);
            }
        }
    };
</script>