<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-icon="search"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="search && search.length > 0">
        <v-card>
          <v-card-title>
            <div class="headline">Search</div>
          </v-card-title>
            <v-list two-line subheader v-if="searchRelease.length > 0">
              <v-list-tile avatar @click="$router.push('/detail/' + release.id)" v-for="release in searchRelease" :key="release.id">
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
            <v-alert info value="true" v-else>
              No release was found
            </v-alert>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline">Latest Releases</div>
          </v-card-title>
          <v-list two-line subheader>
            <v-list-tile avatar @click="$router.push('/detail/' + release.id)" v-for="release in latestReleases" :key="release.id">
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
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        search: '',
        items: [
          'MIUI',
          'LineageOS 13',
          'Resurrection Remix',
          'Flyme',
          'Kernel',
          'TWRP'
        ]
      }
    },
    computed: {
      latestReleases: function () {
        return this.$store.state.releases.slice(0, 5)
      },
      searchRelease: function () {
        return this.$store.state.releases.filter(
          item => {
            if (item.name.toLowerCase().search(this.search.toLowerCase()) !== -1 || item.tag_name.toLowerCase().search(this.search.toLowerCase()) !== -1 || item.id.toString().search(this.search.toLowerCase()) !== -1) {
              return true
            }
          }
        )
      }
    }
  }
</script>

<style></style>
