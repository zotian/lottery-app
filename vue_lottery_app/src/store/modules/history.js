import axios from 'axios'
const baseURL = `https://lottery-app-5a12b-default-rtdb.firebaseio.com/history.json`
const state = {
   historyBets: [] 
}
const getters = {}
const mutations = {
  HISTORY_BETS_RESPONSE (state, payload) {
    state.historyBets = Object.values(payload)
  }
}
const actions = {
  getAllHistoryBets({commit}) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')).idToken : ''
      let userId= localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')).localId : ''
      const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      const url = `${baseURL}${queryParams}`
      axios
        .get(url)
          .then (res => {
            commit('HISTORY_BETS_RESPONSE', res.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
    })
  },
  addHistory(...payload) {
    return new Promise ((resolve, reject) => {
      let token = ''
      if (localStorage.getItem('loginData')) {
        token = JSON.parse(localStorage.getItem('loginData')).idToken
      }
      let url = `${baseURL}?auth=${token}`
      axios
        .post(url, payload[1])
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}