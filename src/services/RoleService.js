import Api from './Api';

export default {
    getRoles(payload) {
        return Api.get("/api/roles", payload)
    }
};
