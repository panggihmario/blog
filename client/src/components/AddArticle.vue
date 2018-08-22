<template>
     <v-layout row justify-center>
      <v-dialog v-model="statusDialogArticle" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar class="orange lighten-1">
                <v-btn icon dark @click.native="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Upload Blog</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <v-subheader>Owner Controls</v-subheader>
                <br>
                <v-list-tile avatar>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Title" v-model="title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <input type="file" v-on:change="getImage($event)">
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-tile>
                <v-container>
                    <wysiwyg v-model="content" style="border:solid" />
                </v-container>
            </v-list>
            <div>
                <v-btn color="success" v-on:click="addArticle">Add Blog</v-btn>
            </div>
         
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
import wysiwyg from "vue-wysiwyg";
export default {
    props: ["statusDialogArticle"],
    methods: {
        closeDialog () {
            this.$emit('close-dialogArticle', this.statusDialogArticle)
        },
        addArticle(){
            let formData = new FormData()
            formData.append('image',this.url)
            axios.post('http://localhost:3000/upload',formData)
            .then(result=>{
                axios.post('http://localhost:3000/article/addArticle',{
                    title: this.title,
                    content: this.content,
                    url: result.data.link
                })
                .then(data=>{
                    console.log(data);
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
        getImage(link){
            this.url = link.target.files[0]
        }
    },
    data(){
        return{
            title:'',
            content: '',
            url: ''
        }
    },


}
</script>

<style>

</style>
