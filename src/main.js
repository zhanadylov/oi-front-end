import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store'; 
import { router } from './router';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.css'
import { IconsPlugin } from 'bootstrap-vue'



// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
