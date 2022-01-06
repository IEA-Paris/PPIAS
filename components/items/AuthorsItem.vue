<template>
  <v-col v-bind="$attrs">
    <v-card nuxt :to="localePath('/articles/' + item.slug + '/authors')">
      <v-card-title>{{ item.firstname + ' ' + item.lastname }}</v-card-title>
      <v-card-actions>
        <v-tooltip v-for="social in getSocials(item)" :key="social.link" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :key="social.link"
              icon
              text
              :href="social.link"
              target="_blank"
              v-on="on"
              @click.stop
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ social.tooltip }}</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <!--    <p v-html="highlight(item.presentation, search)"></p> -->
    <!--     <small v-if="item.copyright" class="muted caption">Image of &copy; {{ item.copyright }}</small> -->
    <!--     <v-expansion-panels v-if="mentor" class="mt-6">
      <v-expansion-panel>
        <v-expansion-panel-header>References</v-expansion-panel-header>
        <v-expansion-panel-content>
          <nuxt-content :document="item" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> -->
  </v-col>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    highlight: (word = '', query) => {
      const check = new RegExp(query, 'ig')
      return word.replace(check, function (matchedText, a, b) {
        return '<strong style="color: darkslategray;background-color: yellow;">' + matchedText + '</strong>'
      })
    },
    getSocials(item) {
      const socials = []
      if (item.social_channels.website)
        socials.push({
          link: item.social_channels.website,
          icon: 'mdi-link-variant',
          tooltip: 'Visit this author website',
        })
      if (item.social_channels.wikipedia)
        socials.push({
          link: item.social_channels.wikipedia,
          icon: 'mdi-wikipedia',
          tooltip: 'Check the Wikipedia page of the author',
        })
      if (item.social_channels.orcid)
        socials.push({
          link: item.social_channels.orcid,
          icon: 'mdi-account',
          tooltip: 'Visit the author Orcid page',
        })
      if (item.social_channels.google_scholar)
        socials.push({
          link: item.social_channels.google_scholar,
          icon: 'mdi-link-variant',
          tooltip: 'Visit the author Google Scholar page',
        })
      if (item.social_channels.mendeley)
        socials.push({
          link: item.social_channels.mendeley,
          icon: 'mdi-link-variant',
          tooltip: 'Visit the author Mendeley page',
        })
      if (item.social_channels.researchgate)
        socials.push({
          link: item.social_channels.researchgate,
          icon: 'mdi-link-variant',
          tooltip: 'Visit the author Researchgate page',
        })

      if (item.social_channels.linkedin)
        socials.push({
          link: item.social_channels.linkedin,
          icon: 'mdi-linkedin',
          tooltip: 'Get in touch on Linkedin',
        })
      if (item.social_channels.twitter)
        socials.push({
          link: item.social_channels.twitter,
          icon: 'mdi-twitter',
          tooltip: 'Follow this author on Twitter',
        })

      if (item.social_channels.instagram)
        socials.push({
          link: item.social_channels.instagram,
          icon: 'mdi-instagram',
          tooltip: 'Visit the author Instagram page',
        })

      return socials
    },
  },
}
</script>

<style lang="scss"></style>
