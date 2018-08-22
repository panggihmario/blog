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
             <p v-html="article.content"></p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="passDialogEdit(article)">Edit</v-btn>
            <v-btn flat color="orange" @click="deleteArticle(article._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
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
            axios.delete(`http://localhost:3000/article/delete/${id}`)
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
        },
    },
    data(){
        return{
            dialogEdit: false,
        }
    }
}
</script>

<style>

</style>
