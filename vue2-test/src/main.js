import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

Vue.config.productionTip = false;


 const router = new VueRouter({
    routes,
  });
 new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#appVueHash');