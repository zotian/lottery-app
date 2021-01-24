const state = {
  lotteryNumbers: [],
  liveStatus: false
};
const getters = {};
const mutations = {
  TOGGLE_LIVE_STATUS(state, payload) {
    state.liveStatus = payload;
  },
  UPDATE_LOTTERY_NUMBERS(state, payload) {
    const { vm, number } = payload;
    vm.$set(state.lotteryNumbers, state.lotteryNumbers.length, number);
  },
  RESET_LIVE_STATE(state, payload) {
    const { vm } = payload;
    vm.$set(state, "lotteryNumbers", []);
    vm.$set(state, "liveStatus", false);
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
