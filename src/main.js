// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueCookie from 'vue-cookie'

import router from './router'
import { interceptRouter } from './router/middleware'
import mixin from './mixins'
import store from './store'

import App from './App'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueCookie)
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' })
Vue.mixin(mixin)

// Vue.axios.defaults.baseURL = 'http://localhost:3000/api/'

// Vue.axios.interceptors.request.use(request => {
//   request.headers['Content-Type'] = 'application/json'
//   if (VueCookie.get('token')) {
//     request.headers['token'] = VueCookie.get('token')
//     console.log('added SPA token to an outgoing request')
//   } else {
//     console.log("no SPA token found, so it wasn't added to this request.")
//   }
//   return request
// })

// Vue.axios.interceptors.response.use(response => response, error => {
//   console.log('intercepted response error', error)
//   if (error.response.status === 401) {
//     console.log('received 401 response, redirecting')
//     router.replace('/login')
//   }
// })
interceptRouter(router)

Vue.config.debug = true

Vue.config.lang = 'en'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
