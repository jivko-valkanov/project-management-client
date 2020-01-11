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
                                            v-model="localTitle"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex>
                                            <v-textarea
                                            label="Description"
                                            prepend-icon="description"
                                            v-model="localDescription"
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
                                                        v-model="localDeadline"
                                                        label="Deadline"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="localDeadline" @input="menu = false"></v-date-picker>
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
    props:{
        title:{
            type:String,
            default:null
        },
        description: {
            type:String,
            default:null
        },
        deadline:{
            type:String,
            default: function() {
                return new Date().toISOString().substr(0, 10);
            }
        }
    },
    data() {
        return {
            basicInfo: "basic information",
            history: "history",
            menu: false,
            localTitle:this.title,
            localDescription:this.description,
            localDeadline:this.deadline
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
            this.clearData();
            this.$store.dispatch('project/closeDialog');
        },
        onRefresh() {
            //TODO
        },
        clearData() {
            this.localTitle = null;
            this.localDescription = null;
            this.localDeadline = new Date().toISOString().substr(0, 10);
        }
    },
    computed: {
        getDialogStatus() {
            return this.$store.getters['project/getDialogStatus'];
        }
    }
}
</script>