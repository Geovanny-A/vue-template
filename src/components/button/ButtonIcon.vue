<template>
    <b-button
        v-bind="$attrs"
        v-on="$listeners"
        :variant="variant"
        v-b-tooltip.bottom.hover="{ variant: variant }"
        :title="title"
        size="sm"
        class="grow p-0 rounded"
    >
        <svg-icon :icon="icon" />
    </b-button>
</template>
<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            title: null,
            name: null
        };
    },
    created() {
        switch (this.icon) {
            case "plus":
                this.title = this.$t("actions.new");
                break;
            case "pencil":
                this.title = this.$t("actions.edit");
                break;
            case "minus":
                this.title = this.$t("actions.delete");
                break;
            case "copy":
                this.title = this.$t("actions.copy");
                break;
            case "file-excel-o":
                this.title = this.$t("actions.import");
                break;
            case "refresh":
                this.title = "Recargar";
                break;
            default:
                break;
        }
    }
};
</script>
<style scoped>
.btn-sm {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
}
</style>
