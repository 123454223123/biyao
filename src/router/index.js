import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/go',
    name: 'go',
    component: () => import(/* webpackChunkName: "about" */ '../views/Go.vue')
  },
  {
    path: '/typeList',
    name: 'typeList',
    component: () => import(/* webpackChunkName: "about" */ '../views/TypeList.vue')
  },
  {
    path: '/shops',
    name: 'shops',
    component: () => import(/* webpackChunkName: "about" */ '../views/Shops.vue')
  },
  {
    path: '/searchlist',
    name: 'searchlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchList.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 
// router.beforeEach((to, from, next) => {
//   // console.log("1 beforeEach前置守卫")
// })

// router.beforeResolve((to, from, next) => {
//   // console.log("5 beforeResolve解析守卫")
//   next()
// })

// router.afterEach((to, from) => {
//   // console.log("6 afterEach后置守卫")

// })

export default router
