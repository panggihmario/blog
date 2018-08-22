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
                label="Password"
                required
              ></v-text-field>
              <div class="red--text">{{msg}}</div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1"      @click.native="closeDialog" v-on:click="login">Save</v-btn>
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
      msg :'',
      check : false,
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
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
        console.log(data)
        this.check = true
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
