// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'

Vue.use(VueAxios, axios)

sync(store, router)

Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.get_auth

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',

  components: { App }
})
