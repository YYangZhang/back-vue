import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import( '../views/menu.vue'),
    children: [{
      // 系统概述
        path: '',
        name: 'describ',
        component: () => import('../views/describ.vue')
      },
      {
        path: '/loginlog',
        name: 'loginlog',
        component: () => import('../views/loginlog.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
