<template>
     <v-layout row justify-center>
        <v-dialog v-model="getDialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-tooltip bottom>
                        <v-btn icon dark @click="onClose()" slot="activator">
                        <v-icon>close</v-icon>
                        </v-btn>
                        <span>Close</span>
                    </v-tooltip>
                    <v-toolbar-title>Project</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn flat @click="onRefresh()">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <v-btn dark flat @click="onSave()" slot="activator">
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
                        <!-- <v-flex xs12 lg7 pa-3>
                            <v-card class="children-tabs">
                            <v-tabs color="primary" dark slider-color="primary">
                                <slot>{{ history }}</slot>
                            </v-tabs>
                            </v-card>
                        </v-flex> -->
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    name:'ProjectDialog',
    data() {
        return {
            title: "basic information",
            history: "history"
        }
    },
    methods: {
        onSave() {
            this.$store.dispatch('project/closeDialog');
        },
        onClose() {
            this.$store.dispatch('project/closeDialog');
        },
        onRefresh() {
            //TODO
        }
    },
    computed: {
        getDialogStatus() {
            return this.$store.getters['project/getDialogStatus'];
        }
    }
}
</script>