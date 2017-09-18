<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline">Frequently Asked Questions</div>
          </v-card-title>
          <v-card-text v-for="faq in faqItems" v-bind:key="faq.Category">
             <h5>{{faq.Category}}</h5>
             <v-expansion-panel>
                <v-expansion-panel-content v-for="qna in faq.Messages" :key="qna.question">
                    <div slot="header">{{qna.question}}</div>
                    <v-card>
                        <v-card-text v-for="answer in qna.answers" :key="answer">
                            <vue-markdown :html="true" :linkify="true" :source="answer"></vue-markdown>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
             </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {'vue-markdown': VueMarkdown},
    name: 'faq',
    data () {
      return {}
    },
    computed: {
      faqItems: function () {
        return this.$store.state.faqItems.slice(0)
      }
    }
  }

</script>