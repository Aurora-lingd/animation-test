import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { 
    name: 'page1',
    path: '/',
    component: () => import('../pages/page1.vue')
  },
  {
    name: 'page2',
    path: '/page2',
    component: () => import('../pages/page2.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router