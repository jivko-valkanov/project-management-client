export default {
    getDialogStatus(state) {
        return state.dialogStatus;
    },
    getCurrentProjectData(state) {
        return state.project;
    },
    getCurrentProjectId(state) {
        return state.project.id;
    },
    getCurrentProjectTitle(state) {
        return state.project.title;
    },
    getCurrentProjectDescription(state) {
        return state.project.description;
    },
    getCurrentProjectDeadline(state) {
        return state.project.deadline;
    },
    getCurrentProjectStatusId(state) {
        return state.project.statusId;
    }
}