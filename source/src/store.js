import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  releases: [],
  faqItems: [],
  afhFolders: []
}

// getters are functions
const getters = {
  getReleases: (state, getters) => {
    return state.releases
  },
  getReleaseById: (state, getters) => (id) => {
    return state.releases.find(release => release.id.toString() === id.toString())
  },
  getFaqItems: (state, getters) => {
    return state.faqItems
  }
}

const actions = {
  loadReleases: () => {
    axios.get('https://api.github.com/repos/TryHardDood/hermes-mirrors/releases')
      .then(function (response) {
        state.releases = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  loadFaq: () => {
    axios.get('static/faq.json')
      .then(function (response) {
        state.faqItems = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  loadAFH: () => {
    axios.get('static/afhFolders.json')
      .then(function (response) {
        state.afhFolders = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters
})
