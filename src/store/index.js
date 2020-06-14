import Vue from 'vue';
import Vuex from 'vuex';

import basketModule from './basket.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        basket: basketModule
    },
    state: {
        authenticated: false
    },
    mutations: {
        setAuthenticated(state, authenticated) {
            state.authenticated = authenticated;
        }
    },
    actions: {
        loadToken(context) {
            const token = window.localStorage.getItem('token');
            context.commit('setAuthenticated', token != null);
        }
    }
});
