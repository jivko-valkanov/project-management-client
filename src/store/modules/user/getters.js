export default {
    getUsername(state) {
        return state.username;
    },
    getToken(state) {
        return state.token;
    },
    checkIsLogin(state) {
        return (state.token !=='' && state.token !== null) ? true : false; 
    }
}