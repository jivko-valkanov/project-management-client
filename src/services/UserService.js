import Api from './Api';

export default {
    getUsers(payload) {
        return Api.get("/api/accounts", payload)
    },
    createUser(payload) {
        return Api.post("/api/accounts", payload);
    },
    getUserDetails(id) {
        return Api.get("/api/accounts/"+id);
    },
    getSelfDetails() {
        return Api.get("/api/user");
    },
    updateUserDetails(payload) {
        return Api.post("/api/accounts/change-password", payload);
    }
};
