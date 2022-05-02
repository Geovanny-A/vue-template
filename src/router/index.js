import Vue from "vue";
import VueRouter from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import { i18n } from "@/plugins/i18n";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        /** pagina de error 404 (Not Found). */
        path: "/404",
        name: "404",
        component: () =>
            import(/* webpackChunkName: "404" */ "../views/404.vue")
    },
    {
        /** Captura todas las rutas que no existen y nos redirige a /404. */
        path: "*",
        redirect: "/404"
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
        meta: { layout: AuthLayout, logged: true }
    },
    {
        path: "/reset",
        name: "reset",
        component: () =>
            import(/* webpackChunkName: "reset" */ "../views/auth/Reset.vue"),
        meta: { layout: AuthLayout, logged: true }
    },
    {
        path: "/",
        name: "home",
        component: () =>
            import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {
            layout: HomeLayout,
            auth: true,
            breadcrumb: [
                {
                    text: i18n.t("general.home"),
                    to: { name: "home" },
                    active: true
                }
            ]
        }
    },
    {
        path: "/user",
        name: "user.index",
        component: () =>
            import(
                /* webpackChunkName: "user.index" */ "../views/user/Index.vue"
            ),
        meta: {
            layout: HomeLayout,
            auth: true,
            breadcrumb: [
                {
                    text: i18n.t("general.home"),
                    to: { name: "home" }
                },
                {
                    text: i18n.t("general.users")
                }
            ]
        }
    },
    {
        path: "/user/create",
        name: "user.create",
        component: () =>
            import(
                /* webpackChunkName: "user.create" */ "../views/user/Form.vue"
            ),
        meta: {
            layout: HomeLayout,
            auth: true,
            breadcrumb: [
                {
                    text: i18n.t("general.home"),
                    to: { name: "home" }
                },
                {
                    text: i18n.t("general.users"),
                    to: { name: "user.index" }
                },
                {
                    text: i18n.t("actions.new")
                }
            ]
        }
    },
    {
        path: "/user/edit/:id",
        name: "user.edit",
        component: () =>
            import(
                /* webpackChunkName: "user.edit" */ "../views/user/Form.vue"
            ),
        meta: {
            layout: HomeLayout,
            auth: true,
            breadcrumb: [
                {
                    text: i18n.t("general.home"),
                    to: { name: "home" }
                },
                {
                    text: i18n.t("general.users"),
                    to: { name: "user.index" }
                },
                {
                    text: i18n.t("actions.edit")
                }
            ]
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.userTemplate;

    if (
        to.name !== "login" &&
        !isAuthenticated &&
        to.matched.some(record => record.meta.auth)
    ) {
        next({ name: "login" });
    } else if (
        isAuthenticated &&
        to.matched.some(record => record.meta.logged)
    ) {
        next({ name: "home" });
    } else next();
});

export default router;
