<template>
    <v-snackbar
      v-model="snackBarAppear"
      :multi-line="true"
      :top="true"
      :timeout="4000"
    >
      {{ snackbarMessage }}
      <v-btn
        color="red"
        text
        @click="onClose"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>

export default {
    name: "Snackbar",
    computed: {
        snackbarMessage: {
          get: function() {
            return this.$store.getters.getSnackbarMessage;
          },
          set: function() {}
        },
        snackBarAppear: {
            get: function() {
                return this.$store.getters.getSnackbarStatus;
            },
            set: function(newValue) {
                this.$store.dispatch("clearSnackbar", newValue);
            }
        }
    },
    methods: {
        onClose() {
            this.$store.dispatch("clearSnackbar", null);
        }
    }
}
</script>

<style scoped>

</style>
