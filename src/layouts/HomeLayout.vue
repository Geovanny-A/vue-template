<template>
    <div class="home-grid">
        <Sidebar />
        <b-overlay
            :show="load"
            rounded="lg"
            opacity="0.9"
            style="width:100%;height:100vh;"
        >
            <template #overlay>
                <div class="text-center">
                    <svg-icon
                        icon="html5"
                        height="140"
                        width="140"
                        variant="primary"
                    />

                    <div class="text-primary text-center h4">
                        {{ $store.state.message }}
                    </div>
                    <div class=" text-center">
                        <div class="lds-ellipsis mx-auto">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </template>

            <div>
                <b-row class="my-3" align-h="center" no-gutters>
                    <b-col align-self="center"
                        ><b-breadcrumb
                            default
                            class="my-auto"
                            :items="breadcrumbList"
                        ></b-breadcrumb
                    ></b-col>
                    <b-col
                        sm="auto"
                        align-self="center"
                        class="d-none d-lg-block"
                        ><Profile
                    /></b-col>
                </b-row>
                <slot />
            </div>
        </b-overlay>
    </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile.vue";
import { mapState } from "vuex";
export default {
    name: "HomeLayout",
    components: {
        Sidebar,
        Profile
    },
    data() {
        return {
            breadcrumbList: []
        };
    },
    mounted() {
        this.updateList();
    },
    watch: {
        $route() {
            this.updateList();
        }
    },
    methods: {
        routeTo(pRouteTo) {
            if (this.breadcrumbList[pRouteTo].link)
                this.$router.push(this.breadcrumbList[pRouteTo].link);
        },
        updateList() {
            this.breadcrumbList = this.$route.meta.breadcrumb;
        }
    },
    computed: {
        ...mapState(["load"])
    }
};
</script>

<style scoped>
.home-grid {
    display: grid;
    grid-template-columns: 10.65rem auto;
    grid-template-rows: 1fr;
}

@media (max-width: 991px) {
    .home-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
}

.breadcrumb {
    background: white;
}
</style>
