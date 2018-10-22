// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import 'babel-polyfill'

Vue.use(elementui);

const xlsx = require('xlsx');
import axios from 'axios'

axios.defaults.withCredentials=true;

if(location.hostname === 'localhost'){

}else {
	axios.defaults.baseURL = process.env.API;
}

Vue.prototype.axios = axios;		//将axios放置vue实例的原型链上，每个组件均可使用axios


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// console.log(axios);