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
                <!-- container -->
                <div grid-list-md text-xs-center>
                    <v-layout row wrap>
                        <v-flex xs12 lg5 pa-3>
                            <v-card>
                                <v-card-text class="primary white--text">
                                    <h4 style="text-transform:uppercase;">{{ title }}</h4>
                                </v-card-text>
                                <v-card-text class="details-container">
                                <v-layout row wrap>
                                   
                                </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 lg7 pa-3>
                            <v-card class="children-tabs">
                            <v-tabs color="primary" dark slider-color="primary">
                                <slot></slot>
                            </v-tabs>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    name:'teamDialog',
    data() {
        return {
            title: "basic information"
        }
    },
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