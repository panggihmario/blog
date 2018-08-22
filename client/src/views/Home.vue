<template>
  <div id="app">
    <Navbar v-on:navbar="login" v-on:register="register" v-on:dialog-article="articleDialog"></Navbar>
    <Login v-bind:statusDialog="statusDialog" v-on:close-dialog="close"></Login>
    <Register v-bind:statusDialogRegist="statusDialogRegist" v-on:close-dialogRegist="closeRegist"></Register>
    <Article v-bind:statusDialogArticle="statusDialogArticle" v-on:close-dialogArticle="closeArticle"></Article>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <Sidebar v-on:id-article="getId" v-on:reverse-status="reverse"></Sidebar>
        </v-flex>
        <v-flex xs8 v-if="statusBarNow">
          <Mainbar v-bind:article="article" v-on:dialog-edit="editDialog" v-on:obj-article="editArticle" ></Mainbar>
        </v-flex>
        <v-flex xs8 v-else>
          <Carousel></Carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <Edit v-bind:statusDialogEdit="statusDialogEdit" v-on:close-dialogEdit="closeEdit" v-bind:dataEdit="dataEdit"></Edit>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Article from '@/components/AddArticle.vue'
import Sidebar from '@/components/Sidebar.vue'
import Mainbar from '@/components/Mainbar.vue'
import Edit from '@/components/Edit.vue'
import Carousel from '@/components/Carousel.vue'
export default {
  data () {
    return {
      statusDialog: '',
      statusDialogRegist: '',
      statusDialogArticle: '',
      statusDialogEdit: '',
      article: '',
      dataEdit: {},
      statusBarNow: ''
    }
  },
  components: {
    Navbar, Login, Register, Article, Sidebar, Mainbar, Edit, Carousel
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
    },
    editDialog(status){
      this.statusDialogEdit = status
    },
    closeEdit () {
      this.statusDialogEdit = false
    },
    editArticle (obj) {
      this.dataEdit = obj
    },
    reverse (status) {
      this.statusBarNow = status
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
