<template>
<div id="circles">
<!-- ネスト -->
<div v-for="(campases,name ) in circles" :key="name">

<div v-if="name == '市ヶ谷'" class="ma-10">
<div class="pa-5">
  <h2>{{ name }}</h2>
</div>
<v-row>
  <v-col
  v-for="(circle,category) in campases"
  :key="category"
   cols="12"
   sm="4"
   align="center"
   >
    <v-card 
         height="240"
         width="240" 
         color=""
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
   align="center"
   >
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
   align="center"
   >
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
      },

   '小金井':{
        "工体連":{'message':'第二体育会です','img':require("@/assets/circle_category/amefuto_koganei.jpeg")},
        "スポーツ(球技)":{'message':'第二体育会です','img':require("@/assets/circle_category/sports_koganei.jpeg")},
    "スポーツ(球技以外)":{'message':'第二体育会です','img':require("@/assets/circle_category/kendou_koganei.jpeg")},
      },
    '多摩':{
        "体育会":{'message':'第二体育会です','img':require("@/assets/circle_category/soccer_tama.jpeg")},
        "スポーツ(球技)":{'message':'第二体育会です','img':require("@/assets/circle_category/sports_tama.jpeg")},
    "スポーツ(球技以外)":{'message':'第二体育会です','img':require("@/assets/circle_category/baseball.jpeg")},
     },
    },
    user_mails:[],
    campases:['市ヶ谷','小金井','多摩'],
    categorys: ["体育会","第二体育会","工体連","スポーツ(球技)",
    "スポーツ(球技以外)","音楽", "文化系","国際(言語)","趣味","ボランティア"],
  }),
  async mounted() {
    
  }
}
</script>

<style>

#circles{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>