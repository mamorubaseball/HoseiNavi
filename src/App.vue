<template>
  <!-- ナビゲーション -->
  <v-app>
    <!-- <v-navigation-drawer app>Navigation Lists</v-navigation-drawer> -->
    <v-app-bar color="orange" dark app clipped-left height="60px">
      <v-toolbar-title >法政ナビ</v-toolbar-title>

      <!-- ハンバーガーメニューの作成 -->

        <v-tabs centered class="" style="width: 600px;" color="grey darken-1">
          <v-tab v-for="link in links" :key="link.name" :to="link.to">
            {{ link.name }}
          </v-tab>
        </v-tabs>


<v-btn
  v-if="isLoggedIn"
 
  text
  class="ma-2"
  elevation="5"
  v-on:click="signOut"
  >ログアウト</v-btn
>
<v-btn v-else text  class="ma-2" elevation="2" :to="'/login'"
  >ログイン</v-btn
>
<v-btn text  class="ma-2" elevation="2" :to="'/profile'"
  >プロフィール</v-btn
>

    </v-app-bar>
    <!-- main -->
    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
    <!-- footer -->
    <v-footer
      app
      color="orange"
      justify="center"
      class="py-4 text-center white--text"
    >
      <div class="text-center">
        {{ new Date().getFullYear() }} — <strong>法政Navi </strong>
      </div>
    </v-footer>
  </v-app>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import store from "./store";

export default {
  name: "App",
  components: {},
  data: () => ({
    user: "",
    drawer: false,
    links: [
      { name: "Home", to: "/" },
      { name: "サークル一覧", to: "/circles" },
      { name: "記事一覧", to: "/blogs" },
      { name: "About", to: "/about" },
    ],
    nav_lists: [
      { name: "Getting Started", icon: "mdi-vuetify" },
      { name: "Customization", icon: "mdi-cogs" },
      { name: "Styles & animations", icon: "mdi-palette" },
      { name: "UI Components", icon: "mdi-view-dashboard" },
      { name: "Directives", icon: "mdi-function" },
      { name: "Preminum themes", icon: "mdi-vuetify" },
    ],
  }),

  computed: {
    isLoggedIn() {
      console.log("ユーザー", this.$store.getters.user);
      return this.$store.getters.user !== null;
    },
  },
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    store.commit("UpdateUser", user);
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then((response) => {
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
