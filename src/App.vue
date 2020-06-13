<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-3">
            <b-container>
                <b-navbar-brand to="/">Aston Book Store</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/">Home</b-nav-item>
                        <b-nav-item to="/books">Books</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-if="!isAuthenticated">
                        <b-nav-item to="/login">Login</b-nav-item>
                        <b-nav-item to="/register">Register</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-else>
                        <b-nav-item to="/basket">Basket ({{ basketSize }})</b-nav-item>
                        <b-nav-item v-on:click="onLogoutClick">Logout</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
        <b-container>
            <main role="main">
                <router-view />
            </main>
        </b-container>
    </div>
</template>
<script>
    export default {
        computed: {
            isAuthenticated() {
                return this.$store.state.authenticated;
            },
            basketSize() {
                return this.$store.state.basket.length;
            }
        },
        created() {
            this.$store.dispatch('loadToken');
            this.$store.dispatch('basketLoad');
        },
        methods: {
            onLogoutClick: function() {
                this.$store.commit('setAuthenticated', false);
                this.$store.dispatch('basketClear');
                window.localStorage.removeItem('token');

                // We don't have to check for anonymous-only because
                // logged-in users will never be on those pages.
                if (this.$router.currentRoute.meta.access !== 'anonymous') {
                    this.$router.push({ name: 'home' });
                }

                console.log();
            }
        }
    };
</script>