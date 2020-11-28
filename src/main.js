// Vue import.
import Vue from 'vue'

// Main app import.
import App from './App.vue'

// Plugins import.
import {
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons,
  LayoutPlugin
} from 'bootstrap-vue';
import axios from 'axios'


import 'material-colors';


// Vue modules adding to entry point ("main.js").
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(LayoutPlugin);


import router from './router';

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:8000/api/'
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
