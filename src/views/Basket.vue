<template>
    <div>
        <b-row>
            <b-col>
                <b-alert show variant="info">
                    To remove a book from your basket, reduce it's quantity to 0.
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
                                           v-bind:max="row.item.book.stock"
                                           v-bind:value="row.item.quantity"
                                           v-bind:formatter-fn="quantity => quantityFormatter(row.item, quantity)"
                                           v-on:change="newQuantity => onQuantityUpdate(row.item, newQuantity)">
                        </b-form-spinbutton>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
            }
        },
        methods: {
            onQuantityUpdate: function(entry, newQuantity) {
                this.$store.dispatch('basket/setEntryQuantity', {
                    bookId: entry.book.id,
                    newQuantity: newQuantity
                });

                if (newQuantity === 0) {
                    this.$bvToast.toast(`${entry.book.title} removed from basket.`, {
                        title: 'Basket',
                        autoHideDelay: 2500,
                        solid: true
                    });
                }
            },
            quantityFormatter: function(entry, quantity) {
                return `${quantity}/${entry.book.stock}`;
            }
        }
    };
</script>