import Vue from 'vue';
import App from './App.vue';
import Vuetify from '@/plugins/vuetify';
import router from '@/router/'
import store from '@/store/';
//import { sync } from 'vuex-router-sync';

Vue.use(Vuetify,{
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  }
});
Vue.config.productionTip = false

//sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
