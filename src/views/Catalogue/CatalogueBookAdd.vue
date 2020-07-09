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
                    <b-form>
                        <b-row>
                            <b-col>
                                <b-card-text>
                                    <b-form-group label-cols="2"
                                                  label="Title:"
                                                  label-for="title-input">
                                        <b-form-input id="title-input"
                                                      v-model="book.title">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Price:"
                                                  label-for="price-input">
                                        <b-form-input id="price-input"
                                                      v-model="book.price"
                                                      type="number"
                                                      number>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Author(s):"
                                                  label-for="authors-input">
                                        <b-form-tags id="authors-input"
                                                      v-model="book.authors"
                                                      placeholder="Add authors...">
                                        </b-form-tags>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Categories:"
                                                  label-for="categories-input">
                                        <b-form-tags id="categories-input"
                                                      v-model="book.categories"
                                                      placeholder="Add categories...">
                                        </b-form-tags>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Published:"
                                                  label-for="published-input">
                                        <b-form-input id="published-input"
                                                      v-model="book.year"
                                                      type="number"
                                                      number
                                                      min="0">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Stock:"
                                                  label-for="stock-input">
                                        <b-form-input id="stock-input"
                                                      v-model="book.stock"
                                                      type="number"
                                                      number
                                                      min="0">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-cols="2"
                                                  label="Cover images:"
                                                  label-for="covers-input">
                                        <b-form-file id="covers-input"
                                                     v-model="book.covers"
                                                     multiple
                                                     accept=".jpg, .png"
                                                     no-drop
                                                     placeholder="Choose cover images...">
                                        </b-form-file>
                                    </b-form-group>
                                </b-card-text>
                                <b-card-text>
                                    <b-button variant="primary"
                                              class="float-right"
                                              v-on:click="onSaveClick"
                                              v-bind:disabled="!canSave">
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
    // import validator from 'validator';
    // import BooksRepository from '../../services/books-repository.js';

    export default {
        data: function() {
            return {
                saving: false,
                book: {
                    title: '',
                    price: 0,
                    authors: [],
                    categories: [],
                    year: 0,
                    stock: 0,
                    covers: []
                }
            };
        },
        computed: {
            canSave() {
                return false;
                // return !validator.isEmpty(this.book.title, { ignore_whitespace: true })
                //     && !Number.isNan(this.book.price)
                //     && this.book.authors.length > 0
                //     && this.book.categories.length > 0;
            }
        },
        methods: {
            onSaveClick: async function() {
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
<style scoped>
    .cover-image {
        width: 100%;
    }
</style>