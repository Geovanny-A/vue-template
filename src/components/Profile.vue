<template>
    <div class="float-right mr-4 ">
        <b-container fluid>
            <b-row no-gutters align-v="center">
                <b-col>
                    <b-dropdown
                        size="lg"
                        variant="link"
                        toggle-class="text-decoration-none"
                        class="text-decoration-none"
                        right
                        no-caret
                    >
                        <template v-slot:button-content>
                            <b-avatar
                                :src="avatarTemplate ? avatarTemplate : ''"
                                class="text-decoration-none"
                                size="lg"
                            />
                        </template>
                        <b-dropdown-header class="text-center">
                            {{ userTemplate ? userTemplate.usua_usuario : "" }}
                        </b-dropdown-header>
                        <b-dropdown-item-button
                            @click="onLogout"
                            class="text-center h6"
                            >Salir</b-dropdown-item-button
                        >
                    </b-dropdown></b-col
                >
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions(["logout"]),
        onLogout() {
            this.logout().then(response => {
                this.$router.push({ name: "login" }).catch(() => {});
            });
        }
    },
    mounted() {},
    computed: {
        ...mapState(["userTemplate", "avatarTemplate"])
    }
};
</script>
<style scoped>
/deep/button:focus {
    outline: none;
    box-shadow: none;
}

/deep/button {
    padding: 0px;
}
</style>
