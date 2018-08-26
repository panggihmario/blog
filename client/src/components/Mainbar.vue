<template>
    <v-layout>
        <v-flex xs12 >
            <v-card>
                <v-card-media
                    :src="article.url"
                    height="200px"
                ></v-card-media>
                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">{{article.title}}</h3>
                    writer : {{article.user.name}}
                    <p v-html="article.content"></p>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="orange" @click="passDialogEdit(article)">Edit</v-btn>
                    <v-btn flat color="orange" @click="deleteArticle(article._id)">Delete</v-btn>
                </v-card-actions>
            </v-card>
            <v-container fluid grid-list-md>
                <v-textarea
                    name="input-7-1"
                    outline
                    label="Comment"
                    auto-grow
                    v-model="comment"
                ></v-textarea>
                <v-btn class="red" @click="dataComment(article._id)">Add Comment</v-btn>
            </v-container>
            <v-layout>
                <v-flex xs12 >
                    <v-card v-for="(comment,index) in article.comment" :key=index>
                    <v-card-title primary-title >
                        <div>
                        <h3 class="headline mb-0">{{comment.user.name}}</h3>
                        <div>{{comment.comment}}</div>
                         <v-btn class="red" @click="delComment(comment._id)">Delete</v-btn>
                        </div>
                    </v-card-title> 
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    passDialogEdit (article) {
        this.dialogEdit = true
        this.$emit('dialog-edit',this.dialogEdit)
        this.$emit('obj-article',article)
    },
    deleteArticle (id) {
        this.$emit('id-delete',id)
    },
    dataComment(id){
      this.$emit('comment',{id:id,comment:this.comment})
    },
    delComment(id){
      this.$emit('del-comment',id)
    }
  },
  data(){
    return{
        dialogEdit: false,
        comment:''
    }
  }
}
</script>

<style>

</style>
