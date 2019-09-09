<template>
    <v-layout row justify-center>
        <v-dialog v-model="getTeamDialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-tooltip bottom>
                        <v-btn icon dark @click="onClose" slot="activator">
                        <v-icon>close</v-icon>
                        </v-btn>
                        <span>Close</span>
                    </v-tooltip>
                    <v-toolbar-title>Team</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="onSave" slot="activator">
                            Save <v-icon right dark>save</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    name:'teamDialog',
    methods: {
        onClose() {
            this.$store.dispatch('team/closeTeamDialog');
        },
        onSave() {
            console.log("click on save");
        }
    },
    computed: {
        getTeamDialogStatus() {
            return this.$store.getters['team/getTeamDialogStatus'];
        }
    }
}
</script>