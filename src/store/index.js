import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dailyWord: "punir",
  },
  getters: {
    getDailyWord: (state) => state.dailyWord,
  },
  mutations: {},
  actions: {},
  modules: {},
});
