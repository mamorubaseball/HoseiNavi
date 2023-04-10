<template>
  <div id="blog-post">
    <h1>{{ post.title }}</h1>
    <h4>カテゴリー：{{ post.category.name }}</h4>
    <div v-html="post.content"></div>
  </div>
</template>
 <script>
// import butter from '../buttercms';

 export default {
  name: 'blog',
  data() {
    return {
      post: {},
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