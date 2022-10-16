<template>
    <div class="post">
        <div>
            <div><b>Название:</b> {{ post.title }}</div>
            <div><b>Описание:</b> {{ post.body }}</div>
        </div>
        <div class="post__buttons">
            <MyButton
                @click="$emit('remove', post)"
            >
                Удалить
            </MyButton>
        </div>
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
.post {
    padding: 15px;
    border: 2px solid darkslateblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &:not(:first-child) {
        margin-top: 15px;
    }
}
</style>