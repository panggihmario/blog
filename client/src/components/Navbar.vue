<template>
    <v-toolbar class="orange lighten-1">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="passDialogArticle">Add Article</v-btn>
        <v-btn flat v-on:click="passDialog">Logins</v-btn>
        <v-btn flat v-on:click="passDialogRegist">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      dialogRegist: false,
      dialogArticle: false
    }
  },
  methods: {
    passDialog () {
      this.dialog = true
      this.$emit('navbar', this.dialog)
    },
    passDialogRegist () {
      this.dialogRegist = true
      this.$emit('register', this.dialogRegist)
    },
    passDialogArticle () {
      this.dialogArticle = true
      this.$emit('dialog-article', this.dialogArticle)
    }
  }
}
</script>

<style>

</style>
