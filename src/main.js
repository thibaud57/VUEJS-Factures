import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:3000';

// bootstrap-vue imports store & date
import './plugins/bootstrap-vue'
import './globalComponent'
import router from './router'
import store from './store'
import DateFilter from './plugins/date'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('date', DateFilter)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
