<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">Releases</div>
                </div>
            </v-card-title>
            <v-list two-line subheader>
                <v-list-tile avatar @click="$router.push('/detail/' + release.id)" v-for="release in releases" :key="release.id">
                <v-list-tile-avatar>
                    <v-icon>insert_drive_file</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{release.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{release.published_at | moment("dddd, MMMM Do YYYY")}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                    <v-icon class="grey--text text--lighten-1">info</v-icon>
                    </v-btn>
                </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 text-xs-center>
        <v-pagination :length="pages" v-model="page"></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'release-list',
  data  () {
    return {
      page: 1,
      releasePerPage: 6
    }
  },
  computed: {
    releases: function () {
      var array = this.$store.state.releases.slice(0)
      var page = this.page
      --page
      return array.slice(page * this.releasePerPage, (page + 1) * this.releasePerPage)
    },
    pages: function () {
      return Math.ceil(this.$store.state.releases.length / this.releasePerPage)
    }
  }
}

</script>