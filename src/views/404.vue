<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <div>
                <h1 class="display-3">You are lost.</h1>
                <h4 class="display-1">This page doesn't exist.</h4>
                <v-btn class="ma-2" tile color="primary" v-on:click="goBack">Go back</v-btn>
            </div>
        </v-layout>
        <Footer/>
    </v-container>
</template>
<script>
import Footer from '@/components/Footer'

export default {
  name: 'NotFound',
  created() {
      document.title = "404 Not Found";
  },
  components: {
      Footer
  },
  methods:{
      goBack() {
          this.$router.go(-1);
      }
  }
}
</script>
