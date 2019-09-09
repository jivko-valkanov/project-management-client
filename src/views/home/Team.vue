<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>

        <v-toolbar flat>
            <v-btn color="primary" dark :loading="loading" @click="fetchData"><v-icon left>refresh</v-icon> Refresh</v-btn>
            <v-btn color="primary" dark @click="openDialog"><v-icon left>group_add</v-icon> New Team</v-btn>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                :rows-per-page-items="rowsPerPage"
                :pagination.sync="pagination"
                :total-items="totalItems" 
                class="elevation-1">
            <template slot="items" slot-scope="items">
                <tr>
                    <td class="text-xs-center">{{ items.item.team_name }}</td>
                    <td class="text-xs-center">{{ items.item.is_active | activeStatus }}</td>
                    <td class="text-xs-center">{{ items.item.user_counter }}</td>
                    <td class="text-xs-center">{{ items.item.created_at }}</td>
                    <td class="text-xs-center">{{ items.item.updated_at }}</td>
                    <td class="text-xs-center">
                        <v-btn primary>
                            View
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import TeamService from '@/services/TeamService';

export default {
    name: "Dashboard",

    data() {
        return {
            header: "Team",
            loading:false,
            rowsPerPage:['5','10','15','25'],
            headers: [
                {
                    text: 'Team Name',
                    align: 'center',
                    sortable: true,
                    value: 'team_name'
                },
                {   text: 'Is Active', 
                    value: 'is_active',
                    align: 'center',
                    sortable: true
                },
                {   text: 'Users counter', 
                    value: 'user_counter',
                    align: 'center',
                    sortable: false
                },
                { 
                    text: 'Created at',
                    value: 'created_at',
                    align: 'center',
                    sortable: true
                },
                { 
                    text: 'Updated at', 
                    value: 'updated_at', 
                    align: 'center',
                    sortable: true 
                },
                { 
                    text: 'Action', 
                    value: 'action', 
                    align: 'center',
                    sortable: false,
                }
            ],
            items:[],
            totalItems:0,
            pagination: {
                descending: null,
                page: 1,
                rowsPerPage: '5',
                sortBy: null,
                totalItems: 0,
                visibleElements: 7
            },
        }
    },
    created() {
        document.title = "Team"
    },
    beforeMount() {
    },
    mounted() {
       
    },
    methods: {
        async fetchData() {
            this.loading = true;
            await TeamService.getTeams({ params: {
                sortBy: this.pagination.sortBy,
                descending: this.pagination.descending,
                page: this.pagination.page,
                rowsPerPage: this.pagination.rowsPerPage
            }})
            .then(response => {
                let data = response.data
                this.items = data.data;
                this.pagination.rowsPerPage = data.meta.per_page;
                this.pagination.totalItems = data.meta.total; 
                this.totalItems = data.meta.total;
            })
            .catch(error => {
                console.log(error.message)
            })
            .finally(() => {
                this.loading = false;
            });
        },
        edit(id) {
           console.log("edit", id);
        },
        openDialog() {
            this.$store.dispatch('team/openTeamDialog');
        }
    },
    watch: {
        pagination() {
            this.fetchData();
        }
    },
    filters: {
        activeStatus: function (value) {
            return value !== false ? "Yes": "No";
        }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>