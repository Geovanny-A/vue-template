<template>
    <div>
        <b-nav
            vertical
            class="vertical d-none d-lg-block bg-primary text-center"
        >
            <b-nav-item class="my-2" v-b-tooltip.right.hover title="Inicio">
                <router-link
                    class="text-decoration-none"
                    :to="{ name: 'home' }"
                >
                    <icon-container
                        variant="light"
                        size="70"
                        class="mx-auto grow"
                    >
                        <svg-icon icon="html5" variant="primary" />
                    </icon-container>
                </router-link>
            </b-nav-item>

            <b-nav-item
                class="my-2 mt-4"
                v-b-tooltip.right.hover
                title="Usuarios"
            >
                <router-link
                    class="text-decoration-none "
                    :to="{ name: 'user.index' }"
                >
                    <icon-container
                        variant="light"
                        size="50"
                        class="mx-auto grow"
                    >
                        <svg-icon icon="user" variant="primary" />
                    </icon-container>
                </router-link>
            </b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    methods: {}
};
</script>

<style scoped>
.vertical {
    display: flex;
    min-width: 10.625rem;
    max-width: 10.625rem;
    flex-direction: row;
    height: 100vh;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
}
</style>
