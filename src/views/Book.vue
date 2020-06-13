<template>
    <div class="book">
        <b-row class="mb-3">
            <b-col>
                <router-link to="/books">Back to Books</router-link>
            </b-col>
        </b-row>
        <div v-if="loading" class="text-center">
            <b-spinner variant="primary"></b-spinner>
        </div>
        <b-row v-else>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col cols="4">
                            <b-carousel controls indicators>
                                <b-carousel-slide v-for="cover of book.covers" v-bind:key="cover">
                                    <template v-slot:img>
                                        <img class="cover-image"
                                             v-bind:src="cover">
                                    </template>
                                </b-carousel-slide>
                            </b-carousel>
                        </b-col>
                        <b-col>
                            <b-card-title>
                                {{ book.title }}
                                <small class="text-muted">by {{ book.authors.join(', ') }}</small>
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
                            <b-card-text v-if="canAddToBasket">
                                <b-button variant="primary" v-on:click="onAddToBasketClick">Add to Basket</b-button>
                            </b-card-text>
                        </b-col>
                    </b-row>
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
                    authors: [],
                    price: 0,
                    categories: [],
                    year: 0,
                    stock: 0
                }
            };
        },
        computed: {
            canAddToBasket() {
                return this.$store.state.authenticated && this.book.stock > 0;
            }
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
            },
            onAddToBasketClick: function() {
                this.$store.commit('addToBasket', {
                    id: this.book.id,
                    title: this.book.title
                });

                this.$bvToast.toast(`${this.book.title} added to basket.`, {
                    title: 'Basket',
                    autoHideDelay: 2500,
                    solid: true
                });
            }
        }
    };
</script>
<style scoped>
    .cover-image {
        width: 100%;
    }
</style>