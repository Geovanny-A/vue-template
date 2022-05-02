<template>
    <div>
        <b-container>
            <b-row align-h="center">
                <b-col sm="auto" class="text-center"> </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            options: [
                { label: "Alabama", code: "al" },
                { label: "California", code: "cal" }
            ],
            selected: []
        };
    },
    methods: {
        ...mapActions(["setLoad"])
    },
    mounted() {
        this.setLoad(false);
    },
    destroyed() {
        this.setLoad(true);
    },
    watch: {
        selected() {
            console.log(this.selected);
        }
    }
};
</script>
