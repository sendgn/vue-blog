<template>
    <form class="form" @submit.prevent>
        <h4>Создание поста</h4>
        <input
            v-model="post.title"
            class="input"
            type="text"
            placeholder="Название">
        <input
            v-model="post.body"
            class="input"
            type="text"
            placeholder="Описание">
        <button
            @click="createPost"
            class="btn"
        >
            Создать
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            // Generate 'create' event to create post in parent App 'posts' object
            this.$emit('create', this.post);
            this.title = '';
            this.body = '';
            // Clear inputs
            this.post = {
                title: '',
                body: '',
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input {
    width: 100%;
    border: 1px solid darkslateblue;
    padding: 10px 15px;
}

.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: darkslateblue;
    border: 1px solid darkslateblue;
    cursor: pointer;
}
</style>