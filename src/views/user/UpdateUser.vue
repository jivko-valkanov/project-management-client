<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-form ref="updateUser">
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="username"
                                label="Username"
                                id="username"
                                type="text"
                                :rules="usernameRules"
                                v-model="payload.username"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="email"
                                label="Email"
                                id="email"
                                type="email"
                                :rules="emailRules"
                                v-model="payload.email"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="password"
                                label="Password"
                                id="password"
                                type="password"
                                v-model="payload.password"
                                :rules="passwordRules"
                                counter
                                clearable
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="confirmPassword"
                                label="Confirm password"
                                id="confirmPassword"
                                type="password"
                                v-model="payload.confirmPassword"
                                :rules="[passwordConfirmationRule]"
                                counter
                                clearable
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-select
                                :items="items"
                                label="Role"
                                name="role"
                                append-icon="arrow_drop_down"
                                single-line
                                item-text="role_name"
                                item-value="id"
                                v-model="payload.role"
                                :rules="[(v) => !!v || 'Role is required']"
                                required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-btn
                                @click="goBack()"
                                class="primary"
                                type="button"><v-icon left>arrow_back</v-icon>Back</v-btn>
                                <v-btn
                                    @click="createUser()"
                                    class="primary"
                                    type="button"><v-icon left>save</v-icon>Update</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
import RoleService from '@/services/RoleService';

export default {
    beforeMount() {
        this.fetchRoles();
        this.getUserDetails();
    },
    data() {
        return {
            header: "Update user",
            items:[],
            payload: {
                username:'',
                email:'',
                password:'',
                confirmPassword:'',
                role:''
            },
            usernameRules: [
                v => !!v || 'Username is required',
                v => (v && v.length >= 3) || 'Username must be minimum 3 characters!'
            ],
            emailRules: [
              v => !!v || 'Email is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
              v => (v && v.length <= 30) || 'Email is mandatory!'
            ],
            passwordRules: [
              v => !!v || 'Password is required'
            ]
        }
    },
    methods:{
        goBack() {
            this.$router.push({name:'home.users'});
        },
        async fetchRoles() {
            await RoleService.getRoles(null)
            .then(response => {
                let data = response.data
                this.items = data.data;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {

            });
        },
        async getUserDetails() {
            await UserService
            .getUserDetails(this.$route.params.id)
            .then(response => {})
            .catch(error => {console.log(error);})
            .finally(() => {});
        },
        // async createUser() {
        //     if(this.$refs.createNewUser.validate()) {
        //         await UserService
        //         .createUser(this.payload)
        //         .then(response => {
        //             if(response.status === 200) {
        //                 this.resetForm();
        //             }
        //             else if(response.status === 422) {
        //                 //TODO
        //                 console.log(response.data);
        //             }
        //         }).catch(error => {
        //             let data = error.response.data;
        //             console.log(data.message);
        //             console.log(data.errors.email);
        //             console.log(data.errors.password);
        //         }).finally(() => {
        //             console.log("finally");
        //         });
        //     }
        // },
        resetForm() {
            this.$refs.updateUser.reset();
            this.payload.username=''
            this.payload.email='';
            this.payload.password='';
            this.payload.confirmPassword='';
            this.payload.role='';
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () => (this.payload.password === this.payload.confirmPassword) || 'Passwords must match'
        },
    }
}
</script>

<style scoped>
    .v-subheader {
        font-size: 28px;
    }
</style>