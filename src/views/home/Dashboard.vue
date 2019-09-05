<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>
        <v-layout>
            <v-flex xs12 md12>
                <v-container
                fluid
                grid-list-md
                >
                <v-layout wrap>
                    <v-flex
                    v-for="card in cards"
                    :key="card.title"
                    v-bind="{ [`xs${card.flex}`]: true }"
                    >
                    <v-card 
                        :color="`${card.color}`"
                    >
                        <v-container
                            fill-height
                            fluid
                            pa-2
                        >
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text" v-text="card.title"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container
                            fill-height
                            fluid
                            pa-2
                        >
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text" v-text="card.value"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-btn class="ma-2" outlined >Action</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

export default {
    name: "Dashboard",

    data() {
        return {
            header: "Dashboard",
            headers:[
                 {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            cards: [
                { title: 'All projects', color:"#63C2DE", value: 1000, flex: 3 },
                { title: 'New projects', color:"#20A8D8", value: 1000, flex: 3 },
                { title: 'Completed projects', color:"#008000", value: 1000, flex: 3 },
                { title: 'Overdue projects', color:"#F86C6B", value: 1000, flex: 3 },
                { title: 'Users', color:"#20A8D8", value: 1000, flex: 3 },
                { title: 'Teams', color:"#FFC107", value: 1000, flex: 3 },
            ]
        }
    },
    created() {
        document.title = "Dashboard"
    },
    beforeMount() {   
    },
    mounted() {
       
    },
    methods: {
       edit(id) {
           console.log("edit", id);
       }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>