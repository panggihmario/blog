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
                <v-subheader>Add Article</v-subheader>
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
                <v-btn color="success" v-on:click="addArticle" @click.native="closeDialog">Add Blog</v-btn>
            </div>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
import wysiwyg from "vue-wysiwyg";
import router from '../router'
export default {
  props: ["statusDialogArticle","articles"],
  methods: {
    closeDialog () {
        this.$emit('close-dialogArticle', this.statusDialogArticle)
    },
    addArticle(){
        this.$emit('item-add',{title:this.title,content:this.content})
     
    },
    getImage(link){
      this.url = link.target.files[0]
      this.$emit('url',this.url)
    }
  },
  data(){
    return{
      title: '',
      content: '',
      url: ''
    }
  }
}
</script>

<style>

</style>
