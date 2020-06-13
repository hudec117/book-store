<template>
    <div class="basket">
        <b-table v-bind:fields="fields" v-bind:items="basket" primary-key="book.id">
            <template v-slot:cell(delete)>
                <b-button variant="danger">
                    Delete
                </b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fields: [
                    {
                        key: 'book.title',
                        label: 'Book Title'
                    },
                    {
                        key: 'quantity',
                        label: 'Quantity'
                    },
                    {
                        key: 'delete',
                        label: ''
                    }
                ]
            };
        },
        computed: {
            basket() {
                return this.$store.state.basket;
            }
        }
    };
</script>