import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/demo/area',
      component: () => import('./views/area/index.js')
    },
    {
      path: '/demo/bar',
      component: () => import('./views/bar/index.js')
    },
    {
      path: '/demo/facet',
      component: () => import('./views/facet/index.js')
    },
    {
      path: '/demo/funnel',
      component: () => import('./views/funnel/index.js')
    },
    {
      path: '/demo/guage',
      component: () => import('./views/guage/index.js')
    },
    {
      path: '/demo/guide',
      component: () => import('./views/guide/index.js')
    },
    {
      path: '/demo/heatmap',
      component: () => import('./views/heatmap/index.js')
    },
    {
      path: '/demo/line',
      component: () => import('./views/line/index.js')
    },
    {
      path: '/demo/map',
      component: () => import('./views/map/index.js')
    },
    {
      path: '/demo/others',
      component: () => import('./views/others/index.js')
    },
    {
      path: '/demo/pie',
      component: () => import('./views/pie/index.js')
    },
    {
      path: '/demo/point',
      component: () => import('./views/point/index.js')
    },
    {
      path: '/demo/relation',
      component: () => import('./views/relation/index.js')
    },
    {
      path: '/demo/theme',
      component: () => import('./views/theme/index.js')
    }
  ]
})
