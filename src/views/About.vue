<template>
  <div id="about" class="">
    <div class="head">
      <div class="header-content">
        <h1>
        法政を<span>世界一</span>の
        <br />
        学び場にする
      </h1>
      <p>
        正しい知識をまっとうに伝え、
        <br />
        法政生の意思決定・生活を支えるメディア
      </p>
      </div>
    </div>

    <h2 class="pt-5">法政ナビを開発したワケ</h2>
    <div id="text" class="p-5">
      <p>
        2020年3月、コロナウイルスが日本に襲い掛かってた出来事は今でも忘れられません。<br />
        コロナウイルスがもたらす影響は日本全国はもちろん、私たち大学生にも多大な影響を与えました。
      </p>
      <p class="font-weight-bold">
        オンライン授業。サークル活動の停止。大学利用時間の短縮。
      </p>

      <p>
        そんなコロナ禍で入学された学生と対談する機会がありました。<br />
        その中で出てきた言葉が僕の心に刺さりました。
      </p>
      <p class="font-weight-bold">
        『オンライン授業だけで学生生活が終わってしまうのは嫌だ』<br />
        『もっと大学生活を楽しみたい』
      </p>
      <p>
        これを聞いた僕は新入生が大学生活を楽しめるサービスを創ろうと思い、この法政ナビの開発を考えました。
      </p>
    </div>

    <h2 class="pt-5">メンバー</h2>
    <v-card class="mx-auto rounded" width="80%" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline">
            <h2>Engineer 谷本 守</h2>
          </div>
          <div class="text-left ml-10">
            <li>法政大学理工学部機械工学科</li>
            <li>夢は『プログラミングでワクワクする世界を創る』</li>
            <li>学生時代はボクシング部に所属</li>
            <li>趣味はプログラミング・筋トレ・サウナ</li>
            <li><a href="https://github.com/mamorubaseball">github</a></li>
            <li><a href="https://twitter.com/mamoblog">twitter</a></li>
            <li><a href="https://qiita.com/mamorubaseball">qiita</a></li>
          </div>
        </v-list-item-content>

        <v-list-item-avatar size="200" class="mr-10 rounded-circle">
          <img :src="mamoru_img" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "About",
  data: () => ({
    mamoru_img: require("@/assets/tanimoto.jpeg"),
  }),
};
</script>

<style scoped>
#about {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.head {
  height: 60vh;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  padding-right: 20px;
  padding-left: 100px; 
  /* background-color: #fff; */
  background-image: url("../assets/campase/法政大学小金井.jpeg");
  background-size: cover;
}

/* containerクラス */
.header-content{
  margin-top: 20px;
  margin-bottom: 20px;
}

.header-content h1 {
  display: block;
  font-size: 3em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.header-content p{
  display: block;
  font-size: 1em;
    margin-block-start: 1em;
    margin-block-end: 1em; 
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

/*  */

</style>
