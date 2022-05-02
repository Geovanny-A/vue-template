import axios from "axios";
import store from "@/store/index";

const url = process.env.VUE_APP_API_BASE_URL;
const service = axios.create({
    baseURL: url,
    timeout: 1200000
});
service.defaults.timeout = 1200000;
service.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${store.state.token}`;
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Credentials"] = "true";
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch("logout");
        }
        return Promise.reject(error);
    }
);

export default service;
