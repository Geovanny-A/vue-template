<template>
    <svg
        class="icon"
        :class="{ 'icon-spin': spin }"
        v-bind:style="
            `fill:var(--${variant});stroke:var(--${variant});width:${width};height:${height}`
        "
    >
        <use :xlink:href="`#${icon}`" />
    </svg>
</template>

<script>
export default {
    name: "SvgIcon",
    props: {
        icon: {
            type: String,
            required: true
        },
        spin: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: 32
        },
        height: {
            type: [Number, String],
            default: 32
        },
        variant: {
            type: String,
            default: "light"
        }
    }
};
</script>

<style>
svg.icon {
    display: inline-block;
    stroke-width: 0;
}
svg.icon-spin {
    animation: icon-spin 2s infinite linear;
}
@keyframes icon-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
