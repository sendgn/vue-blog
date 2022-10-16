<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyButton
            @click="showDialog"
            style="margin: 15px 0;"
        >
            Создать пост
        </MyButton>
        <MyDialog v-model:show="dialogVisible">
            <PostForm
                @create="createPost"
            />
        </MyDialog>
        <!-- props ':posts' same as 'v-bind:posts' -->
        <PostList
            :posts="posts"
            @remove="removePost"
        />
    </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import MyDialog from './components/UI/MyDialog.vue';
import MyButton from './components/UI/MyButton.vue';

export default {
    components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton
},
    data() {
        return {
            posts: [
                { id: 1, title: 'JavaScript 1', body: 'Описание поста 1' },
                { id: 2, title: 'JavaScript 2', body: 'Описание поста 2' },
                { id: 3, title: 'JavaScript 3', body: 'Описание поста 3' },
                { id: 4, title: 'JavaScript 4', body: 'Описание поста 4' },
            ],
            dialogVisible: false,
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        }
    },
};
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