import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ViewReport from './views/ViewReport'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/viewReport/:id',
      name: 'viewReport',
      component: ViewReport
    },
    {
      path: "/manageReport",
      name: "manageReport",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ManageReport/ManageReport")
    },
    {
      path: "/viewReports",
      name: "viewReports",
      component: () =>
        import("./views/ManageReport/ViewReports")
    },
    {
      path: "/viewReports/:id",
      name: "viewReportById",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ManageReport/ManageReport"),
      props: true
    }
  ]
})