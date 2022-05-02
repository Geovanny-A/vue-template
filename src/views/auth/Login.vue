<template>
    <div>
        <b-form @submit.stop.prevent="onLogin">
            <b-row class="my-3">
                <b-col>
                    <b-input
                        size="sm"
                        type="text"
                        v-model="$v.form.usua_usuario.$model"
                        :state="validateState('usua_usuario')"
                        :placeholder="$t('login.user')"
                        class="rounded text-center border text-primary"
                    ></b-input>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <b-input
                        size="sm"
                        type="password"
                        v-model="$v.form.usua_clave.$model"
                        :state="validateState('usua_clave')"
                        :placeholder="$t('login.password')"
                        class="rounded text-center border text-primary"
                    ></b-input>
                </b-col>
            </b-row>
            <b-row class="my-2">
                <b-col>
                    <b-button
                        type="submit"
                        size="sm"
                        class="rounded"
                        variant="primary"
                        block
                        :disabled="loadLogin"
                    >
                        <b-spinner small v-if="loadLogin"></b-spinner>
                        {{ $t("login.button") }}</b-button
                    >
                </b-col>
            </b-row>

            <b-row align-h="center" class="my-2">
                <b-col>
                    <b-button
                        size="sm"
                        class="rounded border"
                        @click="onLoginGoogle"
                        variant="light"
                        block
                    >
                        <svg-icon
                            icon="google"
                            height="16"
                            width="16"
                            variant="dark"
                    /></b-button>
                </b-col>
                <b-col>
                    <v-facebook-login-scope app-id="2146252248983683">
                        <b-button
                            size="sm"
                            slot-scope="scope"
                            class="rounded border"
                            :disabled="scope.working === true ? false : true"
                            variant="light"
                            block
                        >
                            <svg-icon
                                icon="facebook"
                                height="16"
                                width="16"
                                variant="dark"
                        /></b-button>
                    </v-facebook-login-scope>
                </b-col>
            </b-row>
            <b-row class="my-4">
                <b-col>
                    <small>
                        <router-link :to="{ name: 'reset' }">
                            {{ $t("login.reset") }}
                        </router-link>
                    </small>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { googleLogin } from "../../api/auth";
import { VFBLoginScope as VFacebookLoginScope } from "vue-facebook-login-component";
export default {
    components: {
        VFacebookLoginScope
    },
    mixins: [validationMixin],
    validations: {
        form: {
            usua_usuario: { required },
            usua_clave: { required }
        }
    },
    name: "Login",
    data() {
        return {
            form: {
                usua_usuario: null,
                usua_clave: null
            },
            loadLogin: false
        };
    },
    methods: {
        ...mapActions(["login", "setAvatarTemplate", "setLoad"]),
        onLogin() {
            this.loadLogin = true;
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }

            this.login(this.form)
                .then(response => {
                    this.loadLogin = false;
                    this.$router.push({ name: "home" }).catch(() => {});
                })
                .catch(err => {
                    this.loadLogin = false;
                    this.showToast(err.response.data.message, "error");
                });
        },
        async onLoginGoogle() {
            const googleUser = await this.$gAuth.signIn();
            //console.log(googleUser.getAuthResponse());
            //console.log(googleUser.getBasicProfile());
            //console.log(googleUser.getBasicProfile().getEmail());
            //console.log(googleUser.getBasicProfile().getId());
            //console.log(googleUser.getBasicProfile().getImageUrl());
            //console.log(googleUser.getBasicProfile().getName());
            this.form.usua_usuario = googleUser.getBasicProfile().getName();
            this.form.usua_clave = googleUser.getBasicProfile().getId();
            this.setAvatarTemplate(googleUser.getBasicProfile().getImageUrl());
            this.login(this.form);
            this.$router.push({ name: "home" }).catch(() => {});
            //https://oauth2.googleapis.com/tokeninfo?id_token=
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        }
    }
};
</script>
