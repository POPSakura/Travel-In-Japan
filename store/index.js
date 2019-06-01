import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      const { status, data: { code, user } } = await app.$axios.get('/user/getUserData')
      commit('user/setUser', status === 200 && code === 0 ? user : {})
    }
  },
  strict: true
})

export default store
