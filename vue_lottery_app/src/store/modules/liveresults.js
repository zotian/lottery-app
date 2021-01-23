const state = {
    lotteryNumbers: [],
}
const getters = {}
const mutations = {
  UPDATE_LOOTERY_NUMBERS (state, payload) {
    const {vm, number} = payload
    vm.$set(state.lotteryNumbers, state.lotteryNumbers.length, number)
  },
  RESET_LIVE_STATE (state, payload) {
      const {vm} = payload
      vm.$set(state, 'lotteryNumbers', [])
  }
}
const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}