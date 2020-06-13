import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        authenticated: false,
        basket: []
    },
    mutations: {
        setAuthenticated(state, authenticated) {
            state.authenticated = authenticated;
        },
        basketAdd(state, book) {
            state.basket.push({
                book: book,
                quantity: 1
            });
        },
        basketRemove(state, bookId) {
            state.basket = state.basket.filter(entry => entry.book.id !== bookId);
        },
        basketSetQuantity(state, payload) {
            const entry = state.basket.find(entry => entry.book.id === payload.bookId);
            entry.quantity = payload.newQuantity;
        }
    },
    actions: {
        basketAdd(context, book) {
            const existingEntry = context.state.basket.find(entry => entry.book.id === book.id);
            if (existingEntry != null) {
                context.commit('basketSetQuantity', {
                    bookId: book.id,
                    newQuantity: existingEntry.quantity + 1
                });
            } else {
                context.commit('basketAdd', book);
            }
        },
        basketRemove(context, bookId) {
            context.commit('basketRemove', bookId);
        },
        basketSetQuantity(context, payload) {
            if (payload.newQuantity > 0) {
                context.commit('basketSetQuantity', payload);
            } else {
                context.commit('basketRemove', payload.bookId);
            }
        }
    }
});
