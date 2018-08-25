<template>
      <v-layout row justify-center>
      <v-dialog v-model="statusDialogEdit" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar class="orange lighten-1">
                <v-btn icon dark @click.native="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Upload Blog</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="editArticle(objData._id)">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <v-subheader>Edit Article</v-subheader>
                <br>
                <v-list-tile avatar>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Title" v-model="objData.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <input type="file" v-on:change="getImage($event)">
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-tile>
                <v-container>
                    <wysiwyg v-model="objData.content" style="border:solid" />
                </v-container>
            </v-list>
            <div>
            </div>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: ['statusDialogEdit','dataEdit'],
    data(){
        return{
            objData: {}
        }
    },
    methods: {
        closeDialog () {
            this.$emit('close-dialogEdit', this.statusDialogEdit)
        },
        getImage(link){
            this.objData.url = link.target.files[0]
        },
        editArticle(id){
            // console.log(id);
            let token = localStorage.getItem('token')
            let formData = new FormData()
            formData.append('image',this.objData.url)
            axios.post('http://localhost:3000/upload',formData)
            .then(result=>{
                axios.put(`http://localhost:3000/article/editArticle/${id}`,{
                    title: this.objData.title,
                    content: this.objData.content,
                    url: result.data.link
                },{
                    headers : {
                        token: token
                    }
                })
                .then(data=>{
                    console.log(data.config.data);
                    // this.$emit('obj-edit',data.data)
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);     
            })
            
        }
    },
    watch:{
        dataEdit () {
            this.objData = this.dataEdit
        }
    }
}
</script>

<style>

</style>
