import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import { scan } from 'qr-scanner-wechat';
Vue.config.productionTip = false;
window.scan = scan

 const router = new VueRouter({
    routes,
  });
 new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#appVueHash');