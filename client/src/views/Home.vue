<template>
  <div id="app">
    <Navbar v-on:navbar="login" v-on:register="register" v-on:dialog-article="articleDialog"></Navbar>
    <Login v-bind:statusDialog="statusDialog" v-on:close-dialog="close"></Login>
    <Register v-bind:statusDialogRegist="statusDialogRegist" v-on:close-dialogRegist="closeRegist"></Register>
    <Article v-bind:statusDialogArticle="statusDialogArticle" v-on:close-dialogArticle="closeArticle"></Article>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <Sidebar v-on:id-article="getId"></Sidebar>
        </v-flex>
        <v-flex xs8>
          <Mainbar v-bind:article="article"></Mainbar>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Article from '@/components/AddArticle.vue'
import Sidebar from '@/components/Sidebar.vue'
import Mainbar from '@/components/Mainbar.vue'
export default {
  data () {
    return {
      statusDialog: '',
      statusDialogRegist: '',
      statusDialogArticle: '',
      article: ''
    }
  },
  components: {
    Navbar, Login, Register, Article, Sidebar, Mainbar
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
    },
    articleDialog (status) {
      this.statusDialogArticle = status
    },
    closeArticle () {
      this.statusDialogArticle = false
    },
    getId(idArticle){
      this.article =  idArticle
    }
  },
  mounted () {
    this.login()
    this.register()
    this.closeArticle()
    this.getId()
  }
}
</script>
