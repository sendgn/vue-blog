<template>
    <div class="app">
        <PostForm
            @create="createPost"
        />
        <!-- props ':posts' same as 'v-bind:posts' -->
        <PostList
            :posts="posts"
        />
    </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';

export default {
    components: {
        PostList, PostForm,
    },
    data() {
        return {
            posts: [
                { id: 1, title: 'JavaScript 1', body: 'Описание поста 1' },
                { id: 2, title: 'JavaScript 2', body: 'Описание поста 2' },
                { id: 3, title: 'JavaScript 3', body: 'Описание поста 3' },
                { id: 3, title: 'JavaScript 4', body: 'Описание поста 4' },
            ],
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>