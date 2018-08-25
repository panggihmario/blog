<template>
      <v-carousel
      delimiter-icon="stop"
      prev-icon="mdi-arrow-left"
      next-icon="mdi-arrow-right"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
     data () {
    return {
      items: [
        {
          src: 'http://bakpiajogja.id/wp-content/uploads/2016/12/wisata-malioboro.jpg'
        },
        {
          src: 'https://jogjaholidaydriver.files.wordpress.com/2016/08/prambanan_temple_indonesia_original.jpg?w=1632'
        },
        {
          src: 'https://indonesia.tripcanvas.co/wp-content/uploads/2017/08/natural-attractions-jogja-feature-1.jpg'
        },
        {
          src: 'http://cdn2.tstatic.net/tribunnews/foto/bank/images/hutan-pinus_20160216_132347.jpg'
        }
      ]
    }
  }
}
</script>

<style>

</style>
