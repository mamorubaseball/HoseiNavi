<template>
  <div id="blogs" class="ml-10">
    <ul class="cards">
          <li v-for="(post,index) in posts" :key="post.slug + '_' + index" class="csscard box">
        <div class = "">
          <img
      v-if="post.featured_image"
      :src="post.featured_image"
      alt=""
      height="120" width="150"
    >
    <img
      v-else
      src="http://via.placeholder.com/250x250"
      alt=""
    >          
        <h3 class="csscard-title">{{ post["title"] }}</h3>
        <div class="csscard-content">
          <p>{{ post["summary"] }}</p>
        </div>
      </div>
      <!-- <div class="csscard-link-wrapper">
        <a href="" class="csscard-link">Learn More</a>
      </div> -->
    </li>

        </ul>

      <!-- `v-for` の生成、および Vue 用に `key` 属性の適用。ここでは、slug と index の組みを使用します -->
  <!-- <v-row class="pa-10">
  <v-col
    v-for="(post,index) in posts"
        :key="post.slug + '_' + index"
   cols="12"
   sm="4"
   align="center"
   >
    <v-card 
   
         height="240"
         width="240" 
      :to="'blogs/'+post.slug">
      <article class="media">
        <img
      v-if="post.featured_image"
      :src="post.featured_image"
      alt=""
      width="100"
      height="100"
    >
    <img
      v-else
      src="http://via.placeholder.com/250x250"
      alt=""
    >          
      <h2>{{ post.title }}</h2>
      <p>{{ post.summary }}</p>
      <p>カテゴリー:{{ post.categories[0].name}}</p>
      </article>
    </v-card>
  </v-col>
</v-row> -->
  </div>
</template>
 <script>
import butter from '../buttercms';
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
      butter.post.list({
        page: 1,
        page_size: 10,
      }).then((res) => {
        this.posts = res.data.data;
      });
    },
  },
  created() {
    this.getPosts();
  },
};
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
  overflow-y: hidden;

  scroll-snap-type: x mandatory;
}

.csscard {
  display: flex;
  flex-direction: column;
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

