<template>
    <div>
        <b-row>
            <b-col cols="2">
                <b-form>
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
                loading: true,
                books: [],
                filter: {
                    title: '',
                    categories: []
                }
            };
        },
        computed: {
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
            loadBooks: function() {
                const repository = new BooksRepository();

                this.loading = true;
                repository.getAll().then(books => {
                    this.books = books;
                    this.loading = false;
                });
            }
        }
    };
</script>