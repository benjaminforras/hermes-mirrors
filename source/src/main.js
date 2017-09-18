// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueMoment)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  },
  mounted: function () {
    this.$store.dispatch('loadReleases')
    this.$store.dispatch('loadFaq')
    this.$store.dispatch('loadAFH')
  }
})

import('../node_modules/vuetify/dist/vuetify.min.css')
