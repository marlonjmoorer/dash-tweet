import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './components/Routes';

Vue.use(VueRouter)
Vue.use(Vuetify)

import App from './App.vue'
//require("../node_modules/vuetify/dist/vuetify.min.css")
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
