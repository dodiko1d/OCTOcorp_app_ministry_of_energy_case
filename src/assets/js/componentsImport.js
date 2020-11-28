// Script for loading all components from components path.
// Idea authors: https://gist.github.com/eirikb/6f2e47d6806b8be6e67129b13ae05820
import Vue from 'vue'


const req = require.context('../../vue-components/', false, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key).default)
});

