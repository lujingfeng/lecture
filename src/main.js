import Vue from 'vue'
import App from './components/app'
import router from './router'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
