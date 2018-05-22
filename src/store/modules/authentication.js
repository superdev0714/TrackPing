const initialState = {
  userInfo: {
    userId: 0,
    email: 'test@test.com',
    firstName: 'first',
    lastName: 'last'
  },
  myAlerts: []
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USERINFO', payload)
  },
  clearAuthData ({ commit }) {
    commit('CLEAR_AUTH_DATA')
  }
}

const mutations = {
  UPDATE_USERINFO (state, payload) {
    state.userInfo = payload
  },
  CLEAR_AUTH_DATA (state) {
    state = initialState
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
