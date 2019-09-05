<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
        <v-divider></v-divider>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-form ref="createNewUser">
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <ValidatetionErrors :errors="errors"></ValidatetionErrors>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                @input="clearErrors"
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
                                @input="clearErrors"
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
                                @input="clearErrors"
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
                                @input="clearErrors"
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
                                @input="clearErrors"
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
                                    type="button"><v-icon left>save</v-icon>Create User</v-btn>
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
import ValidatetionErrors from '@/components/ValidationErrors';

export default {
    components:{
        ValidatetionErrors
    },
    beforeMount() {
        this.fetchRoles();
    },
    data() {
        return {
            header: "Create a new user",
            items:[],
            errors:{},
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
        async createUser() {
            if(this.$refs.createNewUser.validate()) {
                await UserService
                .createUser(this.payload)
                .then(response => {
                    if(response.status === 201) {
                        this.resetForm();
                        this.$store.dispatch("setSnackbarMessage", "The user has been saved.");
                    }
                }).catch(error => {
                    console.log(error);
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                }).finally(() => {
                    //TODO
                });
            }
        },
        resetForm() {
            this.$refs.createNewUser.reset();
            this.payload.username=''
            this.payload.email='';
            this.payload.password='';
            this.payload.confirmPassword='';
            this.payload.role='';
        },
        clearErrors() {
            if(Object.keys(this.errors).length > 0) {
                this.errors = {};
            }
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