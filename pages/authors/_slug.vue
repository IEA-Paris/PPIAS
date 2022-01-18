<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card>
        <div class="d-flex">
          <v-btn tile text nuxt :to="localePath('/authors')" small class="py-7">
            <v-icon left>mdi-chevron-left</v-icon>
            {{ $t('back') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                v-if="item"
                text
                class="py-7"
                tile
                v-bind="attrs"
                nuxt
                :href="'/authors/' + item.slug"
                target="_blank"
                :title="item.post_title"
                small
                v-on="on"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
            <span>Open in a new tab</span>
          </v-tooltip>
        </div>
        <template v-if="item">
          <PageTitle :text="item.firstname + ' ' + item.lastname" class="pa-6">
            <template v-if="getSocials(item).length">
              <v-tooltip
                v-for="social in getSocials(item)"
                :key="social.link"
                bottom
              >
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
            </template>
          </PageTitle>
          <v-card-text>
            <div class="d-flex justify-center">
              <nuxt-content
                :document="item"
                style="max-width: 650px"
                class="page a4"
              />
            </div>

            <template v-if="articles.length">
              <div class="text-h5 ma-6">
                {{ $t('articles-from-this-author') }}
                <v-divider></v-divider>
              </div>
              <RegularList
                :data="{ items: articles }"
                type="articles"
              ></RegularList>
            </template>
          </v-card-text>
        </template>
        <div v-else>
          {{ $t('author-unavailable') }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    console.log('params.slug: ', params.slug)
    const item = (
      await $content('authors', { deep: true })
        .where({
          slug: params.slug,
        })
        .fetch()
    )[0]
    const articles = item?.articles?.length
      ? await $content('articles', { deep: true })
          .where({
            path: { $in: item.articles },
          })
          .fetch()
      : []
    return {
      item,
      articles,
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
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
          icon: 'mdi-google',
          tooltip: 'Visit the author Google Scholar page',
        })
      if (item.social_channels.mendeley)
        socials.push({
          link: item.social_channels.mendeley,
          icon: 'mdi-school',
          tooltip: 'Visit the author Mendeley page',
        })
      if (item.social_channels.researchgate)
        socials.push({
          link: item.social_channels.researchgate,
          icon: 'mdi-flask',
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
