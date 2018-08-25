<template>
  <div id="app">
    <main style="background-colour:red">
    <Navbar 
      v-on:navbar="login" 
      v-on:register="register" 
      v-on:dialog-article="articleDialog"
      v-bind:statusLogin="statusLogin"
      v-on:status-logout="checkLogout"
      v-bind:username="username"
      v-on:check="checkLogout"
      v-on:outname="resetName">
    </Navbar>
    <Login 
      v-bind:statusDialog="statusDialog"
      v-on:status-login="checkLogin"
      v-on:close-dialog="close"
      v-on:data-user="dataUser">
    </Login>
    <Register 
      v-bind:statusDialogRegist="statusDialogRegist" 
      v-on:close-dialogRegist="closeRegist">
    </Register>
    <Article 
      v-bind:statusDialogArticle="statusDialogArticle" 
      v-on:close-dialogArticle="closeArticle" 
      v-bind:articles="articles" 
      v-on:data-add="dataAdd">
    </Article>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <Sidebar 
            v-on:id-article="getId"
            v-on:reverse-status="reverse"
            v-on:all-article="allArticle"
            v-bind:articles="articles">
            </Sidebar>
        </v-flex>
        <v-flex xs8 v-if="statusBarNow">
          <Mainbar
            v-bind:article="article"
            v-on:dialog-edit="editDialog"
            v-on:obj-article="editArticle">
          </Mainbar>
        </v-flex>
        <v-flex xs8 v-else>
          <Carousel></Carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <Edit 
      v-bind:statusDialogEdit="statusDialogEdit"
      v-on:close-dialogEdit="closeEdit"
      v-bind:dataEdit="dataEdit">
    </Edit>
  </main>
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
      statusLogin: '',
      statusDialogRegist: '',
      statusDialogArticle: '',
      statusDialogEdit: '',
      article: '',
      dataEdit: {},
      statusBarNow: '',
      allData: {},
      articles: [],
      username:''
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
    },
    dataAdd(data){
      this.articles.push(data.data)
    },
    allArticle(){
      axios.get('http://localhost:3000/article/allArticle')
      .then(allData=>{
        console.log(allData.data[0].user)
          this.articles = allData.data
      })
      .catch(err=>{
        console.log(err);
      })
    },
    checkLogin(status){
      this.statusLogin = status
    },
    checkLogout(){
      this.statusLogin = false
    },
    dataUser(value){
      this.username = value
    },
    resetName(){
      this.username = ''
    }
  },
  mounted () {
    this.login()
    this.register()
    this.closeArticle()
    this.getId()
    this.allArticle()
    this.dataAdd()
    this.dataUser()
  },
  watch:{
    articles(newValue, oldValue){
      console.log("ini watch articles=====>",newValue[0].title);
      console.log(oldValue);
    }
  }
}
</script>
