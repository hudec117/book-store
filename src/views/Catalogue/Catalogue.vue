<template>
    <div>
        <b-row v-if="isStaff">
            <b-col>
                <b-alert show variant="info">
                    <h5 class="alert-heading">Staff</h5>
                    <ul class="mb-0">
                        <li>Choose a book to modify it's stock.</li>
                    </ul>
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="2">
                <b-form>
                    <b-form-group>
                        <b-button v-if="isStaff"
                                  to="/catalogue/add"
                                  variant="primary"
                                  block>Add new book</b-button>
                    </b-form-group>
                    <b-form-group label="Filter by Title"
                                  label-for="title-filter-input">
                        <b-form-input id="title-filter-input"
                                      type="text"
                                      v-model="filter.title"
                                      v-bind:disabled="loading">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Filter by Category"
                                  label-for="category-filter-input">
                        <b-form-checkbox-group id="category-filter-input"
                                               v-model="filter.categories"
                                               v-bind:options="categories"
                                               v-bind:disabled="loading">
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col>
                <div v-if="loading" class="text-center">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <b-card-group deck v-else>
                    <CatalogueBookCard v-for="book of filteredBooks"
                                       v-bind:key="book.id"
                                       v-bind:book="book" />
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import CatalogueBookCard from '../../components/CatalogueBookCard.vue';
    import BooksRepository from '../../services/books-repository.js';

    export default {
        data() {
            return {
                loading: false,
                books: [],
                filter: {
                    title: '',
                    categories: []
                }
            };
        },
        computed: {
            isStaff() {
                return this.$store.state.user.staff;
            },
            filteredBooks: function() {
                let filteredBooks = this.books;

                const titleFilter = this.filter.title.trim();
                const hasTitleFilter = titleFilter !== '';
                const hasCategoryFilter = this.filter.categories.length > 0;

                if (hasTitleFilter) {
                    filteredBooks = filteredBooks.filter(book => {
                        const lowercaseFilterTitle = titleFilter.toLowerCase();
                        const lowercaseBookTitle = book.title.toLowerCase();
                        return lowercaseBookTitle.includes(lowercaseFilterTitle);
                    });
                }

                if (hasCategoryFilter) {
                    filteredBooks = filteredBooks.filter(book => {
                        let matchedCategories = 0;

                        for (const category of this.filter.categories) {
                            if (book.categories.includes(category)) {
                                matchedCategories++;
                            }
                        }

                        return matchedCategories == this.filter.categories.length;
                    });
                }

                return filteredBooks;
            },
            categories: function() {
                return this.books.reduce((all, current) => {
                    for (const category of current.categories) {
                        if (!all.includes(category)) {
                            all.push(category);
                        }
                    }

                    return all;
                }, []);
            }
        },
        components: {
            CatalogueBookCard
        },
        mounted: function() {
            this.loadBooks();
        },
        methods: {
            loadBooks: async function() {
                const repository = new BooksRepository();

                this.loading = true;

                try {
                    this.books = await repository.getAll();
                    this.$store.dispatch('hideAlert');
                } catch (error) {
                    console.error(error);
                    this.$store.dispatch('showErrorAlert', `Failed to load books, reason: ${error.message}`);
                } finally {
                    this.loading = false;
                }
            }
        }
    };
</script>