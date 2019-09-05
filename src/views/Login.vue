<template>
  <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <Snackbar />
          <v-card class="elevation-2">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm">
                <v-text-field prepend-icon="person" name="email" 
                label="Email" type="email" autocomplete="off"
                id="email" required :rules="emailRules" 
                v-model=payload.email></v-text-field>

                <v-text-field prepend-icon="lock" name="password" 
                label="Password" type="password" autocomplete="off"
                id="password" required :rules="passwordRules" 
                v-model=payload.password></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" 
              v-on:click="doLogin" 
              >Login</v-btn>
              <v-btn color="primary" v-on:click="resetForm">Clear</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <Footer/>
      </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import Footer from '@/components/Footer';
import Snackbar from '@/components/Snackbar';

export default {
    name: "Login",
    components: {
      Footer,
      Snackbar
    },
    created() {
      document.title = "Login";
    },
    data() {
        return {
            payload: {
              email: "",
              password: ""
            },
            alert: {
              show:false,
              msg: ""
            },
            emailRules: [
              v => !!v || 'Email is required',
              v => /.+@.+/.test(v) || 'E-mail format is incorrect',
              v => (v && v.length <= 30) || 'Email is mandatory'
            ],
            passwordRules: [
              v => !!v || 'Password is required'
            ],
            valid: "false",
            show: false
        }
    },
    mounted() {
      window.addEventListener("keyup", this.enterKeyEvent);
    },
    destroyed() {
      window.removeEventListener("keyup", this.enterKeyEvent);
    },
    methods: {
      enterKeyEvent(event) {
        if (event.keyCode === 13) {
          this.doLogin();
        }
      },
      resetForm() {            
        this.$refs.loginForm.reset();
        this.payload.email = '',
        this.payload.password = '',
        this.alert.show = false,
        this.alert.msg = ''
      },
      async doLogin() {
        if(this.$refs.loginForm.validate()) {
          await AuthenticationService
          .login(this.payload)
          .then(response => {            
            let data = response.data;
            let token = data.token; 
            let test = token.split('.');
            let obj = JSON.parse(atob(test[1]));
            this.$store.dispatch('user/setToken', data.token);
            this.$store.dispatch('user/setUsername', obj.name);
            //redirect
            this.redirectTo({ path: 'home' });
          })
          .catch(error => {
              if(error && error.hasOwnProperty('response')) {
                if(error.response.status === 400) {
                  this.$store.dispatch("setSnackbarMessage","Invalid username or password");
                }

                if(error.response.status >= 500) {
                  this.$store.dispatch("setSnackbarMessage","Internal service error!");
                }
              } else {
                  this.$store.dispatch("setSnackbarMessage","Unknown error!");
              }
          });
        }
      },
      redirectTo(path) {
        this.$router.push(path);
      }
    }
}
</script>
