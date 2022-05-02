import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const messages = {
  es: require("@/locales/es.json"),
  en: require("@/locales/en.json"),
};

export const i18n = new VueI18n({
  locale: window.navigator.language.split("-")[0],
  fallbackLocale: "en",
  messages,
});
