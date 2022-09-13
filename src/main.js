// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import topbar from './components/topbar'
import API from './api/api'
import store from "./store"
import conf from "./js/conf";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$conf = conf;

//global filters
import * as filters from "./filter";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.api = new API(conf.wsUrl);
Vue.prototype.api.open();

Vue.prototype.log = console;

Vue.config.productionTip = false;
Vue.component('topbar', topbar);
Vue.use(topbar);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
