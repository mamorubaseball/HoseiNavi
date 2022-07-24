import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/firebase.js'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
