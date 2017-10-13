import VueRouter from 'vue-router'
import Home from './Home.vue';

const routes = [
    { path: '/', component: Home },
    //{ path: '/bar', component: Bar }
]
  
  
const router = new VueRouter({
    routes // short for `routes: routes`
})

export default router
  