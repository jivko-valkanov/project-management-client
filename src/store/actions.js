export default {
    setSnackbarStatus({commit}, payload) {
        commit("setSnackbarStatus", payload);
    },
    setSnackbarMessage({commit}, payload) {
        commit("setSnackbarMessage", payload);
    },
    clearSnackbar({commit}, payload) {
        commit("clearSnackbar", payload);
    },
    openProfileDialog({commit}) {
        commit("openProfileDialog");
    },
    closeProfileDialog({commit}) {
        commit("closeProfileDialog");
    }
}