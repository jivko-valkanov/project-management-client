export default {
    setUsername({commit}, payload) {
        commit("setUsername", payload);
    },
    setToken({commit}, payload) {
        commit("setToken", payload);
    }
}