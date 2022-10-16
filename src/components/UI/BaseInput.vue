<template>
    <input
        :value="modelValue"
        @input="updateInput"
        class="input"
        type="text"
    >
</template>

<script>
export default {
    name: 'BaseInput',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
}
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    border: 1px solid darkslateblue;
    padding: 10px 15px;
}
</style>