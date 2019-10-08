<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>

        <v-toolbar flat>
            <v-btn color="primary" dark :loading="loading" @click="fetchData()"><v-icon left>refresh</v-icon> Refresh</v-btn>
            <v-btn color="primary" dark @click="openProjectDialog"><v-icon left>create_new_folder</v-icon> New Project</v-btn>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                class="elevation-1"
            >

                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.owner }}</td>
                    <td>{{ props.item.status.name }}</td>
                </template>

            </v-data-table>
    </div>
</template>

<script>
import ProjectService from '@/services/ProjectService';

export default {
    name: "Dashboard",

    data() {
        return {
            header: "Projects",
            loading:false,
            items:[],
            headers:[
                {
                    text: 'ID',
                    align: 'left',
                    sortable: true,
                    value: 'id'
                },
                { text: 'Title', align: 'left', sortable: true, value: 'title' },
                { text: 'Owner', align: 'left', sortable: true, value: 'owner' },
                { text: 'Status', align: 'left', sortable: true, value: 'name' }
            ]
        }
    },
    created() {
        document.title = "Projects"
    },
    beforeMount() {
        this.fetchData();
    },
    mounted() {
       
    },
    methods: {
       async fetchData() {
           this.loading = true;
           await ProjectService
           .getProjects()
           .then(response => {
               this.items = response.data.data;
           }).catch(err => {
               console.log(err);
           }).finally(() => {
               this.loading = false;
           });
       },
       openProjectDialog() {
           this.$store.dispatch('project/openDialog');
       }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>