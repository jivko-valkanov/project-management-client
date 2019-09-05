<template>
  <div id="app">
    <v-app>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
