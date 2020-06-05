<template>
    <div class="book-card">
        <b-card img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-3">
            <b-card-title>
                <router-link v-bind:to="{ path: '/books/' + book.id }">{{ book.title }}</router-link>
            </b-card-title>
            <b-card-sub-title>
                {{ book.author }}
            </b-card-sub-title>
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