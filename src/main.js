import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Transitions from "vue2-transitions";
import VueSweetalert2 from "vue-sweetalert2";
import { BootstrapVue } from "bootstrap-vue";
import { i18n } from "@/plugins/i18n";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import GAuth from "vue-google-oauth2";

const gauthOption = {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    scope: "profile email",
    prompt: "select_account"
};
Vue.use(GAuth, gauthOption);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(Transitions);
Vue.use(VueSweetalert2, {
    buttonsStyling: false,
    customClass: {
        confirmButton: "btn btn-primary mx-2",
        cancelButton: "btn btn-secondary mx-2",
        popup: "rounded"
    },
    confirmButtonText: i18n.t("actions.confirm"),
    cancelButtonText: i18n.t("actions.cancel")
});

Vue.mixin({
    methods: {
        showToast(msg, type) {
            this.$swal({
                title: msg,
                toast: true,
                icon: type,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500
            });
        }
    }
});
Vue.component("svg-sprite", () => import("./components/icon/SvgSprite.vue"));
Vue.component("svg-icon", () => import("./components/icon/SvgIcon.vue"));
Vue.component("icon-container", () =>
    import("./components/icon/IconContainer.vue")
);

Vue.component("table-base", () => import("./components/table/TableBase.vue"));
Vue.component("button-icon", () =>
    import("./components/button/ButtonIcon.vue")
);
Vue.prototype.$http = axios;
const token = store.state.token;
if (token) {
    Vue.prototype.$http.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;
}

new Vue({
    i18n,
    router,
    store,
    beforeCreate() {
        const html = document.documentElement;
        html.setAttribute("lang", i18n.locale);
        this.$http.interceptors.response.use(undefined, function(err) {
            return new Promise(function(resolve, reject) {
                if (
                    err.status === 401 &&
                    err.config &&
                    !err.config.__isRetryRequest
                ) {
                    this.$store.dispatch("logout");
                }
                throw err;
            });
        });
    },

    render: h => h(App)
}).$mount("#app");
