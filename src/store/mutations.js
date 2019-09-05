export default {
    setSnackbarStatus(state, status) {
        state.snackbarAppear = status;
    },
    setSnackbarMessage(state, message) {
        state.snackbarMessage = message;
        state.snackbarAppear = true;
    },
    clearSnackbar(state) {
        state.snackbarMessage = null
        state.snackbarAppear = false;
    }
}