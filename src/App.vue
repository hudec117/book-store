<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-3">
            <b-container>
                <b-navbar-brand to="/">Book Store</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/">Home</b-nav-item>
                        <b-nav-item to="/books">Books</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item to="/login">Login</b-nav-item>
                        <b-nav-item to="/register">Register</b-nav-item>
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
