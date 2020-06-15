import Vue from 'vue';
import Vuex from 'vuex';
import VueJwtDecode from 'vue-jwt-decode'

import basketModule from './basket.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        basket: basketModule
    },
    state: {
        user: {
            name: '',
            authenticated: false,
            staff: false
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        loadUserFromStorage(context) {
            const token = window.localStorage.getItem('token');
            if (token != null) {
                context.dispatch('decodeTokenAndSetUser', token);
            }
        },
        decodeTokenAndSetUser(context, token) {
            const body = VueJwtDecode.decode(token);
            context.commit('setUser', {
                name: body.name,
                authenticated: true,
                staff: body.staff
            });
        },
        resetUser(context) {
            context.commit('setUser', {
                name: '',
                authenticated: false,
                staff: false
            });
        }
    }
});
