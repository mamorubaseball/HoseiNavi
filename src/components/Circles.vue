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
import { getApp } from "firebase/app";
import { getStorage, ref, getBlob } from "firebase/storage";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

export default {
  name: "Circles",
  data: () => ({
    circles: { 
   '市ヶ谷':[],
   '小金井':[],
    '多摩':[],
    },
    user_mails:[],
    campases:['市ヶ谷','小金井','多摩'],
    categorys: ["体育会","第二体育会","工体連","スポーツ(球技)",
    "スポーツ(球技以外)","音楽", "文化系","国際(言語)","趣味","ボランティア"],
  }),

 mounted() {
  this.getCircle("市ヶ谷")
  this.getCircle("小金井")
  this.getCircle("多摩")
  console.log(this.circles)

 },
 methods: {
  //キャンパスを指定してサークルを取得する
    getCircle(campas){
    // initialize
    const app = getApp();
    const storage = getStorage(app);
    // get user list
    let db = getFirestore(app);
    const Users = collection(db,"users");
    getDocs(query(Users,where("campas","==",campas)))
      .then(snapshot =>{
      snapshot.forEach(doc=>{
        console.log("doc.id",doc.id)
        const circle_data = doc.data()
        const url =  circle_data.category+'/'+doc.id;
        circle_data['email'] = doc.id
        circle_data['to'] = url;
        // 画像srcの取得
        const file_path = doc.id + "/" +circle_data.profile_name
        const imageRef = ref(storage, file_path);
        getBlob(imageRef)
        .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            circle_data['src'] = blobURL
        })
        .catch((e) => {
            console.log(e)})
        //配列に格納する
        this.circles[campas].push(circle_data)
      })
    })}
  },
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