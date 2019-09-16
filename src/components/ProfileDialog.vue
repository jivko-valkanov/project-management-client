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
            <!-- Username field -->
            <v-text-field
              label="Username"
              v-model="profileDetails.name"
              :disabled=disabled
            ></v-text-field>
            <!-- Email field -->
            <v-text-field
              label="Email"
              v-model="profileDetails.email"
              :disabled=disabled
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
          <!-- <v-card-actions>
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
          </v-card-actions> -->
        </v-form>

        <!-- edit password form -->
        <v-form ref="passwordForm">
          <v-card-text>
            <v-text-field
              label="Old Password"
              :append-icon="pass1 ? 'visibility_off' : 'visibility'"
              v-model="password.old"
              @click:append="() => (pass1 = !pass1)" :type="pass1 ? 'password' : 'text'"
              :rules="passwordRules.old"
              counter
            ></v-text-field>
            <v-text-field
              label="New Password"
              v-model="password.new"
              :append-icon="pass2 ? 'visibility_off' : 'visibility'"
              @click:append="() => (pass2 = !pass2)" :type="pass2 ? 'password' : 'text'"
              :rules="passwordRules.new"
              counter
            ></v-text-field>
            <v-text-field
              label="Repait password"
              v-model="password.repeat"
              :append-icon="pass3 ? 'visibility_off' : 'visibility'"
              @click:append="() => (pass3 = !pass3)" :type="pass3 ? 'password' : 'text'"
              :rules="passwordRules.repeat"
              counter
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="blue--text"
              flat
              @click="onClear()"
            >
              Clear
            </v-btn>
            <v-btn
              class="green--text"
              flat
              @click="onChange()"
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
        return {
          disabled: true,
          profile:{},
          pass1: true,
          pass2: true,
          pass3: true,
          password: {
            old: '',
            new: '',
            repeat: ''
          },
          alphanumericRegex: /^[a-zA-Z0-9]+$/,
        }
    },
    methods: {
        closeDialog() {
            this.$store.dispatch('closeProfileDialog');
        },
        onClear() {
          this.password.old = ''
          this.password.new = ''
          this.password.repeat = ''
          this.$refs.passwordForm.reset();
        },
        async onChange() {
          if(this.$refs.passwordForm.validate()) {
            await this.$store.dispatch('changePassword',{id:this.profileDetails.id, password:this.password})
            .then(() => {
              this.onClear();
            }).catch(() => {
              this.onClear();
            });
          }
        }
    },
    computed: {
        dialogStatus() {
          return this.$store.getters.getProfileDialog;
        },
        profileDetails() {
          return this.$store.getters.getProfileDetails;
        },
        passwordRules () {
          const regex = this.alphanumericRegex;

          return {
              old: [
                v => !!v || 'Required'
              ],
              new: [
                v => !!v || 'Required',
                v => regex.test(v) || 'Password is incorect',
                // v => v.length <= max || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
                // v => v.length >= min || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
                v => v !== this.password.old || 'New password must be different from the old password'
              ],
              repeat: [
                v => !!v || 'Required',
                v => regex.test(v) || 'Password is incorect',
                // v => v.length <= max || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
                // v => v.length >= min || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
                v => v === this.password.new || "Old and new password can't be different"
              ]
          }
        }
    }
}
</script>