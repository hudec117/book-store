<template>
    <div>
        <b-row class="mb-3">
            <b-col>
                <router-link to="/catalogue">Back to Catalogue</router-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <b-form @submit.prevent="onSubmit">
                        <b-row>
                            <b-col>
                                <b-card-text>
                                    <b-form-group label-cols="2"
                                                  label="Title:"
                                                  label-for="title-input">
                                        <b-form-input id="title-input"
                                                      v-model="book.title"
                                                      required>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Price:"
                                                  label-for="price-input">
                                        <b-form-input id="price-input"
                                                      v-model="book.price"
                                                      type="number"
                                                      number
                                                      required>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Author(s):"
                                                  label-for="authors-input">
                                        <b-form-tags id="authors-input"
                                                     v-model="book.authors"
                                                     placeholder="Add authors..."
                                                     remove-on-delete
                                                     required>
                                        </b-form-tags>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Categories:"
                                                  label-for="categories-input">
                                        <b-form-tags id="categories-input"
                                                      v-model="book.categories"
                                                      placeholder="Add categories..."
                                                      remove-on-delete
                                                      required>
                                        </b-form-tags>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Published:"
                                                  label-for="published-input">
                                        <b-form-input id="published-input"
                                                      v-model="book.year"
                                                      type="number"
                                                      min="0"
                                                      number
                                                      required>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Stock:"
                                                  label-for="stock-input">
                                        <b-form-input id="stock-input"
                                                      v-model="book.stock"
                                                      type="number"
                                                      min="0"
                                                      number
                                                      required>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Cover image(s):"
                                                  label-for="covers-input">
                                        <b-form-file id="covers-input"
                                                     v-model="book.covers"
                                                     multiple
                                                     no-drop
                                                     required
                                                     accept=".jpg, .png"
                                                     placeholder="Choose cover image(s)...">
                                        </b-form-file>
                                    </b-form-group>
                                </b-card-text>
                                <b-card-text>
                                    <b-button variant="primary"
                                              type="submit"
                                              class="float-right">
                                        <b-spinner v-if="saving" small></b-spinner>
                                        {{ saving ? 'Saving...' : 'Save' }}
                                    </b-button>
                                </b-card-text>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    // import BooksRepository from '../../services/books-repository.js';

    export default {
        data: function() {
            return {
                saving: false,
                book: {
                    title: '',
                    price: null,
                    authors: [],
                    categories: [],
                    year: null,
                    stock: null,
                    covers: []
                }
            };
        },
        methods: {
            onSubmit: async function() {
                // this.saving = true;

                // try {
                    
                // } catch (error) {
                //     // TODO: handle
                // } finally {
                //     this.saving = false;
                // }
            }
        }
    };
</script>