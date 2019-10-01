import axios from 'axios';
import store from '@/store/';
import router from '@/router';

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  crossDomain: true,
  headers: {
    'X-Requested-With' : 'XMLHttpRequest', 
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  }
})

instance.interceptors.request.use(function (config) {
    let token = store.getters['user/getToken'];
    if(token) {
      config.headers.authorization = 'Bearer ' + token;
    }
    return config;
  }, function (error) {
      
    return Promise.reject(error)
});

instance.interceptors.response.use(function(response) {
    return response;
  }, function (error) {
    console.log("interceptop - " + error);

    if (401 === error.response.status) {
      //logout
      store.dispatch("user/logout");
      router.push({path:'/'});
      alert("Your session expired!");
    } else if(403 === error.response.status) {
        store.dispatch('setSnackbarMessage', error.response.data.message);
    } else {
        return Promise.reject(error);
    }
});

export default instance;