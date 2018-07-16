// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 

Vue.use(elementui);
=======
>>>>>>> 82d1b78b6c70f1b0a2e82b9e9cf1f980d10b58f0

const xlsx = require('xlsx');
const axios = require('axios');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


console.log(xlsx);