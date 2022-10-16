<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <div class="app__btns">
            <BaseButton
                @click="showDialog"
            >
                Создать пост
            </BaseButton>
            <BaseSelect
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <BaseDialog v-model:show="dialogVisible">
            <PostForm
                @create="createPost"
            />
        </BaseDialog>
        <!-- props ':posts' same as 'v-bind:posts' -->
        <PostList
            :posts="posts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import axios from 'axios';
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseSelect from './components/UI/BaseSelect.vue';

export default {
    components: {
        PostList,
        PostForm,
        BaseDialog,
        BaseButton,
        BaseSelect,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
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
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },
    },
    mounted() {
        this.fetchPosts();
    }
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

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>