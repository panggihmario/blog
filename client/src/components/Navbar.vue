<template>
    <v-toolbar class="orange lighten-1">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
       <v-toolbar-title v-if="statusLogin"><i class="fas fa-user"></i>  {{username}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="statusLogin"  class="hidden-sm-and-down">
        <v-btn flat v-on:click="passDialogArticle">Add Article</v-btn>
        <v-btn flat v-on:click="logout">Logout</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn flat v-on:click="passDialog">Logins</v-btn>
        <v-btn flat v-on:click="passDialogRegist">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  props:["statusLogin","username"],
  data () {
    return {
      dialog: false,
      dialogRegist: false,
      dialogArticle: false,
      user:'',
      checkStatus : false
    }
  },
  methods: {
    passDialog () {
      this.dialog = true
      this.$emit('navbar', this.dialog)
    },
    passDialogRegist () {
      this.dialogRegist = true
      this.$emit('register', this.dialogRegist)
    },
    passDialogArticle () {
      this.dialogArticle = true
      this.$emit('dialog-article', this.dialogArticle)
    },
    logout(){
       localStorage.clear()
      //  this.statusLogin = false
        this.$emit('check',this.statusLogin)
        this.$emit('outname',this.username)
      //  this.username=''
    },
    checkAll(){
      let token = localStorage.getItem('token')
      if(token){
        if(this.statusLogin){
          this.checkStatus = true
        }
      }
    }
  },
  watch:{
    user(val){
      console.log(val);
      
    }
  },
  created (){
    this.checkAll()
  }

}
</script>

<style>

</style>
