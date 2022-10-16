<template>
    <div
        class="dialog"
        v-if="show"
        @click="hideDialog"
    >
        <div class="dialog__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false);
        },
    },
};
</script>

<style lang="scss" scoped>
.dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);

    &__content {
        background: $color-white;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }
}
</style>