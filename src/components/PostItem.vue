<template>
    <div class="post">
        <div><b>Название:</b> {{ post.title }}</div>
        <div><b>Описание:</b> {{ post.body }}</div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>