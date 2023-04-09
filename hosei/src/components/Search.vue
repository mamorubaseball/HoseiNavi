<template>
    <div class="pa-10">
  
    <v-form
      @submit.prevent="search"
      style="display: flex; justify-content: center;"
    >
      <v-text-field
        v-model="searchKeyword"
        dense
        hide-details
        rounded
        clearable
        placeholder="サークルを検索"
        :solo="isFocused"
        :filled="!isFocused"
        :style="{ minWidth: '150px',width:'100px'}"
        @focus="focus"
        @blur="blur"
      />
      <v-btn type="submit">検索</v-btn>
    </v-form>
      <ul class="cards">
          <li v-for="(circle,index) in circles" :key="index" class="csscard box">
        <div>
          <img :src="circle.src"  height="120" width="150"/>
        <h3 class="csscard-title">{{ circle["username"] }}</h3>
        <div class="csscard-content">
          <p>テキスト</p>
        </div>
      </div>
    </li>
    </ul>
    </div>
</template>

<script>
import { getApp } from "firebase/app";
import { getStorage,ref, getBlob } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default {
  name: 'search',
  data:()=>({
    searchKeyword:'',
    searchResult: [],
    circles:[],
  }),
  mounted() {
  },
  methods: {
    search(){
      // 検索結果をリセット
      this.circles = [];
    console.log("検索開始")
    // initialize
    const app = getApp();
    // get user list
    let db = getFirestore(app);
    const storage = getStorage(app);
    const Users = collection(db,"users");

    getDocs(query(Users,where("username",">=",this.searchKeyword),where("username","<=",this.searchKeyword +'\uf8ff')))
      .then(snapshot =>{
      snapshot.forEach(doc=>{
        console.log("検索結果",doc.id)
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
    })
    }
  },
}
</script>

<style scoped>
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