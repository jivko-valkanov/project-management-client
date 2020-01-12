export default {
    openDialog({commit}) {
        commit('setDialogStatus', true);
    },
    closeDialog({commit}) {
        commit('setDialogStatus', false);
    },
    setProjectTitle({commit}, payload) {
        commit('setCurrentProjectTitle', payload);
    },
    setProjectDescription({commit}, payload) {
        commit('setCurrentProjectDescription', payload);
    },
    setProjectDeadline({commit}, payload) {
        commit('setCurrentProjectDeadline', payload);
    },
    cleanCurrentProjectData({commit}) {
        commit('clearCurrentProjectData');
    }
}