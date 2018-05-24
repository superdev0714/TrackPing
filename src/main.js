// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueCookie from 'vue-cookie'
import firebase from 'firebase'

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

interceptRouter(router)

Vue.config.debug = true
Vue.config.lang = 'en'
Vue.config.productionTip = false

let app
let config = {
  apiKey: 'AIzaSyD10IScK7GA9UPBzBlyCuAAddEWvvQCo1M',
  authDomain: 'baitphone-c6b9f.firebaseapp.com',
  databaseURL: 'https://baitphone-c6b9f.firebaseio.com',
  projectId: 'baitphone-c6b9f',
  storageBucket: 'baitphone-c6b9f.appspot.com',
  messagingSenderId: '65622376764'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {
        App
      }
    })
  }
})
