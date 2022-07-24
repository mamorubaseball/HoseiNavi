<template>
  <div id="category">
    <h1>{{ $route.params.campase }}キャンパス:{{ $route.params.category }}</h1>
    <div class="pa-5">
<v-row>
  <v-col
   v-for="(circle, index) in circles"
    :key="index"
   cols="12"
   sm="4"
   align="center">
    <v-card 
         height="240"
         width="240" 
      :to="circle.to">
    <img :src = circle.src height="120" width="150" style="padding:10px"/>
    
    <p>{{ circle.username }}</p>
    <p>{{ circle.content }}</p>
    </v-card>
  </v-col>
</v-row>
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
  name: "Category",
  data: () => ({
    campse:"",
    category:"",
    circles:[],
    }),
    mounted() {
    //URLパラメータ
    this.campase = this.$route.params.campase;
    this.category = this.$route.params.category;

    // initialize
    const app = getApp();
    const storage = getStorage(app);
    // get user list
    let db = getFirestore(app);
    const Users = collection(db,"users");
    getDocs(query(Users,where("campas","==",this.campase),where("category","==",this.category)))
      .then(snapshot =>{
      snapshot.forEach(doc=>{
        console.log(doc.id)
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
        this.circles.push(circle_data)
      })
    })}
};
</script>
<style scoped>
#category {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#columes{
     font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
