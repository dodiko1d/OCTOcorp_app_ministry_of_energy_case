// Vue import.
import Vue from 'vue';

// Main app import.
import App from './App.vue';

import axios from 'axios';
// window.$qs = require('qs');
import './assets/js/python';

import 'material-colors';
import router from './router';

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:8000/'
    })
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.prototype.$axios = axios

// App's rendering for "index.html".
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
