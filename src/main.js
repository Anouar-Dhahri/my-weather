import Vue from 'vue'
import App from './App.vue'

import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

const options = {
  draggable: false,
  transitionDuration:1000
}

Vue.config.productionTip = false

Vue.use(Toast, options);

new Vue({
  render: h => h(App),
}).$mount('#app')
