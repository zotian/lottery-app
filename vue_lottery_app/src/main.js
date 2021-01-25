import "@/scss/main.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./translations/locale";
import * as store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  i18n,
  store: store.default,
  render: h => h(App)
}).$mount("#app");
