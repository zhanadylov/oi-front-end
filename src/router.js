import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/reporting',
      name: 'reporting',
      // lazy-loaded
      component: () => import('./views/Reporting.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/report',
      name: 'report',
      // lazy-loaded
      component: () => import('./views/Report.vue')
    },
    {
      path: '/report/:id',
      name: 'ReportView',
      // lazy-loaded
      component: () => import('./views/Report.vue')
    },
    {
      path: '/admin/report/:id',
      name: 'ReportView',
      // lazy-loaded
      component: () => import('./views/Report.vue')
    }
  ]
});

 router.beforeEach((to, from, next) => {
   const publicPages = ['/login', '/register', '/home'];
   const authRequired = !publicPages.includes(to.path);
   const loggedIn = localStorage.getItem('token');
   const role = localStorage.getItem('role')

   // trying to access a restricted page + not logged in
   // redirect to login page
   if (authRequired && !loggedIn) {
     next('/login');
   } else {
     next();
   }
 });
