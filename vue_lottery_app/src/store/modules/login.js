import axios from 'axios'
const loginPath = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_LOGIN_KEY}`
const registerPath = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_LOGIN_KEY}`
const state = {
  userData: []
}
const getters = {}
const mutations = {
  UPDATE_USER_DATA (state, payload) {
    const {res} = payload
    state.userData = payload
    localStorage.setItem('loginData', JSON.stringify(res.data))
  }
}
const actions = {
  loginRegister({commit}, payload) {
    const {vm, formData, returnSecureToken, action} = payload
    const requestBody = {
      ...formData,
      returnSecureToken
    }
    const path = action === 'login' ? loginPath : registerPath
    return new Promise((resolve, reject) => {
      axios
        .post(path, requestBody)
          .then(res => {
            commit('UPDATE_USER_DATA', {
              res,
              vm
            })
            resolve(res)
          })
          .catch((err) => {
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
