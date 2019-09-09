<template>
    <v-layout row justify-center>
    <v-dialog persistent v-model="dialogStatus" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Profile</span>
        </v-card-title>

        <!-- edit user form -->
        <v-form>
          <v-card-text>
            <!-- User login -->
            <v-text-field
              label="Login"
            ></v-text-field>
            <!-- user custom fields -->
            <v-text-field
              label="field1"
            ></v-text-field>
            <!-- <v-text-field
              v-for="field in customFields"
              :key="field.name"
              :label="field.label"
              v-model="field.value"
              :rules="customFieldRules(field)"
              :required="field.required"
              :disabled="!field.editable"
            ></v-text-field> -->
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="blue--text"
              flat
            >
              Restore
            </v-btn>
            <v-btn
              class="green--text"
              flat
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>

        <!-- edit password form -->
        <v-form>
          <v-card-text>
            <v-text-field
              label="Old Password"
              append-icon="visibility"
              counter
            ></v-text-field>
            <v-text-field
              label="New Password"
              append-icon="visibility_off"
              counter
            ></v-text-field>
            <v-text-field
              label="Repait password"
              append-icon="visibility"
              counter
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="blue--text"
              flat
            >
              Clear
            </v-btn>
            <v-btn
              class="green--text"
              flat
            >
              Change
            </v-btn>
          </v-card-actions>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="black--text"
            flat
            @click="closeDialog"
          >
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
    name:'profileDialog',
    data() {
        return {}
    },
    methods: {
        closeDialog() {
            this.$store.dispatch('closeProfileDialog');
        }
    },
    computed: {
        dialogStatus() {
            return this.$store.getters.getProfileDialog;
        }
    }
}
</script>