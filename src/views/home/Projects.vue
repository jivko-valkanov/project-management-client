<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>

        <v-toolbar flat>
            <v-btn color="primary" dark :loading="loading"><v-icon left>refresh</v-icon> Refresh</v-btn>
            <v-btn color="primary" dark><v-icon left>create_new_folder</v-icon> New Project</v-btn>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="[]"            
                class="elevation-1"
            >

                <!-- <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template> -->

            </v-data-table>
    </div>
</template>

<script>

export default {
    name: "Dashboard",

    data() {
        return {           
            header: "Projects",
            loading:false,
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
            ]
        }
    },
    created() {
        document.title = "Projects"
    },
    beforeMount() {   
    },
    mounted() {
       
    },
    methods: {
       edit(id) {
           //TODO
           console.log("edit", id);
       },
       createDialog() {
           
       }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>