<template>
    <div class="book-card">
        <b-card v-bind:title="book.title"
                v-bind:sub-title="book.author"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2">
            <b-card-text>
                £{{ book.price }}
            </b-card-text>
        </b-card>
    </div>
</template>
<script>
    export default {
        props: [ 'book' ]
    };
</script>
<style>
    .book-card {
        width: calc(100%  / 3);
    }
</style>