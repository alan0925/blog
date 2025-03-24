import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'
import Board from '@/views/Message.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import('@/views/Home.vue')
    },
    {
      path:'/article',
      component:()=>import('@/views/Article.vue')
    },
    {
      path:'/board',
      component:()=>import('@/views/Message.vue')
    },{
      path:'/login',
      component:()=>import('@/views/Login.vue')
    }
  ],
})

export default router
