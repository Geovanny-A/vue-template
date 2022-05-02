<template>
    <div>
        <b-form @submit.stop.prevent="onSubmit">
            <b-container>
                <b-row>
                    <b-col sm="auto" class="my-1">
                        <icon-container
                            variant="primary"
                            size="80"
                            class="mx-auto"
                        >
                            <svg-icon icon="user" />
                        </icon-container>
                    </b-col>
                    <b-col sm="auto" class="my-1">
                        <label
                            ><small>{{ this.$t("general.name") }}</small></label
                        >
                        <b-form-input
                            v-model="form.usua_nombre"
                            size="sm"
                        ></b-form-input>
                    </b-col>
                    <b-col sm="auto" class="my-1">
                        <label
                            ><small>{{
                                this.$t("general.last_name")
                            }}</small></label
                        >
                        <b-form-input
                            v-model="form.usua_apellido"
                            size="sm"
                        ></b-form-input>
                    </b-col>
                    <b-col sm="auto" class="my-1">
                        <label><small>Contraseña</small></label>
                        <b-form-input
                            v-model="form.usua_clave"
                            size="sm"
                        ></b-form-input>
                    </b-col>
                    <b-col sm="auto" class="my-1">
                        <label><small>Email</small></label>
                        <b-form-input
                            v-model="form.usua_mail"
                            size="sm"
                        ></b-form-input>
                    </b-col>
                    <b-col sm="auto" class="my-1">
                        <label><small>Usuario</small></label>
                        <b-form-input
                            v-model="form.usua_usuario"
                            size="sm"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2 flex-nowrap">
                    <b-col sm="auto">
                        <b-button type="submit" size="sm" variant="primary">{{
                            $t("actions.save")
                        }}</b-button>
                    </b-col>
                    <b-col sm="auto">
                        <b-button size="sm" :to="{ name: 'user.index' }">{{
                            $t("actions.cancel")
                        }}</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script>
import { edit, create, findOne } from "../../api/usuarios";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            userId: this.$route.params.id,
            form: {
                usua_id: 0,
                usua_usuario: "",
                usua_nombre: "",
                usua_apellido: "",
                usua_clave: "",
                usua_mail: ""
            }
        };
    },
    methods: {
        ...mapActions(["setLoad"]),
        onSubmit() {
            if (this.form.usua_nombre && this.form.usua_apellido) {
                if (this.userId) {
                    edit(this.userId, this.form);
                } else {
                    create(this.form);
                }
                this.$router.push({ name: "user.index" });
            } else {
                this.showToast("Por favor complete todos los campos", "info");
            }
        }
    },
    mounted() {
        if (this.userId) {
            findOne(this.userId)
                .then(response => {
                    this.form = response.data;
                })
                .catch(err => {
                    this.showToast(
                        "Ocurrió un error al consultar el usuario",
                        "error"
                    );
                });
        }
        this.setLoad(false);
    },
    destroyed() {
        this.setLoad(true);
    },
    computed: {
        ...mapState(["usuarios"])
    }
};
</script>
