import Vue from "vue";
import Vuex from "vuex";
import allModules from "./allModules";

Vue.use(Vuex);
let modules = {
  ...allModules
};
const store = new Vuex.Store({
  modules
});
export default store;

const initialStateCopy = JSON.parse(JSON.stringify(store.state));

export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)));
}
