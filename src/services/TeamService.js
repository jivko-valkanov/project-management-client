import Api from './Api';

export default {
    getTeams(payload) {
        return Api.get("/api/teams", payload)
    },
    createTeam(payload) {
        return Api.post("/api/teams", payload);
    },
    getTeamDetails(id) {
        return Api.get("/api/team/"+id);
    }
};
