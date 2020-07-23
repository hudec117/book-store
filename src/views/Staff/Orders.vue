<template>
    <div>
        <b-row>
            <b-col>
                <div v-if="loading" class="text-center">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <b-table v-else
                         v-bind:fields="fields"
                         v-bind:items="orders"
                         primary-key="id">
                </b-table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import OrdersRepository from '../../services/orders-repository.js';

    export default {
        data: function() {
            return {
                loading: false,
                orders: [],
                fields: [
                    {
                        key: 'book.title',
                        label: 'Book'
                    },
                    {
                        key: 'user',
                        label: 'Customer'
                    },
                    {
                        key: 'quantity',
                        label: 'Quantity'
                    },
                    {
                        key: 'totalPrice',
                        label: 'Price'
                    }
                ]
            };
        },
        mounted: function() {
            this.loadBooks();
        },
        methods: {
            loadBooks: function() {
                const repository = new OrdersRepository();

                this.loading = true;

                repository.getAll().then(orders => {
                    this.orders = orders;
                // eslint-disable-next-line no-unused-vars
                }).catch(error => {
                    // TODO: handle
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>