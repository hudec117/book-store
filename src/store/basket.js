export default {
    namespaced: true,
    state: () => ({
        entries: [],
        totalPrice: 0
    }),
    mutations: {
        setEntries(state, newEntries) {
            state.entries = newEntries;
        },
        addEntry(state, book) {
            state.entries.push({
                book: book,
                quantity: 1,
                price: book.price
            });
        },
        removeEntry(state, bookId) {
            state.entries = state.entries.filter(entry => entry.book.id !== bookId);
        },
        setEntryQuantity(state, payload) {
            const entry = state.entries.find(entry => entry.book.id === payload.bookId);
            entry.quantity = payload.newQuantity;
        },
        setEntryPrice(state, payload) {
            const entry = state.entries.find(entry => entry.book.id === payload.bookId);
            entry.price = payload.newPrice;
        },
        setTotalPrice(state, newTotalPrice) {
            state.totalPrice = newTotalPrice;
        }
    },
    actions: {
        saveToStorage(context) {
            const entriesJSON = JSON.stringify(context.state.entries);
            window.localStorage.setItem('basket', entriesJSON);
        },
        loadFromStorage(context) {
            const loadedEntriesJSON = window.localStorage.getItem('basket');
            if (loadedEntriesJSON != null) {
                const loadedEntries = JSON.parse(loadedEntriesJSON);
                context.commit('setEntries', loadedEntries);

                // Re-calculate total price based on the newly added entries.
                context.dispatch('calculateTotalPrice');
            }
        },
        clear(context) {
            context.commit('setEntries', []);
            context.dispatch('saveToStorage');
        },
        addEntry(context, book) {
            const existingEntry = context.state.entries.find(entry => entry.book.id === book.id);

            // Update the existing entry or add a new one.
            if (existingEntry != null) {

                // Only update entry quantity if it's less than the stock.
                if (existingEntry.quantity < book.stock) {
                    context.dispatch('setEntryQuantity', {
                        bookId: book.id,
                        newQuantity: existingEntry.quantity + 1
                    });
                } else {
                    return false;
                }
            } else {
                context.commit('addEntry', book);
                context.dispatch('calculateTotalPrice');
            }

            context.dispatch('saveToStorage');

            return true;
        },
        removeEntry(context, bookId) {
            context.commit('removeEntry', bookId);
            context.dispatch('calculateTotalPrice');

            context.dispatch('saveToStorage');
        },
        setEntryQuantity(context, payload) {
            // If the new quantity is zero or less, remove the entry.
            if (payload.newQuantity > 0) {
                // Commit the new quantity.
                context.commit('setEntryQuantity', payload);

                // Re-calculate the entry price.
                context.dispatch('calculateEntryPrice', payload.bookId);
            } else {
                context.commit('removeEntry', payload.bookId);
            }

            // Re-calculate the total basket price.
            context.dispatch('calculateTotalPrice');

            context.dispatch('saveToStorage');
        },
        calculateEntryPrice(context, bookId) {
            const entry = context.state.entries.find(entry => entry.book.id === bookId);
            context.commit('setEntryPrice', {
                bookId: bookId,
                newPrice: entry.book.price * entry.quantity
            });
        },
        calculateTotalPrice(context) {
            const totalPrice = context.state.entries.reduce((total, entry) => {
                return total += entry.price;
            }, 0);
            context.commit('setTotalPrice', totalPrice);
        }
    }
};