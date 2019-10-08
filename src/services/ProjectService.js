import Api from './Api';

export default {
    getProjects(payload) {
        return Api.get("/api/projects", payload);
    }
}