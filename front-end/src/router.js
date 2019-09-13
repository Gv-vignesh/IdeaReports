import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateReport from './views/CreateReport.vue'
import ViewReport from './views/ViewReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/viewReport/:id',
      name: 'viewReport',
      component: ViewReport
    },{
      path:'/createReport',
      name: 'createReport',
      component: CreateReport
    }
  ]
})
