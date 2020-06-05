<template>
    <div class="book">
        <b-row class="mb-3">
            <b-col>
                <router-link to="/books">Back to Books</router-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card v-bind:title="book.title"
                        img-src="https://placekitten.com/300/300"
                        img-alt="Card image"
                        img-left class="mb-3">
                    <b-card-text>
                        <h5>£{{ book.price }}</h5>
                    </b-card-text>
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
                book: { }
            };
        },
        created: function() {
            const repository = new BookRepository();
            this.book = repository.get(this.$route.params.id);
        }
    };
</script>