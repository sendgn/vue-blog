<template>
    <div>
        <h3>Список пользователей</h3>
        <PostItem
            v-for="post in posts"
            :post="post"
        />
    </div>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
    props: {
        posts: {
            type: Array,
            required: true
        },
    },
    components: { PostItem },
}
</script>

<style lang="scss" scoped>
.post {
    padding: 15px;
    border: 2px solid darkslateblue;
    
    &:not(:first-child) {
        margin-top: 15px;
    }
}
</style>