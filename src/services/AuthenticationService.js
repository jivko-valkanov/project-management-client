import Api from './Api';

export default {
    login(payload) {
        return Api.post("/api/auth/login", payload);
    },
    register(payload) {
        return Api.post("/api/signup", payload);
    },
    logout(payload) {
        return Api.post("/api/auth/logout", payload);
    }
}