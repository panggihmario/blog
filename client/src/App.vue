<template>
  <div id="app">
    <v-app id="inspire">
      <transition name="router-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
      <router-view/>
      </transition>
    </v-app>
  </div>
</template>

<style >
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css";

html, body {
  height: calc(100%-50%);
}

.page{
  position: fixed;
  width: inherit;
}

</style>
