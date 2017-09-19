import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ViewRelease from '../components/ViewRelease'
import ListRelease from '../components/ListRelease'
import AboutDevice from '../components/AboutDevice'
import Faq from '../components/Faq'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ViewRelease
    },
    {
      path: '/releases',
      name: 'releases',
      component: ListRelease
    },
    {
      path: '/about',
      name: 'about',
      component: AboutDevice
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
