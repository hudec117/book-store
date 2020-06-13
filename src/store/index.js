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
        addToBasket(state, book) {
            const existingBook = state.basket.find(entry => entry.book.id === book.id);
            if (existingBook != null) {
                existingBook.quantity++;
            } else {
                state.basket.push({
                    book: book,
                    quantity: 1
                });
            }
        },
        removeFromBasket(state, book) {
            state.basket = state.basket.filter(entry => entry.book.id !== book.id);
        }
    }
});
