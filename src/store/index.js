import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null
  },
  mutations: {
    login(state, user) {
      state.isLoggedIn = true
      state.user = user
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    }
  },
})