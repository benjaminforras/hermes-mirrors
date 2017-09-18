<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-if="release">
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{release.name}}</div>
                    <span class="grey--text">{{release.published_at | moment("dddd, MMMM Do YYYY")}} - {{release.pre_release ? 'Pre-release' : 'Release'}}</span>
                </div>
            </v-card-title>
            <v-expansion-panel>
                <v-expansion-panel-content>
                    <div slot="header"><strong>Click here to view the changelog</strong></div>
                    <v-card-text>
                    <vue-markdown :html="true" :linkify="true" :source="release.body"></vue-markdown>
                    </v-card-text>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-list>
                <v-list-tile avatar v-for="asset in release.assets" v-bind:key="asset.id" v-tooltip:top="{ html: 'Downloaded ' + asset.download_count + ' time(s)' }" :href="asset.browser_download_url" :ripple="true">
                    <v-list-tile-action>
                        <v-icon>file_download</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="asset.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <div id="view-release">
                <v-speed-dial :direction="'bottom'" :right="true" :top="true" :hover="true" :transition="'slide-y-reverse-transition'">
                    <v-btn slot="activator" class="blue darken-2" dark fab hover>
                        <v-icon>share</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn onclick="window.open('https://t.me/share/url?url=' + encodeURIComponent(window.location.href), '_blank')" v-tooltip:left="{ html: 'Share on Telegram' }" class="blue darken-1 white--text">
                        Telegram
                    </v-btn>
                    <v-btn onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(window.location.href), '_blank')" v-tooltip:left="{ html: 'Share on Google+' }" class="orange accent-4 white--text">
                        Google+
                    </v-btn>
                    <v-btn onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')" v-tooltip:left="{ html: 'Share on Facebook' }" class="blue darken-4 white--text">
                        Facebook
                    </v-btn>
                </v-speed-dial>
            </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {'vue-markdown': VueMarkdown},
  name: 'view-release',
  data () {
    return {}
  },
  computed: {
    release: function () {
      return this.$store.getters.getReleaseById(this.$route.params.id)
    }
  }
}
</script>

<style>
  #view-release .speed-dial {
    position: absolute;
  }

  #view-release .btn--floating {
    position: relative;
  }
</style>