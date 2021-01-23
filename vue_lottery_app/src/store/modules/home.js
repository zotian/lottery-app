const state = {
    selectedNumbers: []
}
const getters = {}
const mutations = {
  UPDATE_SELECTED_NUMBERS(state, payload) {
    const {vm, number} = payload
    vm.$set(state.selectedNumbers, state.selectedNumbers.length, number)
  },
  REMOVE_SELECTED_NUMBER(state, payload) {
     const {vm, number} = payload
     const foundndNumberIndex = state.selectedNumbers.findIndex(data => data === number)
     vm.$delete(state.selectedNumbers, foundndNumberIndex)
  },
  RESET_HOME_STATE (state, payload) {
    const {vm} = payload
    vm.$set(state, 'selectedNumbers', [])
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