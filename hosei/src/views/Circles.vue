<template>
<div id="circles">
<!-- ネスト -->
<div v-for="(campases,name ) in circles" :key="name">

<div v-if="name == '市ヶ谷'" class="">
<div class="pa-5">
  <h2>{{ name }}</h2>
</div>
<v-row>
  <v-col
  v-for="(circle,category) in campases"
  :key="category"
   cols="12"
   sm="4"
   align="center">
    <v-card 
         height="240"
         width="240" 
      :to="'circle/'+name+'/'+category">
      <!-- <img src="@/assets/circle_category/baseball.jpeg" height="100" class="pa-2" > -->
      <img :src = "circle.img" height="100" width="120" class="pa-2" >
      <p class="pa-5">{{ category }}</p>
    </v-card>
  </v-col>
</v-row>

</div>

<div v-if="name == '小金井'" class="ma-10">
<div class="pa-5">
  <h2>{{ name }}</h2>
</div>
<v-row>
  <v-col
  v-for="(circle,category) in campases"
  :key="category"
   cols="12"
   sm="4"
   align="center">
    <v-card 
         height="240"
         width="240" 
      :to="'circle/'+name+'/'+category">
      <img :src=circle.img height="100" width="120" class="pa-2">
      <p class="pa-5">{{ category }}</p>
    </v-card>
  </v-col>
</v-row>
</div>

<div v-if="name == '多摩'" class="ma-10">
<div class="pa-5">
  <h2>{{ name }}</h2>
</div>
<v-row>
  <v-col
  v-for="(circle,category) in campases"
  :key="category"
   cols="12"
   sm="4"
   align="center">
    <v-card
          height="240"
         width="240" 
      :to="'circle/'+name+'/'+category">
      <img :src='circle.img' height="100" width="120" class="pa-2">
      <p>{{ category }}</p>
      <!-- <p>{{ circle['message'] }}</p> -->
    </v-card>
  </v-col>
</v-row>
</div>
</div>
</div>

</template>
<script>
export default {
  name: "Circles",
  data: () => ({
    circles: { 
   '市ヶ谷':{
        "第二体育会":{'message':'第二体育会です','img':require("@/assets/circle_category/daini_itigaya.jpeg")},
        "スポーツ(球技)":{'message':'第二体育会です','img':require("@/assets/circle_category/basuke_itigaya.jpeg")},
    "スポーツ(球技以外)":{'message':'第二体育会です','img':require("@/assets/circle_category/suiei.jpeg")},
    "音楽":{'message':'第二体育会です','img':require("@/assets/circle_category/music_itigaya.jpeg")}, 
    "文化系":{'message':'第二体育会です','img':require("@/assets/circle_category/bunka_itigaya.jpeg")},
    "国際(言語)":{'message':'第二体育会です','img':require("@/assets/circle_category/eigo_itigaya.jpeg")},
    "趣味":{'message':'第二体育会です','img':require("@/assets/circle_category/shumi_itigaya.jpeg")},
    "ボランティア":{'message':'第二体育会です','img':require("@/assets/circle_category/borantia_itigaya.jpeg")},
     "応援団":{'message':'第二体育会です','img':require("@/assets/circle_category/ouen_itigaya.webp")}
      },

   '小金井':{
        "工体連":{'message':'第二体育会です','img':require("@/assets/circle_category/amefuto_koganei.jpeg")},
        "スポーツ(球技)":{'message':'第二体育会です','img':require("@/assets/circle_category/sports_koganei.jpeg")},
    "スポーツ(球技以外)":{'message':'第二体育会です','img':require("@/assets/circle_category/kendou_koganei.jpeg")},
    "音楽":{'message':'第二体育会です','img':require("@/assets/circle_category/music_koganei.jpeg")}, 
    "文化系":{'message':'第二体育会です','img':require("@/assets/circle_category/bunka_koganei.jpeg")},
    "国際(言語)":{'message':'第二体育会です','img':require("@/assets/circle_category/ESS_koganei.jpeg")},
    "趣味":{'message':'第二体育会です','img':require("@/assets/circle_category/shumi_koganei.jpeg")},
    "ボランティア":{'message':'第二体育会です','img':require("@/assets/circle_category/borantia_koganei.jpeg")},
        "応援団":{'message':'第二体育会です','img':require("@/assets/circle_category/ouen_koganei.webp")}
      },
    '多摩':{
        "体育会":{'message':'第二体育会です','img':require("@/assets/circle_category/soccer_tama.jpeg")},
        "スポーツ(球技)":{'message':'第二体育会です','img':require("@/assets/circle_category/sports_tama.jpeg")},
    "スポーツ(球技以外)":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")},
    "音楽":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")}, 
    "文化系":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")},
    "国際(言語)":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")},
    "趣味":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")},
    "ボランティア":{'message':'第二体育会です','img':require("@/assets/circle_category/borantia_tama.jpeg")},
        "応援団":{'message':'第二体育会です','img':require("@/assets/circle_category/ouen_tama.webp")}
     },
    },
    user_mails:[],
    campases:['市ヶ谷','小金井','多摩'],
    categorys: ["体育会","第二体育会","工体連","スポーツ(球技)",
    "スポーツ(球技以外)","音楽", "文化系","国際(言語)","趣味","ボランティア"],
  }),
  async mounted() {

    console.log(this.circles["小金井"]["趣味"])
  }
}
</script>

<style>
#card-wrapper {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 270px);
    padding: 0 0 100px;
    margin: 0 auto;
}
#circles{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>