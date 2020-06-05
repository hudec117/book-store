<template>
    <div class="book">
        <b-row class="mb-3">
            <b-col>
                <router-link to="/books">Back to Books</router-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card img-src="https://placekitten.com/300/300"
                        img-alt="Card image"
                        img-left class="mb-3">
                    <b-card-title>
                        {{ book.title }}
                        <small class="text-muted">by {{ book.author }}</small>
                    </b-card-title>
                    <b-card-text>
                        <p>Cost: £{{ book.price }}</p>
                        <p>Categories: {{ book.categories.join(', ') }}</p>
                        <p>Published: {{ book.year }}</p>
                        <p>In stock: {{ book.stock }}</p>
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
                book: { }
            };
        },
        created: function() {
            const repository = new BookRepository();
            this.book = repository.get(this.$route.params.id);
        }
    };
</script>