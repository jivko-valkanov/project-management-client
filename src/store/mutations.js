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
    },
    openProfileDialog(state) {
        state.profileDialog = true;
    },
    closeProfileDialog(state) {
        state.profileDialog = false;
    },
    setProfileDetails(state, payload) {
        state.profileDetails = payload;
    },
    clearProfileDetails(state) {
        state.profileDetails = {};
    }
}