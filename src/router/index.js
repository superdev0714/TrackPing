import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/components/pages/Onboarding/Login/Login'
import DashboardLayout from '@/components/layouts/Dashboard/Dashboard'
import MonitorPage from '@/components/pages/Dashboard/Monitor/Monitor'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: ''
          // component: MonitorPage
        },
        {
          path: ':id',
          component: MonitorPage
        }
      ]
    }
  ]
})
