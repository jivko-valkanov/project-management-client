export default {
    openDialog({commit}) {
        commit('setDialogStatus', true);
    },
    closeDialog({commit}) {
        commit('setDialogStatus', false);
    }
}