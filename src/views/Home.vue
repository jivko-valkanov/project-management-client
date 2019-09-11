<template>
<div>
    <v-navigation-drawer app fixed clipped v-model="drawer">
        <v-list dense>
            <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
                router
                class="pl-4"
                >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

        <v-toolbar
          color="blue darken-3"
          dark
          app
          clipped-left
          fixed
        >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span>{{ title }}</span>
        </v-toolbar-title>

        <v-text-field
                flat
                solo-inverted
                hide-details
                clearable
                prepend-inner-icon="search"
                class="hidden-sm-and-down"
            ></v-text-field>

        <v-spacer></v-spacer>

        <v-badge overlap left>
            <span slot="badge">0</span>
            <v-tooltip bottom>
                <v-btn icon slot="activator">
                  <v-icon>notifications</v-icon>
                </v-btn>
                <span>Notifications</span>
            </v-tooltip>
        </v-badge>

        <v-menu offset-y>
            <v-btn icon slot="activator">
                <v-icon>account_circle</v-icon>
            </v-btn>

            <v-list>
                <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click="menuItemsClick(index)"
                >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
        
        <span>{{ getUsername }}</span>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height >
        <v-layout>
          <v-flex>
            <Snackbar/>
            <ProfileDialog />
            <TeamDialog />
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
            <BackToTop />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer/>
   </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import Footer from "@/components/Footer";
import Snackbar from "@/components/Snackbar";
import ProfileDialog from "@/components/ProfileDialog";
import TeamDialog from "@/components/TeamDialog";
import BackToTop from "@/components/BackTop";

export default {
  name: "Home",
  data() {
    return {
      title: process.env.VUE_APP_NAME,
      items: [{ title: "Profile" },{ title: "Logout" }],
      menuItems: [
        { title: "Dashboard", icon:"dashboard", link: {name: "home.dashboard"}},
        { title: "Projects", icon:"view_module", link: {name: "home.projects"}},
        { title: "Team", icon:"group", link: {name: "home.team"}},
        { title: "Users", icon:"people", link: {name: "home.users"}},
      ],
      drawer: true
    }
  },
  created() {
    document.title = "Home";
  },
  components: {
    Footer,
    Snackbar,
    ProfileDialog,
    TeamDialog,
    BackToTop
  },
  methods: {
    navigationTo(link) {
      this.$router.push(link)
    },
    menuItemsClick(index) {
      let option = this.items[index];

      if(option.title.toLowerCase() === "logout") {
          AuthenticationService
          .logout(null)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.message);
          })
          .then(() => {
            this.$store.dispatch('user/setToken', null);
            this.$store.dispatch('user/setUsername', null);
            //redirect
            this.$router.push({ path: '/'});
          });
          // .finally( function() {
          //   self.$store.dispatch('setToken', null);
          //   self.$store.dispatch('setUsername', null);
          //   self.$store.dispatch('setIsLogin', false);
          //   //redirect
          //   self.$router.push({ path: '/'});
          // });
      }
      else if(option.title.toLowerCase() === "profile") {
        this.$store.dispatch("openProfileDialog");
      }
    },
  },
  computed: {
    getUsername() {
      return this.$store.getters['user/getUsername'];
    }
  }
};
</script>

<style scoped>
</style>