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
      v-on:data-login="SignIn">
    </Login>
    <Register 
      v-bind:statusDialogRegist="statusDialogRegist" 
      v-on:close-dialogRegist="closeRegist">
    </Register>
    <Article 
      v-bind:statusDialogArticle="statusDialogArticle" 
      v-on:close-dialogArticle="closeArticle" 
      v-bind:articles="articles" 
      v-on:item-add="addArticle"
      v-on:url="getUrl">
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
            v-on:obj-article="editArticle"
            v-on:id-delete="deleteArticle"
            v-on:comment="addComment"
            v-on:del-comment="deleteComment"
            v-bind:owner="owner"
            v-bind:statusLogin="statusLogin"
            v-bind:errAddComment="errAddComment"
            v-bind:oneArticle="oneArticle">
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
      v-bind:dataEdit="dataEdit"
      v-on:edit-img="getImgEdit"
      v-on:edit-data="editOldArticle">
    </Edit>
    <Foot/>
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
import Foot from '@/components/Foot.vue'
export default {
  data () {
    return {
      statusDialog: '',
      statusLogin: false,
      statusDialogRegist: '',
      statusDialogArticle: '',
      statusDialogEdit: '',
      article: '',
      dataEdit: {},
      statusBarNow: '',
      allData: {},
      articles: [],
      username:'',
      dataUrl:'',
      urlEdit:'',
      owner:'',
      errAddComment:'',
      oneArticle:{}
    }
  },
  components: {
    Navbar, Login, Register, Article, Sidebar, Mainbar, Edit, Carousel, Foot
  },
  methods: {
     getUrl (data) {
      this.dataUrl = data
    },
    getImgEdit (url) {
      this.urlEdit = url
    },
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
    getId (idArticle) {
      console.log("masuk gk nihh")
      if(idArticle !== undefined){
         axios.get(`http://localhost:3000/article/getOne/${idArticle._id}`)
        .then(data=>{
          this.oneArticle = data.data
        })
        .catch(err=>{
          console.log(err)
        })
      }
      this.article =  idArticle
    },
    editDialog (status) {
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
    allArticle () {
      axios.get('http://localhost:3000/article/allArticle')
      .then(allData => {
          this.articles = allData.data
      })
      .catch(err => {
        console.log(err);
      })
    },
    checkLogin (status) {
      this.statusLogin = status
    },
    checkLogout (status) {
      status = false
      this.statusLogin = status
    },
    resetName () {
      this.username = ''
    },
    addArticle (value) {
      let token = localStorage.getItem('token')
        let formData = new FormData()
        formData.append('image',this.dataUrl)
        axios.post('http://localhost:3000/upload', formData)
        .then(result=>{
            axios.post('http://localhost:3000/article/addArticle', {
              title: value.title,
              content: value.content,
              url: result.data.link
            }, {
              headers: {
                token: token
              }
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
        this.title = ''     
    },
    deleteArticle (value ) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/article/delete/${value}`, {
        headers: {
          token: token
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editOldArticle (value) {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.urlEdit)
      axios.post('http://localhost:3000/upload', formData)
        .then(result => {
          axios.put(`http://localhost:3000/article/editArticle/${value.id}`, {
            title: value.title,
            content: value.content,
            url: result.data.link
          }, {
            headers: {
              token: token
            }
          })
            .then(data => {
              console.log(data)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addComment (value) {
      console.log(value)
      let self = this
      let token = localStorage.getItem('token')
      axios.post(`http://localhost:3000/article/addComment/${value.id}`, {
        comment: value.comment
      }, {
        headers: {
          token: token
        }
      })
        .then(dataComment => {
          self.getId(value.id)
        })
        .catch(err => {
          console.log(err)
          this.errAddComment = 'you have to login first'
        })
    },
    getOneArticle(id){
      axios.get(`http://localhost:3000/article/getOne/${id}`)
      .then(data=>{
        console.log(data)
        // this.oneArticle = data.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteComment (id) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/article/deleteComment/${id}`, {
        headers: {
          token: token
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    SignIn (value) {
      axios.post('http://localhost:3000/users/login', {
        email: value.email,
        password: value.password
      })
        .then(data => {
          let token = data.data.token
          let name = data.data.dataUser.name
          localStorage.setItem('token', token)
          localStorage.setItem('name', name)
          this.owner = data.data.dataUser._id
          this.statusLogin = true
          this.username = name
          this.close()
        })
        .catch(err => {
          this.msg = err.response.data.msg
        })
    },
    getComment(){
      console.log(this.article)
    }
  },
  mounted () {
    this.login()
    this.register()
    this.closeArticle()
    this.getId()
    this.allArticle()
    this.getComment()
  },
  watch: {
    articles: 'allArticle',
    statusLogin (val) {
      this.statusLogin = val
    }
  },
  created(){
    var token = localStorage.getItem('token')
    var name = localStorage.getItem('name')
    if(token){
      this.statusLogin = true
      this.username = name
    }
  }
}
</script>
