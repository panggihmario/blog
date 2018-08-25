<template>
    <v-layout row justify-center>
      <v-dialog v-model="statusDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
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
              <div class="red--text">{{msg}}</div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1"       v-on:click="login">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['statusDialog'],
  data () {
    return {
      valid: false,
      username:'',
      msg :'',
      check : false,
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
         rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 5 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      show1: false,
      loginstatus: false
    }
  },
  methods: {
    closeDialog () {
        this.$emit('close-dialog', this.statusDialog)
    },
    login () {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      })
      .then(data=>{
        let token = data.data.token
        let name = data.data.dataUser.name
        localStorage.setItem('token',token)
        localStorage.setItem('name',name)
        this.loginstatus = true
        this.$emit('status-login',this.loginstatus)
        this.$emit('data-user',data.data.dataUser.name)
        this.closeDialog()
      })
      .catch(err=>{
        this.msg = err.response.data.msg
      })
    }
  }
}
</script>

<style>

</style>
