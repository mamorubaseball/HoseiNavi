<template>
  <div id="home">
    <div class="pa-10">
    <v-form
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="setQuery"
        dense
        hide-details
        rounded
        clearable
        placeholder="キーワードを入力"
        :solo="isFocused"
        :filled="!isFocused"
        :style="{ minWidth: '180px' }"
        @focus="focus"
        @blur="blur"
      />
    </v-form>
    </div>
    <div class="pb-5">
<h1>人気記事</h1>
    <blogs></blogs>
</div>
<h1>サークル一覧</h1>
<circles></circles>
</div>

</template>

<script>
import blogs from "../components/Blogs.vue";
import circles from "../components/Circles.vue";

export default {
  name: 'Home',
  data:()=>({
    message:'検索キーワードを入力して下さい。',
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
  methods: {

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