import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
//import root stuffs
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
//import modules
import user from './modules/user';
import notification from './modules/notification';
import team from './modules/team';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'application-store',
  storage: window.localStorage,
  //restoreState: (key, storage) => Cookies.getJSON(key),
  //reducer: state => state.user
  modules: ['user']
});

const rootStore =  new Vuex.Store({
  modules: {
    user:user,
    notification:notification,
    team: team
  },
  plugins: [vuexLocalStorage.plugin],
  strict: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
  state, //root state
  getters, //root getters
  mutations, //root mutations
  actions //root actions
})

export default rootStore;