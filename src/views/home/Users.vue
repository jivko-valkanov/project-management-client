<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>
        <v-toolbar flat>
            <v-btn color="primary" dark @click="fetchData" :loading="loading"><v-icon left>refresh</v-icon> Refresh</v-btn>
            <v-btn color="primary" dark @click="createNewUser"><v-icon left>person_add</v-icon> New User</v-btn>
        </v-toolbar>
        <!-- <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            :rows-per-page-items="itemsPerPageArray"
            :total-items="pagination.totalItems" 
            :pagination.sync="pagination"
            hide-actions
            class="elevation-1"
        >

            <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.username }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.role_name }}</td>
                <td class="text-xs-center">{{ props.item.is_active }}</td>
                <td class="text-xs-center">{{ props.item.created_at }}</td>
                <td class="text-xs-center">{{ props.item.updated_at }}</td>
                <td class="text-xs-center">
                    <v-btn primary :to="{name:'home.updateUser', params: { id: props.item.id }}">
                        View
                    </v-btn>
                </td>
            </template>

        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination 
                v-model="pagination.page" 
                :length="pages" 
                :total-visible="7" 
                @input="next"></v-pagination>

                <div class="flex-grow-1"></div>

                <span
                    class="mr-4">
                    Page {{ pagination.page }} of {{ pagination.totalItems }}
                </span>

                <div class="flex-grow-1"></div>

                <span
                    class="mr-4">
                    <v-select
                        @change="fetchData"
                        v-model="pagination.rowsPerPage"
                        :items="itemsPerPageArray"
                        single-line
                    >
                    </v-select>
                </span>
        </div> -->
        <Datatable
            :headers="headers"
            :items="users"
            :pagination="pagination"
            :loading="loading"
            @change="fetchData"
        >
            <template slot="items" slot-scope="items">
                <tr>
                    <td class="text-xs-center">{{ items.item.username }}</td>
                    <td class="text-xs-center">{{ items.item.email }}</td>
                    <td class="text-xs-center">{{ items.item.role_name }}</td>
                    <td class="text-xs-center">{{ items.item.is_active }}</td>
                    <td class="text-xs-center">{{ items.item.created_at }}</td>
                    <td class="text-xs-center">{{ items.item.updated_at }}</td>
                    <td class="text-xs-center">
                        <v-btn primary :to="{name:'home.updateUser', params: { id: items.item.id }}">
                            View
                        </v-btn>
                    </td>
                </tr>
            </template>
        </Datatable>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
import Datatable from '@/components/Datatable';

export default {
    name: "Users",
    components: {
        Datatable
    },
    data() {
        return {
            header: "Users",
            isLoading: true,
            headers: [
                {
                    text: 'Username',
                    align: 'center',
                    sortable: true,
                    value: 'name'
                },
                {   text: 'Email', 
                    value: 'email',
                    align: 'center',
                    sortable: true
                },
                {   text: 'Role', 
                    value: 'role_name',
                    align: 'center',
                    sortable: false
                },
                {   text: 'Is Active', 
                    value: 'is_active',
                    align: 'center',
                    sortable: true
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
            users:[],
            pagination: {
                descending: null,
                page: 1,
                rowsPerPage: '5',
                sortBy: null,
                totalItems: 0,
                visibleElements: 7
            },
            loading: false,
        }
    },
    created() {
        document.title = "Users"
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
        async fetchData(pagination) {
            this.loading = true;
            await UserService.getUsers({ params: {
                sortBy: pagination.sortBy,
                descending: pagination.descending,
                page: pagination.page,
                rowsPerPage: pagination.rowsPerPage
            }})
            .then(response => {
                let data = response.data
                this.users = data.data;
                this.pagination.rowsPerPage = data.meta.per_page;
                this.pagination.totalItems = data.meta.total; 
            })
            .catch(error => {
                console.log(error.message)
            })
            .finally(() => {
                this.loading = false;
            });
        },
        createNewUser() {
            this.$router.push({name:'home.newUser'});
        }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>