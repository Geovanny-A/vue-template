<template>
    <div
        class="icon-container"
        v-bind:class="`bg-${variant}`"
        v-bind:style="`width:${size}px;height:${size}px`"
    >
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        variant: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }
};
</script>
<style scoped>
.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}
</style>
