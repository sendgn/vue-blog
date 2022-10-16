<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
}
</script>

<style lang="scss" scoped>
.btn {
    padding: 10px 15px;
    background: $color-white;
    color: darkslateblue;
    border: 1px solid darkslateblue;
    cursor: pointer;
}
</style>