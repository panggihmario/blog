<template>
  <div id="app">
    <Navbar v-on:navbar="login" v-on:register="register"></Navbar>
    <Login v-bind:statusDialog="statusDialog" v-on:close-dialog="close"></Login>
    <Register v-bind:statusDialogRegist="statusDialogRegist" v-on:close-dialogRegist="closeRegist"></Register>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
export default {
  data () {
    return {
      statusDialog: '',
      statusDialogRegist: ''
    }
  },
  components: {
    Navbar, Login, Register
  },
  methods: {
    login (status) {
      this.statusDialog = status
    },
    close () {
      this.statusDialog = false
    },
    register (status) {
      this.statusDialogRegist = status
    },
    closeRegist () {
      this.statusDialogRegist = false
    }
  },
  mounted () {
    this.login()
    this.register()
  }
}
</script>
