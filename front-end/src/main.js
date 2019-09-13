import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import vSuggest from 'v-suggest'
import 'vue-material/dist/vue-material.min.css'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(vSuggest)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
