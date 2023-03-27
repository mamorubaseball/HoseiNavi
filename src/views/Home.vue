<template>
  <div id="home">
    <div class="pa-10">
    <v-form
      @submit.prevent="search"
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
        :style="{ minWidth: '180px' }"
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
    <div class="pb-1">
<h2>記事</h2>
    <blogs></blogs>
</div>
<circles></circles>
</div>

</template>

<script>
import blogs from "../components/Blogs.vue";
import circles from "../components/Circles.vue";
import { mapState } from 'vuex'
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
  name: 'Home',
  data:()=>({
    searchKeyword:'',
    searchResult: [],
    circles:[],
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
       { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ]
  }),

  components: {
   blogs,
   circles
  },
  mounted() {
    if (this.isLoggedIn) {
      console.log('User is logged in')
    } else {
      console.log('User is not logged in')
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'user'])
  },
  methods: {
    search(){

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

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>