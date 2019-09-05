<template>
    <v-footer class="pa-3" color="primary" app>
        <span class="white--text"> eDatachase Ltd. &copy; 2019</span>
        <v-spacer></v-spacer>           
        <span class="white--text">Version {{version}}</span>
    </v-footer> 
</template>

<script>
export default {
    name: "Footer",
    // props: {
    //     version: {
    //         type: String,
    //         default: "1.0.0"
    //     }
    // },
    data() {
        return {
            version: process.env.VUE_APP_VERSION
        }
    }
}
</script>

<style scoped>

</style>
