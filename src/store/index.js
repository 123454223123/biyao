import { createStore } from 'vuex'

export default createStore({
  state: {
    token:sessionStorage.getItem("token") || ""
  },
  getters: {
  },
  mutations: {

    setToken(state,value){
      state.token = value
      sessionStorage.setItem("token",value);
    }
  },
  actions: {
  },
  modules: {
  }
})
