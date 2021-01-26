import axios from "axios";
const loginPath = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_LOGIN_KEY}`;
const registerPath = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_LOGIN_KEY}`;
const state = {
  userData: []
};
const getters = {};
const mutations = {
  UPDATE_USER_DATA(state, payload) {
    const { res } = payload;
    state.userData = payload;
    localStorage.setItem("loginData", JSON.stringify(res.data));
  },
  SESSION_EXPIRED(state, payload) {
    const { vm } = payload;
    vm.$router.push("/login");
    localStorage.removeItem("loginData");
    vm.$nextTick(() => {
      vm.$bvToast.toast(vm.$t("toast.error.sessionExpired"), {
        title: vm.$t("buttons.error"),
        variant: "danger",
        solid: true
      });
    });
  }
};
const actions = {
  loginRegister({ commit }, payload) {
    const { vm, formData, returnSecureToken, action } = payload;
    const requestBody = {
      ...formData,
      returnSecureToken
    };
    const path = action === "login" ? loginPath : registerPath;
    return new Promise((resolve, reject) => {
      axios
        .post(path, requestBody)
        .then(res => {
          commit("UPDATE_USER_DATA", {
            res,
            vm
          });
          resolve(res);
        })
        .catch(err => {
          reject({ err });
        });
    });
  }
};
// const checkExpiredToken = (commit) => {
//   const refreshToken = JSON.parse(localStorage.getItem('loginData')).refreshToken
//   const idToken = JSON.parse(localStorage.getItem('loginData')).idToken
//   if (!idToken) {
//     commit('LOGOUT', {vm:this})
//   } else {
//     const expirationTime = JSON.parse(localStorage.getItem('loginData')).expiresIn
//     const expirationDate = new Date(expirationTime)
//     if (expirationDate <= new Date()) {
//       commit('LOGOUT')
//     } else {
//       checkAuthTimeout(expirationDate)
//     }
//   }
// }
// const checkAuthTimeout = (expirationDate) => {
//   console.log(expirationDate)
//   const requestPayload = {'refresh_token': refreshToken, 'grant_type': 'refresh_token'}
//   setTimeout(() => {
//     axios
//       .post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_LOGIN_KEY}`, requestPayload)
//         .then((res) => {
//           localStorage.setItem('loginData', JSON.stringify(res.data))
//         })
//         .catch(err => {
//           console.log(err)
//         })
//   }, expirationDate)
// }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
