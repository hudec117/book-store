<template>
    <div>
        <b-row>
            <b-col>
                <div v-if="loading" class="text-center">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <b-table-simple v-else bordered>
                    <b-thead>
                        <b-tr>
                            <b-th>Order Id</b-th>
                            <b-th>Created</b-th>
                            <b-th>Customer</b-th>
                            <b-th>Total Price</b-th>
                            <b-th>Book(s)</b-th>
                            <b-th>Quantity</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody v-for="order of orders" v-bind:key="order.id">
                        <b-tr v-for="(entry, index) of order.entries" v-bind:key="index">
                            <b-td v-if="index === 0" v-bind:rowspan="order.entries.length">
                                {{ order.id }}
                            </b-td>
                            <b-td v-if="index === 0" v-bind:rowspan="order.entries.length">
                                {{ dateFormatter(order.createdAt) }}
                            </b-td>
                            <b-td v-if="index === 0" v-bind:rowspan="order.entries.length">
                                {{ order.user }}
                            </b-td>
                            <b-td v-if="index === 0" v-bind:rowspan="order.entries.length">
                                {{ currencyFormatter(order.totalPrice) }}
                            </b-td>
                            <b-td>
                                {{ entry.bookTitle }}
                            </b-td>
                            <b-td>
                                {{ entry.quantity }}
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
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
                orders: []
            };
        },
        mounted: function() {
            this.loadOrders();
        },
        methods: {
            loadOrders: async function() {
                const repository = new OrdersRepository();

                this.loading = true;

                try {
                    this.orders = await repository.getAll();
                } catch (error) {
                    console.error(error);
                    this.$store.dispatch('showErrorAlert', `Failed to load orders, reason: ${error.message}`);
                } finally {
                    this.loading = false;
                }
            },
            currencyFormatter: function(value) {
                return `£${value}`;
            },
            dateFormatter: function(value) {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }
        }
    };
</script>