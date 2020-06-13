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
        basketSet(state, basket) {
            state.basket = basket;
        },
        basketAdd(state, book) {
            state.basket.push({
                book: book,
                quantity: 1,
                price: book.price
            });
        },
        basketRemove(state, bookId) {
            state.basket = state.basket.filter(entry => entry.book.id !== bookId);
        },
        basketSetQuantity(state, payload) {
            const entry = state.basket.find(entry => entry.book.id === payload.bookId);
            entry.quantity = payload.newQuantity;
            entry.price = payload.newQuantity * entry.book.price;
        }
    },
    actions: {
        loadToken(context) {
            const token = window.localStorage.getItem('token');
            context.commit('setAuthenticated', token != null);
        },
        basketSave(context) {
            const basketJSON = JSON.stringify(context.state.basket);
            window.localStorage.setItem('basket', basketJSON);
        },
        basketLoad(context) {
            const loadedBasketJSON = window.localStorage.getItem('basket');
            if (loadedBasketJSON != null) {
                const loadedBasket = JSON.parse(loadedBasketJSON);
                context.commit('basketSet', loadedBasket);
            }
        },
        basketClear(context) {
            context.commit('basketSet', []);

            context.dispatch('basketSave');
        },
        basketAdd(context, book) {
            const existingEntry = context.state.basket.find(entry => entry.book.id === book.id);
            if (existingEntry != null) {
                if (existingEntry.quantity < book.stock) {
                    context.commit('basketSetQuantity', {
                        bookId: book.id,
                        newQuantity: existingEntry.quantity + 1
                    });
                } else {
                    return false;
                }
            } else {
                context.commit('basketAdd', book);
            }

            context.dispatch('basketSave');

            return true;
        },
        basketRemove(context, bookId) {
            context.commit('basketRemove', bookId);

            context.dispatch('basketSave');
        },
        basketSetQuantity(context, payload) {
            if (payload.newQuantity > 0) {
                context.commit('basketSetQuantity', payload);
            } else {
                context.commit('basketRemove', payload.bookId);
            }

            context.dispatch('basketSave');
        }
    }
});
