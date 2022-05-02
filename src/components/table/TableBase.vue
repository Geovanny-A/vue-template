<template>
    <b-table
        ref="table"
        tbody-tr-class="text-center h6"
        thead-tr-class="text-center shadow"
        borderless
        class="border-bottom"
        hover
        fixed
        responsive
        select-mode="single"
        selectable
        :selected-variant="variant"
        show-empty
        small
        sticky-header="50vh"
        tbody-class="text-center text-nowrap"
        thead-class="text-center"
        v-bind="{ ...$attrs, ...$props }"
        v-on="$listeners"
    >
        <template
            v-for="slotName in Object.keys($scopedSlots)"
            v-slot:[slotName]="slotScope"
        >
            <slot :name="slotName" v-bind="slotScope"></slot>
        </template>
        <template #table-busy>
            <div class="text-center">
                <div>
                    <b-spinner variant="primary"></b-spinner>
                </div>
            </div>
        </template>
        <template #empty>
            <h4 class="text-muted text-center">
                {{ $t("table.nodata") }}
            </h4>
        </template>
        <template #head()="col">
            <div class="text-truncate">
                <span v-bind:class="`text-${variant}`" class="h5">{{
                    col.label
                }}</span>
            </div>
        </template>
        <template #cell()="col">
            <div class="text-truncate">
                <span>{{ col.value }}</span>
            </div>
        </template>
    </b-table>
</template>
<script>
export default {
    props: {
        variant: {
            type: String,
            default: "primary"
        }
    }
};
</script>
