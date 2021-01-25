import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {};
const files = require.context("./langs", true, /.+\.json$/);
files.keys().forEach(fileName => {
  messages[fileName.replace(".json", "").replace("./", "")] = files(fileName);
});
const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
});

export default i18n;
