import VueRouter from 'vue-router'
import Home from './Home.vue';
import Dashboard from './Dashboard.vue';
import Success from './Success.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/sucess',
        component: Success
    }, 
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            console.log('====================================');
            console.log(to);
            console.log(from)
            console.log(next)
            console.log('====================================');
            //  if (localStorage.getItem('user')) {
            next()
            // }else{     next({path:"/"}) }

        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes 
})

export default router
