import Vue from 'vue'
import store from '../store'
import vuerouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Home from '../views/Home.vue'


Vue.use(vuerouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component:Login,
    meta:{
      title:'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component:Register,
    meta:{
      title:'Register'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      auth:true,
      title:'home CRUD user'
    }
  },
    { path: '/404', component: Login },  
    { path: '*', redirect: '/404' },

];



const router = new vuerouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to,from, next) => {
  document.title=to.meta.title;
    if (to.meta.auth == true) {
      try {
        await store.dispatch('profile');
        return next()
      }catch (error) {
        return next('/login')
      }
    }else{
      return next()
    }
  });


export default router
