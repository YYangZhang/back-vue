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
        // 登录日志
        path: '/loginlog',
        name: 'loginlog',
        component: () => import('../views/loginlog.vue')
      },
      {
        // 补单/退款 密码管理
        path: '/pwdManager',
        name: 'pwdManager',
        component: () => import('../views/pwdManager.vue')
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
