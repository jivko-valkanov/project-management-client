import Api from './Api';

export default {
    uploadFile(payload) {
        return Api.post("/api/upload", payload);
    }
}