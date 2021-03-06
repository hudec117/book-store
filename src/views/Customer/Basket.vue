<template>
    <div>
        <b-row>
            <b-col>
                <b-alert show variant="info">
                    <h5 class="alert-heading">Customers &amp; Staff</h5>
                    <ul class="mb-0">
                        <li>To remove a book from your basket, reduce it's quantity to 0.</li>
                    </ul>
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table v-bind:fields="fields" v-bind:items="basketEntries" primary-key="book.id">
                    <template v-slot:cell(price)="row">
                        £{{ row.item.price }}
                    </template>
                    <template v-slot:cell(quantity)="row">
                        <b-form-spinbutton min="0"
                                           v-bind:disabled="checkingOut"
                                           v-bind:max="row.item.book.stock"
                                           v-bind:value="row.item.quantity"
                                           v-bind:formatter-fn="quantity => quantityFormatter(row.item, quantity)"
                                           v-on:change="newQuantity => onQuantityUpdate(row.item, newQuantity)">
                        </b-form-spinbutton>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <span class="align-middle">Total price: £{{ basketPrice }}</span>
            </b-col>
            <b-col>
                <b-button variant="primary"
                          v-on:click="onCheckoutClick"
                          v-bind:disabled="!canCheckout"
                          class="float-right">
                    <b-spinner v-if="checkingOut" small></b-spinner>
                    {{ checkingOut ? 'Checking out...' : 'Checkout' }}
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import OrdersRepository from '../../services/orders-repository.js';

    export default {
        data() {
            return {
                checkingOut: false,
                fields: [
                    {
                        key: 'book.title',
                        label: 'Book'
                    },
                    {
                        key: 'quantity',
                        label: 'Quantity'
                    },
                    {
                        key: 'price',
                        label: 'Price'
                    }
                ]
            };
        },
        computed: {
            basketEntries() {
                return this.$store.state.basket.entries;
            },
            basketPrice() {
                return this.$store.state.basket.totalPrice;
            },
            canCheckout() {
                return !this.checkingOut && this.basketEntries.length > 0;
            }
        },
        methods: {
            onQuantityUpdate: function(entry, newQuantity) {
                this.$store.dispatch('basket/setEntryQuantity', {
                    bookId: entry.book.id,
                    newQuantity: newQuantity
                });

                // If the new quantity is zero, notify the book has been removed from the basket.
                if (newQuantity === 0) {
                    this.$bvToast.toast(`${entry.book.title} removed from basket.`, {
                        title: 'Basket',
                        autoHideDelay: 2500,
                        solid: true
                    });
                }
            },
            onCheckoutClick: async function() {
                const orderBody = this.$store.state.basket.entries.map(entry => {
                    return {
                        book: entry.book.id,
                        quantity: entry.quantity
                    };
                });

                this.checkingOut = true;

                this.$store.dispatch('hideAlert');

                try {
                    const repository = new OrdersRepository();
                    await repository.create(orderBody);

                    // Clear the basket
                    this.$store.dispatch('basket/clear');

                    // Show successful order toast
                    this.$root.$bvToast.toast('Order successfully placed!', {
                        title: 'Basket',
                        autoHideDelay: 2500,
                        solid: true
                    });

                    // Hide any visible alert and navigate back to catalogue.
                    this.$store.dispatch('hideAlert');
                    this.$router.push({ name: 'catalogue' });
                } catch (error) {
                    console.error(error);
                    this.$store.dispatch('showErrorAlert', `Failed to checkout, reason: ${error.message}`);
                } finally {
                    this.checkingOut = false;
                }
            },
            quantityFormatter: function(entry, quantity) {
                return `${quantity}/${entry.book.stock}`;
            }
        }
    };
</script>