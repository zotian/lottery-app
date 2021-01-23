// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
import Vue from 'vue'
import Vuex from 'vuex'
// import all modules
import allModules from './allModules'

// When used with a module system, you must explicitly install Vuex via Vue.use()
Vue.use(Vuex)
let modules = {
  ...allModules
}
const store = new Vuex.Store({
  modules
})
export default store

const initialStateCopy = JSON.parse(JSON.stringify(store.state))

export function resetState () {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
