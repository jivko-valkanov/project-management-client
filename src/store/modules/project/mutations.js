export default {
    setDialogStatus(state, status) {
        state.dialogStatus = status;
    },
    setCurrentProjectTitle(state, title) {
        state.project.title = title;
    },
    setCurrentProjectDescription(state, description) {
        state.project.description = description;
    },
    setCurrentProjectDeadline(state, deadline) {
        state.project.deadline = deadline;
    },
    clearCurrentProjectData(state) {
        state.project.id = 0;
        state.project.title = null;
        state.project.description = null;
        state.project.deadline = new Date().toISOString().substr(0,10);
        state.project.statusId = 0;
    }
}