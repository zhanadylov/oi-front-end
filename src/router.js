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
      meta: {layout: 'main'},
      component: Home
    },
    {
      path: '/home',
      meta: {layout: 'main'},
      component: Home
    },
    {
      path: '/login',
      meta: {layout: 'auth'},
      component: Login
    },
    {
      path: '/register',
      meta: {layout: 'auth'},
      component: Register
    },
    {
      path: '/reporting',
      name: 'reporting',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Reporting.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/report',
      name: 'report',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Report.vue')
    },
    {
      path: '/report/:id',
      name: 'ReportView',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Report.vue')
    },
    {
      path: '/admin/report/:id',
      name: 'ReportView',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Report.vue')
    },
    {
      path: '/company',
      name: 'Company',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Company.vue')
    },
    {
      path: '/facts',
      name: 'Facts',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Facts.vue')
    },
    {
      path: '/facts-archive',
      name: 'FactsArchive',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/ArchiveFacts.vue')
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
