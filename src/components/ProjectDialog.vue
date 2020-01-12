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
                        <v-flex xs12 lg6 pa-3>
                            <v-card>
                                <v-card-text class="primary white--text">
                                    <h4 style="text-transform:uppercase;">{{ basicInfo }}</h4>
                                </v-card-text>
                                <v-card-text class="details-container">
                                    <v-layout column>
                                        <v-flex>
                                            <v-text-field
                                            label="Title"
                                            prepend-icon="title" 
                                            v-model="title"
                                            :readonly="isEditData"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex>
                                            <v-textarea
                                            label="Description"
                                            prepend-icon="description"
                                            v-model="description"
                                            :readonly="isEditData"
                                            ></v-textarea>
                                        </v-flex>
                                        <v-flex>
                                            <v-menu
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="deadline"
                                                        label="Deadline"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="deadline" @input="menu = false"></v-date-picker>
                                            </v-menu> 
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 lg6 pa-3>
                            <v-card>
                                <v-card-text class="primary white--text">
                                        <h4 style="text-transform:uppercase;">{{ history }}</h4>
                                    </v-card-text>
                                    <v-card-text class="details-container">
                                    <v-layout column>
                                        
                                    </v-layout>
                                </v-card-text>
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
    name:'ProjectDialog',
    data() {
        return {
            basicInfo: "basic information",
            history: "history",
            menu: false,
        }
    },
    created() {
        console.log("onCreated");
    },
    mounted() {
        console.log("onMounted");
    },
    destroyed() {
        console.log("onDestroyed");
    },
    methods: {
        onSave() {
            this.$store.dispatch('project/closeDialog');
        },
        onClose() {
            this.$store.dispatch('project/cleanCurrentProjectData');
            this.$store.dispatch('project/closeDialog');
        },
        onRefresh() {
            //TODO
        },
    },
    computed: {
        getDialogStatus() {
            return this.$store.getters['project/getDialogStatus'];
        },
        title: {
            get() {
                return this.$store.getters['project/getCurrentProjectTitle'];
            },
            set(value) {
                this.$store.dispatch('project/setProjectTitle', value);
            }
        },
        description: {
            get() {
                return this.$store.getters['project/getCurrentProjectDescription'];
            },
            set(value) {
                this.$store.dispatch('project/setProjectDescription', value);
            }
        },
        deadline: {
            get() {
                return this.$store.getters['project/getCurrentProjectDeadline'];
            },
            set(value) {
                this.$store.dispatch('project/setProjectDeadline', value);
            }
        },
        isEditData() {
            return this.$store.getters['project/getCurrentProjectId'] > 0 ? true : false;
        }
    }
}
</script>