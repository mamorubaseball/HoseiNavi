<template>
  <div class="circle pa-10">
    <v-row jsutify="center">
      <!-- 中身 -->
      <v-col md="9" id="main">
      <h2 id="username">{{ username }}</h2>
 <img id="image" width="200" height="200" />
    <h2 id="content_act">活動内容</h2>
    {{ content }}
    <h2 id="often">活動頻度</h2>
    {{ often }}
    <h2 id="place">活動場所</h2>
    {{ place }}
    <h2 id="addres">団体連絡先</h2>
    <v-icon v-model="twitter"
      >mdi-twitter</v-icon>{{ twitter }}
      </v-col>
      <!-- 目次 -->
      <v-col md="3">
        <div class="toc">
        <section>
            <ol>
              <li class="ma-1"><a href="#username">サークル名</a></li>
              <li class="ma-1"><a href="#content_act">活動内容</a></li>
              <li class="ma-1"><a href="#often">活動頻度</a></li>
              <li class="ma-1"><a href="#place">活動場所</a></li>
              <li class="ma-1"><a href="#addres">団体連絡先</a></li>
            </ol>
          </section>

        </div>
      </v-col>
    </v-row>

    </div>
</template>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
<script>
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import SideCatalog from 'vue-side-catalog'
import 'vue-side-catalog/lib/vue-side-catalog.css'

export default {
  name: "Circle",
  components:{
     'side-catalog':SideCatalog
  },
  data: () => ({
        catalogProps:{
        containerElementSelector: '#content',
        openDomWatch: true,
    },
    valid: true,
    rules: [],
    //   formデータ
    id: "",
    info: "",
    info_list: [],
    username: "",
    user: "",
    email: "",
    profile_file: "",
    content_files: [],
    content: "",
    often: "",
    place: "",
    category: "",
    twitter: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    categorys: "",
    oftens: [],
    // user :this.user,
    checkbox: false,
  }),
  //初期値の設定(未登録の場合は何も表示されない)
  async mounted() {
    const app = getApp();

    //URLパラメータ
    this.email = this.$route.params.email;
    // FireStore
    let db = getFirestore(app);
    const User = doc(db, "users", this.email);
    const Profile = await getDoc(User);
    this.username = Profile.data().username;
    this.content = Profile.data().content;
    this.often = Profile.data().often;
    this.place = Profile.data().place;
    this.category = Profile.data().category;
    this.profile_name = Profile.data().profile_name;
    this.content_files = Profile.data().content_files;
    this.twitter = Profile.data().twitter;

    // FireStorage 画像取得
    const storage = getStorage(app);
    const file_path = this.email + "/" + this.profile_name;
    await getDownloadURL(ref(storage,file_path))
  .then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    const img = document.getElementById('image');
    img.setAttribute('src', url);
    console.log(url)
  })
  .catch((error) => {
    console.log("era",error)
  })
  },
  methods: {},
};
</script>
<style scoped>

#main{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.toc{
  background-color: white;
  border-radius: 13px;
  padding: 1rem; 
  margin-left: 1rem;
  position: sticky;
  top: 20rem; 
  max-height: 90vh;
  overflow: scroll;
  font-size: 1.2rem;
}

/* スタイル */
h2 {
    margin-top: 2.4em;
    margin-bottom: 1.62em;
    background-color: transparent;
    padding: 0;
    font-size: 1.8rem;
    text-indent: 0.5em;
    line-height: 1.25;
    font-weight: bold;
}

h2::after {
    margin-top: 0.3em;
    content: "";
    display: block;
    height: 8px;
    position: relative !important;
    background-image: linear-gradient( 165deg, #ffe259 0%, #ffa751 20%);
}


.h3 {
  border-left: 7px solid #777;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size: 22px;
  padding: 12px 20px;
}

</style>
