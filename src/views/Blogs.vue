<template>
  <div id="blogs">
      <h1>{{ page_title }}</h1>
      <!-- `v-for` の生成、および Vue 用に `key` 属性の適用。ここでは、slug と index の組みを使用します -->
      <v-row class="pa-5">
  <v-col
    v-for="(post,index) in posts"
        :key="post.slug + '_' + index"
   cols="12"
   sm="4"
   align="center">
    <v-card 
         height="240"
      :to="'blogs/'+post.slug">
      <article class="media">
        <img
      v-if="post.eyecatch"
      :src="post.eyecatch.url"
      alt=""
      height="100"
    >
    <img
      v-else
      src="http://via.placeholder.com/250x250"
      alt=""
    >          
      <h2>{{ post.title }}</h2>
      <p>{{ post.summary }}</p>
      <p>カテゴリー:{{ post.categories}}</p>
      </article>
    </v-card>
  </v-col>
</v-row>
  </div>
</template>
 <script>
// import butter from '../buttercms';
 export default {
  name: 'blogs',
  data() {
    return {
      page_title: '記事一覧',
      posts: [],
    };
  },
  methods: {
    getPosts() {
      const { createClient } = require('microcms-js-sdk');
      const client = createClient({ serviceDomain: 'hfzrg25gx0', apiKey: 'B0UKK0VyBQeZTfSaAoHrZyggBtBcR8mpyT8i' });
// service-domain は XXXX.microcms.io の XXXX 部分
client
  .get({
    endpoint: 'blogs',
  })
  .then((res) => {
    this.posts = res.contents;
    console.log(res.contents[0])
  }
  )
  .catch((err) => console.log("cmsエラー",err));
    },
  },
  created() {
    this.getPosts();
  },
};
</script>
 <style lang="scss" scoped>
 #blogs {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 </style>