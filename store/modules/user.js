const state = {
  user: {}
}

const mutations = {
  setUser: (state, val) => {
    state.user = val
  },
  setUserHead: (state, val) => {
    state.user.head = val
  }
}

const actions = {
  setUser: ({ commit }, val) => {
    commit('setUser', val)
  },
  setUserHead: ({ commit }, val) => {
    commit('setUserHead', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
