<template>
    <div class="book">
        <b-row class="mb-3">
            <b-col>
                <router-link to="/books">Back to Books</router-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div v-if="loading" class="text-center">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <b-card img-src="https://placekitten.com/300/300"
                        img-alt="Card image"
                        img-left class="mb-3"
                        v-else>
                    <b-card-title>
                        {{ book.title }}
                        <small class="text-muted">by {{ book.author }}</small>
                    </b-card-title>
                    <b-card-text>
                        <p>Cost: £{{ book.price }}</p>
                        <p>Categories: {{ book.categories.join(', ') }}</p>
                        <p>Published: {{ book.year }}</p>
                        <p>
                            Stock:
                            <span v-if="book.stock > 0">{{ book.stock }}</span>
                            <span v-else class="text-danger">sold out</span>
                        </p>
                    </b-card-text>
                    <!-- <b-card-text>
                        <b-button variant="primary">Add to Basket</b-button>
                    </b-card-text> -->
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import BookRepository from '../services/books-repository.js';

    export default {
        data: function() {
            return {
                loading: true,
                book: {
                    title: '',
                    author: '',
                    price: 0,
                    categories: [],
                    year: 0,
                    stock: 0
                }
            };
        },
        mounted: function() {
            this.loadBook();
        },
        methods: {
            loadBook: function() {
                const repository = new BookRepository();

                repository.get(this.$route.params.id).then(book => {
                    this.book = book;
                    this.loading = false;
                });
            }
        }
    };
</script>