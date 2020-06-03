import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

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
      path: '/reporting',
      name: 'reporting',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Reporting.vue')
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
      path: '/reporttype',
      name: 'ReportType',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/ReportType.vue')
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
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/test',
      name: 'Test',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/test.vue')
    },
    {
      path: '/anex-1',
      name: 'Anex_1',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Anex_1.vue')
    },
    {
      path: '/anex-2',
      name: 'Anex_2',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Anex_2.vue')
    },
    {
      path: '/anex-1/:id',
      name: 'Anex_1_View',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Anex_1.vue')
    },
    {
      path: '/anex-2/:id',
      name: 'Anex_2_View',
      meta: {layout: 'main'},
      // lazy-loaded
      component: () => import('./views/Anex_2.vue')
    }
  ]
});

 router.beforeEach((to, from, next) => {
   const publicPages = ['/login'];
   const authRequired = !publicPages.includes(to.path);
   const loggedIn = localStorage.getItem('token');

   // trying to access a restricted page + not logged in
   // redirect to login page
   if (authRequired && !loggedIn) {
     next('/login');
   } else {
     next();
   }
 });
