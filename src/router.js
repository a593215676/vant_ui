import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        isShow:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue'),
      meta:{
        isShow:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue'),
      meta:{
        isShow:true
      }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import(/* webpackChunkName: "about" */ './views/Mypage.vue'),
      meta:{
        isShow:true
      }
    },
    {
      path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/Details.vue'),
      meta: {
        isShow: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      meta: {
        isShow: false
      }
    },
    {
      path: '/getCollection',
      name: 'getCollection',
      component: () => import(/* webpackChunkName: "about" */ './views/GetCollection.vue'),
      meta: {
        isShow: false
      }
    }

  ]
})
