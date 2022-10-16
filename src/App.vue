<template>
    <div class="app">
        <h1 style="margin-bottom: 15px;">Страница с постами</h1>
        <BaseInput
            v-model="searchQuery"
            placeholder="Поиск..."
        />
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
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'page_current': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseSelect from './components/UI/BaseSelect.vue';
import BaseInput from './components/UI/BaseInput.vue';

export default {
    components: {
        PostList,
        PostForm,
        BaseDialog,
        BaseButton,
        BaseSelect,
        BaseInput,
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
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
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
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page++;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert('Ошибка');
            }
        },
    },
    mounted() {
        this.fetchPosts();
        const options = {
            root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    watch: {
        // page() {
        //     this.fetchPosts();
        // }
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
.page {
    border: 1px solid black;
    padding: 8px 10px;
    cursor: pointer;
}
.page_current {
    border: 2px solid darkslateblue;
}
.page__wrapper {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.observer {
    height: 30px;
    background: teal;
}
</style>