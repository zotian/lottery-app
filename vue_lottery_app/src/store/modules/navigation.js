const state = {
  isHomeDisabled: false,
  isLiveDrawDisabled: true
};
const getters = {};
const mutations = {
  TOGGLE_HOME_AND_LIVE_DRAW_ACTIVE(state) {
    state.isHomeDisabled = !state.isHomeDisabled;
    state.isLiveDrawDisabled = !state.isLiveDrawDisabled;
  },
  RESET_NAVIGATION_ACTIVE_TABS(state, payload) {
    const { vm } = payload;
    vm.$set(state, "isHomeDisabled", false);
    vm.$set(state, "isLiveDrawDisabled", true);
  },
  UPDATE_HOME_ACTIVE(state, payload) {
    const { vm, isDisabled } = payload;
    vm.$set(state, "isHomeDisabled", isDisabled);
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
