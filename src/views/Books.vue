<template>
    <div class="books">
        <div class="row">

        </div>
        <div class="row">
            <b-card-group deck>
                <Book v-for="book of books"
                      v-bind:key="book.id"
                      v-bind:book="book" />
            </b-card-group>
        </div>
    </div>
</template>
<script>
    import Book from '../components/Book.vue';
    import BooksRepository from '../services/books-repository.js';

    export default {
        data() {
            return {
                books: []
            };
        },
        components: {
            Book
        },
        created: function() {
            const repository = new BooksRepository();
            this.books = repository.getAll();
        }
    };
</script>