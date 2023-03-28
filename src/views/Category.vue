<template>
  <div id="category">
    <h1>{{ $route.params.campase }}キャンパス:{{ $route.params.category }}</h1>
        <ul class="cards">
          <li v-for="(circle,index) in circles" :key="index" class="csscard box">
        <div>
          <a :href="circle.to">{{ circle.to }}
            <img :src="circle.src"  height="120" width="150"/>
        <h3 class="csscard-title" style="color:black">{{ circle["username"] }}</h3>
        <div class="csscard-content" style="color:black">
          <p>テキスト</p>
        </div>
          
          </a>
      </div>
    </li>
  </ul>
    <!-- <div class="pa-5">
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
    </div> -->
    </div>
</template>
<script>
import { getApp } from "firebase/app";
import { getStorage,getDownloadURL, ref } from "firebase/storage";
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

    methods: {
      async getCircle(campas,category) {
      const promises = []; // Promiseを格納するための配列
      // initialize
      const app = getApp();
      const storage = getStorage(app);
      // get user list
      let db = getFirestore(app);
      const Users = collection(db, "users");
      await getDocs(query(Users, where("campas", "==", campas),where("category","==",category ))).then((snapshot) => {
        snapshot.forEach((doc) => {
          const circle_data = doc.data();
          const url =
            "/circle/" +
            circle_data.campas +
            "/" +
            circle_data.category +
            "/" +
            doc.id;
          circle_data["email"] = doc.id;
          circle_data["to"] = url;
          // 画像srcの取得
          const file_path = doc.id + "/" + circle_data.profile_name;
          const imageRef = ref(storage, file_path);

      // Promiseを追加
      promises.push(
        getDownloadURL(imageRef).then((url) => {
          circle_data["src"] = url;
        }).catch((error) => {
          console.log("エラー", error);
        })
      );
          //配列に格納する
          this.circles.push(circle_data);          
        });
      });
  // すべてのダウンロードURLの取得が完了したら、Vue.jsのリアクティブシステムをトリガーする
  Promise.all(promises).then(() => {
    // Vue.jsのリアクティブシステムをトリガーする
    this.$forceUpdate();
  });
    }},
    mounted() {
      //URLパラメータ
      this.campase = this.$route.params.campase;
      this.category = this.$route.params.category;
      this.getCircle(this.campase,this.category);
      console.log(this.circles)
    }
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


a{
  color: inherit; /* 親要素の色を継承 */
  text-decoration: none; /* 下線をなくす */
  cursor: pointer; /* マウスカーソルをポインターに変更 */
}

.box{
  border-radius: 100px;
    /* 初期状態のスタイル */
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s ease-in-out;
}

.box:hover {
  /* マウスを乗せた時のスタイル */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}


/* スクロールに使ったCSS */
:root {
  --red: #ef233c;
  --darkred: #c00424;
  --platinum: #e5e5e5;
  --black: #2b2d42;
  --white: #fff;
  --thumb: #edf2f4;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font: 16px / 24px "Rubik", sans-serif;
  color: var(--black);
  background: var(--platinum);
  margin: 50px 0;
}

.container {
  max-width: 1400px;
  padding: 0 15px;
  margin: 0 auto;
}

h2 {
  /* margin-bottom: 1em; */
}

.cards {
  display: flex;
  padding: 20px 0px;
  
  list-style: none;
  overflow-x: scroll;
  /* 追加 */
  overflow-y: hidden; 

  scroll-snap-type: x mandatory;
}

.csscard {
  display: flex;
  flex-direction: column;
  /* 追加（flex-direction: column;によってカードの高さが自動で決まるらしい) */
  height: 250px;
  padding: 20px 0px;
  flex: 0 0 100%;
  padding: 0px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 15%);
  scroll-snap-align: start;
  transition: all 0.2s;
}

/* 追加、画像をcsscsrdクラス目一杯貼り付ける */
.csscard img {
  width: 100%;
  height: 50%;
  object-fit: cover;
}


.csscard:not(:last-child) {
  margin-right: 10px;
}

.csscard:hover {
  color: var(--white);
  background: var(--red);
}

.csscard .csscard-title {
  font-size: 20px;
}

.csscard {
  margin: 0 0;
  max-width: 90%;
}

.csscard .csscard-link-wrapper {
  margin-top: auto;
}

.csscard .csscard-link {
  display: inline-block;
  text-decoration: none;
  color: white;
  background: var(--red);
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.csscard:hover .csscard-link {
  background: var(--darkred);
}

.cards::-webkit-scrollbar {
  height: 12px;
}

.cards::-webkit-scrollbar-thumb,
.cards::-webkit-scrollbar-track {
  border-radius: 92px;
}

.cards::-webkit-scrollbar-thumb {
  background: var(--darkred);
}

.cards::-webkit-scrollbar-track {
  background: var(--thumb);
}

@media (min-width: 500px) {
  .csscard {
    flex-basis: calc(50% - 10px);
  }

  .csscard:not(:last-child) {
    margin-right: 20px;
  }
}

@media (min-width: 700px) {
  .csscard {
    flex-basis: calc(calc(100% / 3) - 20px);
  }

  .csscard:not(:last-child) {
    margin-right: 30px;
  }
}

@media (min-width: 1100px) {
  .csscard {
    flex-basis: calc(25% - 30px);
  }

  .csscard:not(:last-child) {
    margin-right: 40px;
  }
}


/* FOOTER STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.page-footer {
  position: fixed;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  padding: 5px;
  z-index: 1;
}

.page-footer a {
  display: flex;
  margin-left: 4px;
}

</style>
