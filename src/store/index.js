import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import { requestLogin } from "../api/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userTemplate: null,
        load: false,
        usuarios: [],
        avatarTemplate: null,
        token: null
    },
    mutations: {
        setUserTemplate(state, user) {
            state.userTemplate = user;
        },
        setLoad(state, load) {
            state.load = load;
        },
        addUser(state, user) {
            user.id = state.usuarios.length + 1;
            state.usuarios.push(user);
        },
        editUser(state, user, id) {
            state.usuarios.forEach(element => {
                if (element.id === id) {
                    element.nombre = user.nombre;
                    element.apellido = user.apellido;
                    element.celular = user.celular;
                }
            });
        },
        removeUser(state, id) {
            const i = state.usuarios.map(item => item.id).indexOf(id);
            state.usuarios.splice(i, 1);
        },
        setAvatarTemplate(state, url) {
            state.avatarTemplate = url;
        },
        setToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.userTemplate = null;
            state.token = null;
            state.avatarTemplate = null;
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                requestLogin(data)
                    .then(response => {
                        const { accessToken, usuario } = response.data;
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = accessToken;
                        commit("setUserTemplate", usuario);
                        commit("setToken", accessToken);
                        resolve(response);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit("logout");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
        setLoad({ commit }, load) {
            commit("setLoad", load);
        },
        addUser({ commit }, user) {
            commit("addUser", user);
        },
        editUser({ commit }, user, id) {
            commit("editUser", user, id);
        },
        removeUser({ commit }, id) {
            commit("removeUser", id);
        },
        setAvatarTemplate({ commit }, url) {
            commit("setAvatarTemplate", url);
        },
        setToken({ commit }, token) {
            commit("setToken", token);
        }
    },

    plugins: [createPersistedState()]
});

export default store;
