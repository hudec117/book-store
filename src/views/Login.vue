<template>
    <div class="login">
        <b-form @submit.stop.prevent>
            <b-form-group id="email-input-group"
                          label="Email:"
                          label-for="email-input">
                <b-form-input id="email-input"
                              v-model="email"
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
                              type="password"
                              required
                              placeholder="Enter password">
                </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        }
    };
</script>