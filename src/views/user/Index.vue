<template>
    <b-container>
        <b-row>
            <b-col sm="auto" align-self="center" class="my-1 ">
                <icon-container variant="primary" size="60" class="mx-auto">
                    <svg-icon icon="user" />
                </icon-container>
            </b-col>
            <b-col sm="auto" align-self="center" class="my-1 text-center">
                <h3>{{ $t("general.users") }}</h3>
            </b-col>
            <b-col sm="auto" align-self="center" class="my-1 ml-auto">
                <b-row class="flex-nowrap">
                    <zoom-center-transition :duration="500">
                        <b-col class="text-center">
                            <button-icon
                                icon="plus"
                                class="mx-auto"
                                variant="primary"
                                :to="{ name: 'user.create' }"
                            ></button-icon>
                        </b-col>
                    </zoom-center-transition>
                    <zoom-center-transition :duration="500">
                        <b-col class="text-center">
                            <button-icon
                                icon="refresh"
                                class="mx-auto"
                                variant="success"
                                @click="refresh"
                            ></button-icon>
                        </b-col>
                    </zoom-center-transition>
                    <zoom-center-transition :duration="500">
                        <b-col v-show="showActions" class="text-center">
                            <button-icon
                                icon="minus"
                                class="mx-auto"
                                variant="danger"
                                @click="eliminar"
                            ></button-icon>
                        </b-col>
                    </zoom-center-transition>
                    <zoom-center-transition :duration="500">
                        <b-col v-show="showActions" class="text-center">
                            <button-icon
                                icon="pencil"
                                class="mx-auto"
                                variant="primary"
                                @click="editar"
                            ></button-icon>
                        </b-col>
                    </zoom-center-transition>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <table-base
                    :fields="fields"
                    :items="provider"
                    @row-selected="onRowSelected"
                    @row-dblclicked="onRowDoubleClick"
                    ref="usuario"
                ></table-base>
            </b-col>
        </b-row>
        <b-row align-h="center" class="mt-2">
            <b-col sm="auto" align-self="center" class="text-center my-1 ">
                <div class="mx-auto d-inline-flex">
                    <h4 class="my-auto mx-1 text-primary">{{ totalRows }}</h4>
                    <h5 class="my-auto mx-1 text-primary">
                        {{ $t("general.users") }}
                    </h5>
                </div>
            </b-col>
            <b-col
                sm="auto"
                align-self="center"
                class="text-center ml-0 ml-md-auto my-1"
            >
                <b-pagination
                    size="sm"
                    align="center"
                    class="my-auto"
                    :total-rows="totalRows"
                    :per-page="size"
                    v-model="page"
                ></b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { deleteAll, deleteOne, findAll } from "../../api/usuarios";
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            id: 0,
            showActions: false,
            totalRows: 0,
            fields: [
                { key: "usua_nombre", label: this.$t("general.name") },
                { key: "usua_apellido", label: this.$t("general.last_name") }
            ],
            page: 1,
            size: 10
        };
    },
    methods: {
        ...mapActions(["setLoad"]),
        editar() {
            if (this.id !== 0) {
                this.$router.push({
                    name: "user.edit",
                    params: { id: this.id }
                });
            }
        },
        eliminar() {
            if (this.id !== 0) {
                deleteOne(this.id)
                    .then(response => {
                        this.showToast(
                            "El usuario se elimino correctamente",
                            "success"
                        );
                        this.refresh();
                    })
                    .catch(err => {
                        this.showToast(
                            "Ocurrió un error al eliminar el usuario",
                            "error"
                        );
                    });
            }
        },
        refresh() {
            this.$refs.usuario.$refs.table.refresh();
        },
        onRowSelected(rows) {
            if (rows.length !== 0) {
                this.showActions = true;
                this.id = rows[0].usua_id;
            } else {
                this.showActions = false;
                this.id = 0;
            }
        },
        onRowDoubleClick(row) {
            this.id = row.usua_id;
            this.$router.push({
                name: "user.edit",
                params: { id: this.id }
            });
        },
        provider() {
            this.busy = true;
            return findAll(this.page, this.size, this.filter)
                .then(response => {
                    const items = response.data.rows;
                    this.totalRows = response.data.totalItems;
                    this.busy = false;
                    return items;
                })
                .catch(() => {
                    this.busy = false;
                    return [];
                });
        }
    },
    mounted() {
        this.totalRows = this.usuarios.length;
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
