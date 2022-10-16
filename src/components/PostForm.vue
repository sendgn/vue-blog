<template>
    <form class="form" @submit.prevent>
        <h4>Создание поста</h4>
        <BaseInput
            v-model="post.title"
            type="text"
            placeholder="Название" />
        <BaseInput
            v-model="post.body"
            type="text"
            placeholder="Описание" />
        <BaseButton
            @click="createPost"
            style="align-self: flex-end;"
        >
            Создать
        </BaseButton>
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
</style>