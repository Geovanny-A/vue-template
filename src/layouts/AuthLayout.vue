<template>
    <div class="auth-grid">
        <div class="d-flex justify-content-center align-items-center">
            <b-container>
                <b-row align-h="center">
                    <b-col sm="8" xl="6" class="text-center">
                        <b-card class="border-0 shadow">
                            <b-row class="my-5">
                                <b-col>
                                    <svg-icon
                                        icon="html5"
                                        height="80"
                                        width="80"
                                        variant="primary"
                                    />
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <slot />
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="d-none d-lg-block">
            <b-img-lazy
                :src="require('@/assets/img/background.png')"
                style="height: 100vh; width: 50vw; background-size: cover"
                class="border-left"
            ></b-img-lazy>
        </div>
    </div>
</template>
<script>
export default {
    name: "AuthLayout",
    data() {
        return {};
    }
};
</script>
<style scoped>
.auth-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100vh;
}

@media (max-width: 991px) {
    .auth-grid {
        display: grid;
        height: 100vh;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
}
</style>
