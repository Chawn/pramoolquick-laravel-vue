import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {
        email: sessionStorage.getItem("user_email") || null,
        name: sessionStorage.getItem("user_name") || null,
      },
      token: sessionStorage.getItem("TOKEN") || null,
    },
    dashboard:{
      loading: false,
      data: {}
    },    notification: {
      show: false,
      type: null,
      message: null,
    }
  },
  getters: {},
  
  actions: { //store.dispatch('actionName', payload)
    getDashboardData({ commit }) {
      commit('dashboardLoading', true);
      return axiosClient.get('/dashboard')
      .then((res) => {
        commit('dashboardLoading', false);
        commit('setDashboardData', res.data);
        return res;
      })
      .catch(error => {
        commit('dashboardLoading', false);
        return error;
      })
    },
   
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
    
  },
  mutations: { //store.commit('mutationsName', payload)
    dashboardLoading(state, loading) {
      state.dashboard.loading = loading;
    },
    setDashboardData(state, data){
      state.dashboard.data = data;
    },
    logout: (state) => {
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("user_email");
      sessionStorage.removeItem("user_name");
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.data = userData.user;
      state.user.token = userData.token;
      sessionStorage.setItem("user_email", userData.user.email); 
      sessionStorage.setItem("user_name", userData.user.name); 
      sessionStorage.setItem("TOKEN", userData.token);
    },
    notify: (state, { type, message }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(()=>{
        state.notification.show = false;
      }, 3000)
    },
  },
  modules: {},
});

export default store;
