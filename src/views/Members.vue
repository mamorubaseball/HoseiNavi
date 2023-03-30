<template>
  <section class="members">
    <div class="members_caption">
      <h2>メンバー</h2>

      <v-row class="members-list">
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card
            class="member round mx-auto"
            width=""
            outlined
            :elevation="20"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="member-name">
                  <h3>谷本守</h3>
                </div>
                <div class="pl-5 pt-3 member-content">
                  <div class="">
                    <li>法政大学理工学部機械工学科</li>
                    <li>
                      『プログラミングでワクワクする世界を創る』をモットーに活動しています。
                    </li>
                    <li>趣味:プログラミング・筋トレ・サウナ</li>
                  </div>
                  <div class="icon pt-3">
                    <v-row>
                      <v-col cols="4">
                        <a href="https://github.com/mamorubaseball">
                          <v-icon left color="#1DA1F2">{{
                            mdiTwitterSvgPath
                          }}</v-icon>
                          Twitter
                        </a>
                      </v-col>
                      <v-col cols="4">
                        <a href="https://github.com/mamorubaseball">
                          <v-icon left color="#211F1F">{{
                            mdiGithubSvgPath
                          }}</v-icon>
                          <span>Github</span>
                        </a>
                      </v-col>
                      <v-col cols="4">
                        <a href="https://qiita.com/mamorubaseball">
                          <!-- <v-icon left color="#211F1F">{{ mdiQiitaSvgPath }}</v-icon>  
      <v-icon class="mdi qiita"></v-icon> -->
                          <v-icon left color="#4cb10d">{{ qiitaIcon }}</v-icon>
                          <span>qiita</span>
                        </a>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-list-item-content>

              <v-list-item-avatar size="150" class="mr-5 rounded-circle">
                <img :src="mamoru_img" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card
            class="member round mx-auto"
            width=""
            outlined
            :elevation="20"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="member-name">
                  <h3>募集中...</h3>
                </div>
                <div class="pl-10 member-content">
                  <div class="icon pt-3">
                    <v-row>
                      <v-col cols="4">
                        <a href="https://github.com/mamorubaseball">
                          <v-icon left color="#1DA1F2">{{
                            mdiTwitterSvgPath
                          }}</v-icon>
                          Twitter
                        </a>
                      </v-col>
                      <v-col cols="4">
                        <a href="https://github.com/mamorubaseball">
                          <v-icon left color="#211F1F">{{
                            mdiGithubSvgPath
                          }}</v-icon>
                          <span>Github</span>
                        </a>
                      </v-col>
                      <v-col cols="4">
                        <a href="https://qiita.com/mamorubaseball">
                          <!-- <v-icon left color="#211F1F">{{ mdiQiitaSvgPath }}</v-icon>  
      <v-icon class="mdi qiita"></v-icon> -->
                          <v-icon left color="#4cb10d">{{ qiitaIcon }}</v-icon>
                          <span>qiita</span>
                        </a>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-list-item-content>

              <v-list-item-avatar size="150" class="mr-5 rounded-circle">
                <img :src="none" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import { mdiTwitter, mdiGithub, mdiNoteEditOutline } from "@mdi/js";

export default {
  name: "Members",
  data: () => ({
    mamoru_img: require("@/assets/tanimoto.jpeg"),
    mdiTwitterSvgPath: mdiTwitter,
    mdiGithubSvgPath: mdiGithub,
    qiitaIcon: mdiNoteEditOutline,
  }),
};
</script>
<style scoped>
h2 {
  letter-spacing: 3.2px;
  text-align: center;
  margin: auto;
  border-bottom: 3px solid gray;
  font-size: 32px;
  padding: 0 0 30px;
  max-width: 300px;
  font-weight: 700;
}
h3 {
  text-align: center;
}
a {
  color: inherit; /* 親要素の色を継承 */
  text-decoration: none; /* 下線をなくす */
  cursor: pointer; /* マウスカーソルをポインターに変更 */
}

.members_caption {
  padding: 100px 0;
}
.members-list {
  padding: 50px 30px;
}
.member {
  /* height: 22vh; */
  background-color: #f1f5f9;
}
.round {
  border-radius: 20px; /* Adjust the value as needed */
}
</style>
