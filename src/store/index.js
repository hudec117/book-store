import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false
    },
    mutations: {
        setAuthenticated(state, authenticated) {
            state.authenticated = authenticated;
        }
    },
    strict: true
});
