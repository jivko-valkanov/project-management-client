export default {
    getSnackbarStatus(state) {
        return state.snackbarAppear;
    },
    getSnackbarMessage(state) {
        return state.snackbarMessage;
    }
}