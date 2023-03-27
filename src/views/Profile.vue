<template>
  <v-container>
    <v-card class="align-center">
      <v-card-title class="blue lighten-3 white--text">
        <div v-if="is_registed">
          <h3>{{ username }}さん</h3>
        </div>
        <div v-else>サークル情報を新規登録する</div>
      </v-card-title>
      <v-card-text>
 
          <v-form ref="form" @submit.prevent="submit">
          <!-- プロフィール画像表示 -->
          <div class="img">
            <img id="image" />
          </div>

          <!-- プロフィール画像 -->
          <v-file-input
            chips
            label="プロフィール画像を入力してください"
            v-model="profile_file"
          ></v-file-input>

          <!-- サークル名 -->
          <v-text-field
        v-model="username"
        :counter="10"
        :rules="nameRules"
        label="サークル名"
        required
      ></v-text-field>

          <!-- 活動内容写真 -->
          <v-file-input
            small-chips
            multiple
            counter

            label="活動様子がわかる写真を1~3枚入力してください"
            v-model="content_files"
          ></v-file-input>
          <!-- 活動内容 -->
          <v-textarea v-model="content" color="teal" label="活動内容">
          </v-textarea>

          <!-- selectに変更 -->
          <v-select
            v-model="often"
            :items="oftens"
   
            label="活動頻度"
            required
          ></v-select>

          <!-- イベント -->
          <v-textarea v-model="event" color="teal" label="イベント">
          </v-textarea>
          <!-- 活動場所 -->
          <v-text-field
            v-model="place"
            label="活動場所"
            required
          ></v-text-field>
          <v-select
            v-model="campas"
            :items="campases"
            :rules="rules"
            label="キャンパス"
            required
          ></v-select>

          <!-- 活動費用 -->
          <v-text-field
            v-model="money"
            label="活動費用(年間)"
    
          ></v-text-field>

          <v-select
            v-model="category"
            :items="categorys"
            :rules="rules"
            label="カテゴリー"
            required
          ></v-select>

          <!-- 所属人数 -->
          <v-text-field
            v-model="member"
            label="所属人数"
           
          ></v-text-field>

          <!-- twitter -->
          <v-text-field
            label="Twitter"
            v-model="twitter"
            prepend-icon="mdi-twitter"
          ></v-text-field>

          <!-- instagram -->
          <v-text-field
            label="Instagram"
            v-model="instagram"
            prepend-icon="mdi-instagram"
          ></v-text-field>

          <!-- homepage -->
          <v-text-field
            label="home_page"
            v-model="home_page"
            prepend-icon="mdi-home"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="$refs.form.validate()"
          >
            Validate
          </v-btn>
          <v-btn color="error" class="mr-4" type="submit"> 登録 </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
<script>
import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getBlob,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import fireVue from '../../../../Django_meigaku/rest_meigaku/project/frontend/src/views/fire.vue';
// import vuesocial from "@growthbunker/vuesocial"

export default {
  name: "Profile",
  data: () => ({
    valid: true,
    is_registed: false,
    rules: [
      (v) => (v && v.length >= 1) || "入力してください",
    ],
    errors:[],
    //   formデータ
    username: "",
    id: 0,
    user: "",
    email: "",
    profile_file: "",
    profile_name: "",
    content_files: [],
    content: "",
    event: "",
    member: "",
    often: "",
    money: "円",
    place: "",
    category:"",
    campas: "",
    twitter: "https://twitter.com/",
    instagram: "",
    home_page: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    categorys: [
      "体育会",
      "第二体育会",
      "工体連",
      "スポーツ(球技)",
      "スポーツ(球技以外)",
      "音楽",
      "文化系",
      "国際(言語)",
      "趣味",
      "ボランティア",
    ],
    oftens: ["週1回", "週2回", "週3回", "週4回", "週5回"],
    campases: ["市ヶ谷", "小金井", "多摩"],
    // user :this.user,
    checkbox: false,
  }),
  //初期値の設定(未登録の場合は何も表示されない)
  async mounted() {
    //initialize firebase
    const auth = getAuth();
    const app = getApp();

    //ユーザーのアドレス
    this.user = auth.currentUser.email;

    // FireStore
    let db = getFirestore(app);
    const User = doc(db, "users", this.user);
    const Profile = await getDoc(User);

    console.log("profiledata", Profile.exists());
    this.is_registed = Profile.exists();

    if (this.is_registed) {
      this.id = Profile.data().id;
      this.username = Profile.data().username;
      this.content = Profile.data().content;
      this.event = Profile.data().event;
      this.often = Profile.data().often;
      this.place = Profile.data().place;
      this.category = Profile.data().category;

      this.campas = Profile.data().campas;
      this.member = Profile.data().member;
      this.profile_name = Profile.data().profile_name;
      this.content_files = Profile.data().content_files;
      this.instagram = Profile.data().instagram;
      this.home_page = Profile.data().home_page;
      // twitterが登録されていないのに、text-fieldではhttps://twitter.com/が入力されている謎
      if (!Profile.data.twitter) {
        this.twitter = "https://twitter.com/";
      } else {
        this.twitter = Profile.data().twitter;
      }

      // 費用
      if (!Profile.data.money) {
        this.money = "円";
      } else {
        this.money = Profile.data().money;
      }

      // FireStorage 画像取得
      const storage = getStorage(app);
      const file_path = this.user + "/" + this.profile_name;
      console.log("ファイルpath", file_path);

      // const imageRef = ref(storage, file_path);
      getDownloadURL(ref(storage, file_path))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();

          // Or inserted into an <img> element
          const img = document.getElementById("image");
          img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log("キャッチエラー");
          console.log(error);
        });
    }
  },
  methods: {
    validate(){
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    //登録
    async submit() {

      console.log(this.campas)

      if (this.$refs.form.validate()) {
        // this.$refs.form.reset()
      const app = getApp();
      const db = getFirestore(app);
      // 新規登録の場合idはuserdata数
      if (!this.is_registed) {
        const Users = await getDocs(collection(db, "users"));
        this.id = Users.size;
      }
      //ファイル登録する時だけ,profile.nameを呼び出す
      if (this.profile_file) {
        this.profile_name = this.profile_file.name;
      }
      console.log(this.profile_name);
      await setDoc(doc(db, "users", String(this.user)), {
        username: this.username,
        content: this.content,
        event: this.event,
        often: this.often,
        money: this.money,
        place: this.place,
        category: this.category,
        member: this.member,
        campas: this.campas,
        profile_name: this.profile_name,
        content_files: this.content_files,
        twitter: this.twitter,
        instagram: this.instagram,
        home_page: this.home_page,
      });
      console.log("書き込み成功:", this.user);
      // 画像のアップロード
      const storage = getStorage(app);
      // 同じファイル名をダウンロードされた時の対処方法として,user/file_nameとして保存する。
      const download_folder = this.user + "/" + this.profile_name;
      const storageRef = ref(storage, download_folder);
      //プロフィール画像
      uploadBytes(storageRef, this.profile_file).then((snapshot) => {
        console.log("Uploaded file:", this.profile_name);
      });

      //サークルページに遷移
      // console.log(`/circle/${this.campas}/${this.category}/${this.user}`)
      this.$router.push(`/circle/${this.campas}/${this.category}/${this.user}`)


    }},
  },
};
</script>

<style>
/* カードを中央に配置するためのスタイル */
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* カードの幅を設定するためのスタイル */
.v-card {
  width: 600px;
  margin: 0 auto;
}

.img {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  text-align: center;
}

/* イメージスタイル */
#image {
  width: 50%;
  height: 50%;
  margin: 10px auto;
}
</style>
