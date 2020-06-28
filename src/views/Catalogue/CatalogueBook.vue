<template>
    <div>
        <b-row class="mb-3">
            <b-col>
                <router-link to="/catalogue">Back to Catalogue</router-link>
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
                            </b-card-title>
                            <b-card-text>
                                <b-form-group label-cols="2"
                                              label="Price:"
                                              label-for="price-output">
                                    <b-form-input id="price-output"
                                                  v-bind:value="`£${book.price}`"
                                                  plaintext>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-cols="2"
                                              label="Author(s):"
                                              label-for="authors-output">
                                    <b-form-input id="authors-output"
                                                  v-bind:value="book.authors.join(', ')"
                                                  plaintext>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-cols="2"
                                              label="Categories:"
                                              label-for="categories-output">
                                    <b-form-input id="categories-output"
                                                  v-bind:value="book.categories.join(', ')"
                                                  plaintext>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-cols="2"
                                              label="Published:"
                                              label-for="published-output">
                                    <b-form-input id="published-output"
                                                  v-model="book.year"
                                                  plaintext>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-cols="2"
                                              label="Stock:"
                                              label-for="stock-input">
                                    <b-form-input id="stock-input"
                                                  v-if="isStaff"
                                                  v-model="book.newStock"
                                                  type="number"
                                                  number
                                                  min="0">
                                    </b-form-input>
                                    <b-form-input id="stock-input"
                                                  v-else
                                                  v-bind:value="book.stock"
                                                  plaintext>
                                    </b-form-input>
                                </b-form-group>
                            </b-card-text>
                            <b-card-text>
                                <b-button variant="primary"
                                          v-on:click="onAddToBasketClick"
                                          v-if="canAddToBasket">
                                    Add to Basket
                                </b-button>
                                <b-button variant="success"
                                          class="float-right"
                                          v-on:click="onSaveClick"
                                          v-if="isStaff"
                                          v-bind:disabled="!canSave">
                                    <b-spinner v-if="saving" small></b-spinner>
                                    {{ saving ? 'Saving...' : 'Save' }}
                                </b-button>
                            </b-card-text>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import BooksRepository from '../../services/books-repository.js';

    export default {
        data: function() {
            return {
                loading: true,
                saving: false,
                book: {
                    title: '',
                    authors: [],
                    price: 0,
                    categories: [],
                    year: 0,
                    newStock: 0,
                    stock: 0
                }
            };
        },
        computed: {
            isStaff() {
                return this.$store.state.user.staff;
            },
            canAddToBasket() {
                return this.$store.state.user.authenticated && this.book.stock > 0;
            },
            canSave() {
                return Number.isInteger(this.book.newStock)
                    && this.book.newStock !== this.book.stock
                    && this.book.newStock >= 0;
            }
        },
        mounted: function() {
            this.loadBook();
        },
        methods: {
            loadBook: async function() {
                const repository = new BooksRepository();

                try {
                    const book = await repository.get(this.$route.params.id);
                    this.book = {
                        ...book,
                        newStock: book.stock
                    };
                } catch (error) {
                    // TODO: handle
                } finally {
                    this.loading = false;
                }
            },
            onAddToBasketClick: async function() {
                const added = await this.$store.dispatch('basket/addEntry', {
                    id: this.book.id,
                    title: this.book.title,
                    price: this.book.price,
                    stock: this.book.stock
                });

                let message;
                if (added) {
                    message = `${this.book.title} added to basket.`;
                } else {
                    message = 'Cannot add more than stock allows!';
                }

                this.$bvToast.toast(message, {
                    title: 'Basket',
                    autoHideDelay: 3000,
                    solid: true
                });
            },
            onSaveClick: async function() {
                const newStock = this.book.newStock;

                this.saving = true;

                try {
                    const repository = new BooksRepository();
                    await repository.updateStock(this.$route.params.id, newStock);

                    this.book.stock = newStock;
                } catch (error) {
                    // TODO: handle
                } finally {
                    this.saving = false;
                }
            }
        }
    };
</script>
<style scoped>
    .cover-image {
        width: 100%;
    }
</style>