import axios from "axios";
const baseURL = `https://lottery-app-5a12b-default-rtdb.firebaseio.com/`;
const state = {
  historyBets: []
};
const getters = {};
const mutations = {
  HISTORY_BETS_RESPONSE(state, payload) {
    const { res, vm } = payload;
    state.historyBets = Object.values(res);
    Object.keys(res).forEach((key, i) => {
      vm.$set(state.historyBets[i], "id", key);
    });
  },
  DELETE_HISTORY_RESPONSE(state, payload) {
    const { vm, id } = payload;
    const foundIndex = state.historyBets.findIndex(item => item.id === id);
    vm.$delete(state.historyBets, foundIndex);
  }
};
const actions = {
  getAllHistoryBets({ commit }, payload) {
    const { vm } = payload;
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).idToken
        : "";
      let userId = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).localId
        : "";
      const queryParams = `history.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const url = `${baseURL}${queryParams}`;
      axios
        .get(url)
        .then(res => {
          commit("HISTORY_BETS_RESPONSE", { res: res.data, vm });
          resolve(res);
        })
        .catch(error => {
          checkSessionExpiration(commit, error, vm);
          reject(error);
        });
    });
  },
  addHistory({ commit }, payload) {
    const { vm, requestPayload } = payload;
    return new Promise((resolve, reject) => {
      let token = "";
      if (localStorage.getItem("loginData")) {
        token = JSON.parse(localStorage.getItem("loginData")).idToken;
      }
      let url = `${baseURL}history.json?auth=${token}`;
      axios
        .post(url, requestPayload)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          checkSessionExpiration(commit, error, vm);
          reject(error);
        });
    });
  },
  deleteBet({ commit }, paylaod) {
    const { id, vm } = paylaod;
    return new Promise((resolve, reject) => {
      let token = "";
      if (localStorage.getItem("loginData")) {
        token = JSON.parse(localStorage.getItem("loginData")).idToken;
      }
      let url = `${baseURL}history/${id}.json?auth=${token}`;
      axios
        .delete(url)
        .then(res => {
          commit("DELETE_HISTORY_RESPONSE", { vm, id });
          resolve(res);
        })
        .catch(error => {
          checkSessionExpiration(commit, error, vm);
          reject(error);
        });
    });
  }
};

const checkSessionExpiration = (commit, error, vm) => {
  const errorMsg = error.err.response.data.error.message;
  if (errorMsg === "Auth token is expired") {
    commit(
      "login/SESSION_EXPIRED",
      {
        vm
      },
      { root: true }
    );
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
