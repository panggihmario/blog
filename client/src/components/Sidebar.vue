<template>
     
          <div
      id="e3"
      style="max-width: 400px; margin: auto;"
      class="grey lighten-3"
    >
      <v-toolbar
        color="transparent"
        dark
      >
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="black--text">My Blog</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="black--text">
          <i class="fas fa-utensils fa-2x"></i>
        </v-btn>
      </v-toolbar>
  
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Example Blog</div>
                  <div>Read to your favorite article  whenever and wherever, online and offline.</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark>Read Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
  
            <v-flex xs12>
              <v-card color="white" class="white--text">
                <v-layout>
                  <v-flex xs6>
                    <v-card-media
                      src="http://cdn2.tstatic.net/tribunnews/foto/bank/images/gudeg-mbah-lindu_20160119_132759.jpg"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-media
                      src="http://photo.kontan.co.id/photo/2011/04/24/637897713p.jpg"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs6>
                    <v-card-media
                      src="http://pengendolan.com/wp-content/uploads/2015/05/jalan-malioboro-salah-satu-spot-wisata-di-Jogja-yang-harus-dikunjungi.jpg"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-media
                      src="https://wisatapedi.com/wp-content/uploads/2015/05/kopi-joss-tugu-jogja.jpg"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
                
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Rate this album
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
  
            <v-flex xs12>
              <v-card color="white" class="black--text">
                <v-layout row>
                  <v-flex xs12>
                    <v-card-title primary-title>
                      <div>
                        <v-list-tile v-for="(article,index) in articles" :key=index>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                   
                                    <router-link :to="{name: 'article'}" @click.native="idArticle(article)"> {{article.title}}</router-link>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                       
                      </div>
                    </v-card-title>
                  </v-flex>
               
                </v-layout>
                <v-divider light></v-divider>
              
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
 
</template>

<script>
export default {
    data(){
        return{
            articles: []
        }
    },
    methods: {
        allArticle(){
            axios.get('http://localhost:3000/article/allArticle')
            .then(allData=>{
                this.articles = allData.data
            })
        },
        idArticle(id){
            this.$emit('id-article',id)
        }
    },
    mounted(){
        this.allArticle()
    }
}
</script>

<style>

</style>
