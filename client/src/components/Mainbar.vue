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
                ></v-textarea>
                <v-btn class="red">Add Comment</v-btn>
            </v-container>


            <v-layout>
                <v-flex xs12 >
                    <v-card>
                    <v-card-title primary-title>
                        <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
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
            let token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/article/delete/${id}`,{
                headers : {
                    token : token
                }
            })
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
