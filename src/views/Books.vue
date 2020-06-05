<template>
    <div class="books">
        <b-row>
            <b-col cols="2">
                <b-form>
                    <b-form-group label="Filter by Title"
                                  label-for="title-filter-input">
                        <b-form-input id="title-filter-input"
                                      type="text"
                                      v-model="filter.title">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Filter by Category"
                                  label-for="category-filter-input">
                        <b-form-checkbox-group id="category-filter-input"
                                               v-model="filter.categories"
                                               v-bind:options="categories">
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col>
                <b-card-group deck>
                    <BookCard v-for="book of filteredBooks"
                              v-bind:key="book.id"
                              v-bind:book="book" />
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import BookCard from '../components/BookCard.vue';
    import BooksRepository from '../services/books-repository.js';

    export default {
        data() {
            return {
                books: [],
                filter: {
                    title: '',
                    categories: []
                }
            };
        },
        computed: {
            filteredBooks: function() {
                let filteredBooks = [];

                const hasTitleFilter = this.filter.title !== '';
                const hasCategoryFilter = this.filter.categories.length > 0;

                const filtersApplied = hasTitleFilter || hasCategoryFilter;
                if (filtersApplied) {
                    for (const book of this.books) {
                        if (hasTitleFilter) {
                            const lowercaseFilterTitle = this.filter.title.toLowerCase();
                            const lowercaseBookTitle = book.title.toLowerCase();
                            if (lowercaseBookTitle.includes(lowercaseFilterTitle)) {
                                filteredBooks.push(book);
                            }
                        }

                        if (hasCategoryFilter) {
                            let matchedCategories = 0;

                            for (const category of this.filter.categories) {
                                if (book.categories.includes(category)) {
                                    matchedCategories++;
                                }
                            }

                            if (matchedCategories == this.filter.categories.length && !filteredBooks.includes(book)) {
                                filteredBooks.push(book);
                            }
                        }
                    }
                } else {
                    filteredBooks = this.books;
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
            BookCard
        },
        created: function() {
            const repository = new BooksRepository();
            this.books = repository.getAll();
        }
    };
</script>