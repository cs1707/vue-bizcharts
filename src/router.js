import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Pie from './views/Pie.vue'
import Area from './views/Area.vue'
import Guide from './views/Guide.vue'
import Facet from './views/Facet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pie',
      name: 'pie',
      component: Pie
    },
    {
      path: '/area',
      name: 'area',
      component: Area
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide
    },
    {
      path: '/facet',
      name: 'facet',
      component: Facet
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
