import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import App from './App.vue'
//require("../node_modules/vuetify/dist/vuetify.min.css")
new Vue({
  el: '#app',
  render: h => h(App)
})
