import UserService from '@/services/UserService';

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
    async openProfileDialog({commit}) {

        await UserService.getSelfDetails()
          .then(response => {
            commit("setProfileDetails",response.data);
            commit("openProfileDialog");
          })
          .catch(error => {
              console.log(error);
              //commit error - TODO
          }).finally(() => {
            commit("openProfileDialog");
          });
    },
    closeProfileDialog({commit}) {
        commit("clearProfileDetails");
        commit("closeProfileDialog");
    },
    changePassword({commit},payload) {
        return new Promise((resolve, reject) => {
            UserService.updateUserDetails(payload)
            .then(response => {
                resolve(response);
                commit("setSnackbarMessage", "Password has been updated.");
            })
            .catch(error => {
                reject(error);
                commit("setSnackbarMessage", error.response.data.error);
            });
        });
    }
}