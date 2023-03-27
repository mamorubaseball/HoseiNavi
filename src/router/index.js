import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import home2 from "../views/code.vue"
import Login from '../views/Login.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "home2",
    component: home2,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user) {
          user.getIdTokenResult(true).then((idTokenResult) => {
            if(idTokenResult.claims.Admin) {
              console.log(idTokenResult)
              next('/admin')
            } else {
              next('/')
            }
          })
        } else {
          next()
        }
      })
    }
  },
// アバウトページ
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
//サークル
  {
    path: '/circles',
    name: 'Circles',
    component: () => import(/* webpackChunkName: "circles" */ '../views/Circles.vue')
  },
  {
    path: '/circle/:campase/:category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "vategory" */ '../views/Category.vue')
  },

  {
    path: '/circle/:campase/:category/:email',
    name: 'Circle',
    component: () => import(/* webpackChunkName: "circle" */ '../views/Circle.vue')
  },

  //プロフィール
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user) {
          next()
        } else {
          next('/login')
        }
      })
    }
  },
   // buttercmsでブログ記事作成
   {
    path: '/blogs',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "blogs" */ '../views/Blogs.vue')
  },
  {
    path: '/blogs/:slug',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
