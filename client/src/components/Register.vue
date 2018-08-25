<template>
    <v-layout row justify-center>
      <v-dialog v-model="statusDialogRegist" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 5 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
            </v-form>
            <div v-if="!checkRegist" class="red--text">
              {{errmsg}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1"       v-on:click="register">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['statusDialogRegist'],
  data () {
    return {
      valid: false,
      checkRegist: false,
      errmsg: '',
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 5 characters',
      },
      show1: false,
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close-dialogRegist', this.statusDialogRegist)
    },
    register(){
      axios.post('http://localhost:3000/users/register',{
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(data=>{
        // this.checkRegist = true
        this.closeDialog()
      })
      .catch(err=>{
        this.errmsg = err.response.data.msg
        console.log(err.response)
      })
    }
  
  }
}
</script>

<style>

</style>
