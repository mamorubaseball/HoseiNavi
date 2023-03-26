<template>
  <v-app id="login">
    <v-main>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="3"
            xl="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="orange"
                dark
                flat
              >
                <v-toolbar-title>サークル管理画面へログインする</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signIn">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.emailMatch]"
                    prepend-icon="mdi-email"
                    type="email"
                    label="メールアドレス"
                  />

                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.len]"
                    prepend-icon="mdi-lock"
                    :type="show ? 'text' : 'password'"
                    label="パスワード"
                    counter
                    @click:append="show = !show"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="signIn" color="orange">ログイン</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data () {
    return {
      show: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || '必須',
        len: v => v.length >= 6 || '6文字以上(半角英数のみ)',
        emailMatch: v => /.+@.+\..+/.test(v) || '正しいメールアドレスを入力してください',
      },
    }
  },
  methods: {
    signIn() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(response => {
          this.$store.commit('login',this.email)
          console.log("ログイン",this.email)
          console.log(response)

          // ログインに成功したらプロフィールページにリダイレクト
          this.$router.push('/profile')
        })
        .catch(e => {
          switch(e.code) {
            case 'auth/wrong-password':
              alert('パスワードが違います')
              break
            case 'auth/invalid-email':
              alert('無効のメールアドレスです')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません')
              break
            case 'auth/weak-password':
              alert('6文字以上でパスワードを設定してください')
              break
            case 'auth/email-already-in-use':
              alert('すでに存在しているメールアドレスです')
              break
            default:
              break
          }
        })
    }
  }
}   
</script>