<template>
    <div class="catalogue-book-card">
        <b-card v-bind:img-src="book.covers[0]"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-3">
            <b-card-title>
                <router-link v-bind:to="{ path: '/catalogue/' + book.id }"
                             class="text-decoration-none">{{ book.title }}</router-link>
            </b-card-title>
            <b-card-sub-title>
                {{ book.categories.join(', ') }}
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
    .catalogue-book-card {
        width: calc(100%  / 3);
    }

    .card-img-top {
        height: 250px;
        object-fit: contain;
    }
</style>