＿<template>
    <div class="circle pa-10">
    <v-row jsutify="center">
      <v-col md="1"></v-col>
      <!-- 中身 -->
      <v-col md="8" class="main-content">
        <h1>{{ post.title }}</h1>
    <h4>カテゴリー：{{ post.category.name }}</h4>
    
        <div v-html="post.content"></div>
      </v-col>
      <!-- 目次 -->
      <v-col md="3">
        <v-list class="toc">
    <v-subheader>目次</v-subheader>
    <v-list-item 
      v-for="item in toc"
      :key="item.id"
      :to="`#${item.id}`"
    >
    <!-- <a href="#ha214098e44">{{ item.text }}</a> -->
      <v-list-item-title>{{ item.text }}</v-list-item-title>
      <!-- <router-link :to="`#${item.id}`">{{ item.text }}</router-link> -->
    </v-list-item>
  </v-list>
               
      </v-col>
    </v-row>
  </div>
</template>
 <script>
// import butter from '../buttercms';

 export default {
  name: 'blog',
  data() {
    return {
      post: {},
      toc:{},
    };
  },
  methods: {
    getPost() {
      console.log("blogページ")
      console.log(this.$route.params.id)
      const { createClient } = require('microcms-js-sdk');
      const client = createClient({ serviceDomain: 'hfzrg25gx0', apiKey: 'B0UKK0VyBQeZTfSaAoHrZyggBtBcR8mpyT8i' });
      client
  .get({
    endpoint: 'blogs',
    contentId: this.$route.params.id
  })
  .then((res) => {
    this.post = res;

    const cheerio = require('cheerio');
    const $ = cheerio.load(res.content);
const headings = $('h1, h2, h3').toArray();
const toc = headings.map(data => ({
  text: data.children[0].data,
  id: data.attribs.id,
  name: data.name
}));
console.log(toc)
this.toc = toc;

    console.log(res)
  }
  )
  .catch((err) => console.log("cmsエラー",err));
    },
    
   
  },
  watch: {
    $route() {
      this.getPost();
    },
  },
  created() {
    this.getPost();
  },
};
</script>

<style scoped>
/* スタイル */
/deep/ h2 {
    margin-top: 2.4em;
    margin-bottom: 1.62em;
    background-color: transparent;
    padding: 0;
    font-size: 1.8rem;
    text-indent: 0.5em;
    line-height: 1.25;
    font-weight: bold;
}

/deep/ h2::after {
    margin-top: 0.3em;
    content: "";
    display: block;
    height: 8px;
    position: relative !important;
    background-image: linear-gradient( 165deg, #ffe259 0%, #ffa751 20%);
}


/deep/ .h3 {
  border-left: 7px solid #777;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size: 22px;
  padding: 12px 20px;
}

/* メインコンテンツ */
/deep/ .main-content{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 80;
  /* margin-inline: 100px; */
  padding-inline: 30px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: white;
}
/* 横目次*/
/deep/ .toc{
  background-color: white;
  /* border-radius: 10px; */
  padding: 1rem; 
  /* margin-left: 1rem; */
  position: sticky;
  top: 20rem; 
  max-height: 90vh;
  /* overflow: scroll; */
  font-size: 1.2rem;
}


</style>
