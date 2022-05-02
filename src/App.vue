<template>
    <div id="app">
        <svg-sprite />
        <transition name="fade" mode="out-in">
            <component :is="this.$route.meta.layout || 'div'">
                <transition name="fade" mode="out-in">
                    <router-view />
                </transition>
            </component>
        </transition>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
$primary: #2a0499;

$border-radius: 9px;
$border-color: #707070;
$border-width: 0.02rem;

$box-shadow: 0px 3px 6px #00000026 !default;

$theme-colors: () !default;
$theme-colors: map-merge(
    (
        "primary": $primary
    ),
    $theme-colors
);

@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.5s;
    transition-property: opacity;
    transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.grow {
    transition: all 0.2s ease-in-out;
}
.grow:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 6px #00000026;
}

::-webkit-scrollbar {
    opacity: 0;
    width: 5px;
    height: 5px;
    border-radius: 1rem;
    background: transparent;
}

::-webkit-scrollbar:hover {
    opacity: 1;
}

:hover::-webkit-scrollbar-thumb {
    border-radius: 1rem !important;
    background-color: #65717c !important;
}
</style>
