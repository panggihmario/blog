<template>
    <v-layout row wrap>
        <v-flex xs12 >
            <v-card>
                <v-card-media
                    :src="article.url"
                    height="200px"
                ></v-card-media>
                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">{{oneArticle.title}}</h3>
                    writer : {{oneArticle.user.name}}
                    <p v-html="oneArticle.content"></p>
                    </div>
                </v-card-title>
                <v-card-actions v-if="owner == oneArticle.user._id && statusLogin">
                    <v-btn flat color="orange" @click="passDialogEdit(article)">Edit</v-btn>
                    <v-btn flat color="orange" @click="deleteArticle(article._id)">Delete</v-btn>
                </v-card-actions>
            </v-card>
              <br>
             <v-container grid-list-md text-xs-center> 
            <v-layout  row wrap>
                <v-flex xs12  v-for="(comment,index) in oneArticle.comment" :key=index>
                    <v-card >
                    <v-card-title primary-title >
                    <h5 class="headline mb-0">{{comment.user.name}}</h5>
                    </v-card-title>
                    <v-card-text>
          <p class="text-sm-left">{{comment.comment}}</p>
                    <div></div>
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                        <a href="#" @click="delComment(comment._id)"><i class="fas fa-trash-alt fa-2x"></i></a>
                    </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
             </v-container>
              <v-container fluid grid-list-md>
                <v-textarea
                    name="input-7-1"
                    outline
                    label="Comment"
                    auto-grow
                    v-model="comment"
                ></v-textarea>
                <v-btn  outline color="indigo" @click="dataComment(article._id)">Add Comment</v-btn>
                <div v-if="!statusLogin">
                {{errAddComment }}
                </div>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ['article', 'owner', 'statusLogin', 'errAddComment', 'oneArticle'],
  methods: {
    passDialogEdit (article) {
      this.dialogEdit = true
      this.$emit('dialog-edit', this.dialogEdit)
      this.$emit('obj-article', article)
    },
    deleteArticle (id) {
        this.$emit('id-delete', id)
    },
    dataComment(id){
      this.$emit('comment', {id:id,comment:this.comment})
    },
    delComment(id){
      this.$emit('del-comment', id)
    }
  },
  data(){
    return{
        dialogEdit: false,
        comment: ''
    }
  }
}
</script>

<style>

</style>
