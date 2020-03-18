import AuthService from '../services/auth.service';

// let user = localStorage.getItem('user');
// let initialState = user
//   ? { status: { loggedIn: true }, user: user }
//   : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: { status: { loggedIn: false }, token: null, me: null },
  actions: {
     login({ commit }, user) {
      return AuthService.login(user).then(
        res => {
          commit('loginSuccess', res)
          return res
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    info( {commit} ) {
      AuthService.info().then(
        (dates) => {
          commit('infoData', dates.data)
          return Promise.resolve(true);
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.status.loggedIn = true;
      state.token = token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    infoData(state, me) {
      state.me = me
    }
  }
};
