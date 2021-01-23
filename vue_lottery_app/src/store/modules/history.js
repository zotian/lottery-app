import axios from 'axios'
const baseURL = `https://lottery-app-5a12b-default-rtdb.firebaseio.com/history.json`
const state = {
   historyBets: [] 
}
const getters = {}
const mutations = {

}
const actions = {
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