import AuthenticationService from '@/services/AuthenticationService';

export default {
    login({commit}, payload) {
        return new Promise((resolve, reject) => {
            AuthenticationService
            .login(payload)
            .then(response => {
                let data = response.data;
                let token = data.token; 
                let test = token.split('.');
                let obj = JSON.parse(atob(test[1]));
                commit('setUsername', obj.name);
                commit('setToken', token);
                resolve(resolve);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            AuthenticationService
            .logout()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
            .finally(() => {
                commit('setToken', null);
                commit('setUsername', null);
            });
        });
    }
}