import { endpoint } from "~/api/endpoint";

export const state = () => ({
  user: {},
  accessToken: {},
  refreshToken: {},
});

export const getters = {
  getUser(state) {
    return state.user;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
}

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  setAccessToken(state, data){
    state.accessToken = data;
  },
  setRefreshToken(state, data){
    state.refreshToken = data;
  },
}

export const actions = {
  async fetchUser({ commit }) {
    const response = await this.$axios.$get(`${endpoint.ME}`)
    commit('setUser', response.data)
  },
  setUser({ commit }, data) {
    commit('setUser', data)
  },
  setAccessToken({ commit }, data) {
    commit('setAccessToken', data)
  },
  setRefreshToken({ commit }, data) {
    commit('setRefreshToken', data)
  },
}