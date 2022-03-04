<template>
  <v-card nuxt :to="localePath('/authors/' + item.slug)">
    <v-row class="mt-6" no-gutters>
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="3"
        lg="2"
        col-md-offset="1"
        class="d-flex flex-column py-6 align-center"
      >
        <v-avatar :size="$vuetify.breakpoint.xl ? '180' : '120'" class="mb-3">
          <OptimizedImage
            v-if="item.image"
            alt="Avatar"
            :src="item.image"
            :height="$vuetify.breakpoint.xl ? '180' : '120'"
            :ratio="1"
          />
          <v-icon v-else class="white--text headline author-picture">{{
            item.firstname[0] + item.lastname[0]
          }}</v-icon>
        </v-avatar>
        <div class="flex-row justify-center">
          <v-tooltip v-for="social in socials" :key="social.link" bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                icon
                v-bind="attrs"
                :href="social.link"
                target="_blank"
                v-on="on"
                @click.stop
              >
                <v-icon>{{ social.icon }}</v-icon></v-btn
              >
            </template>
            <span>{{ social.tooltip }} </span>
          </v-tooltip>
        </div>
      </v-col>
      <v-col cols="12" md="8" class="mx-3 py-6">
        <div :id="slugifyItem(item.lastname)" class="anchor"></div>
        <div
          :class="$vuetify.breakpoint.xl ? 'text-h4' : 'text-h5'"
          v-html="highlight(item.firstname + ' ' + item.lastname, search)"
        ></div>
        <div
          class="text-h6 mb-3"
          v-html="highlight(getTitlesAndInstitutions(item), search)"
        ></div>
        <div
          v-if="$vuetify.breakpoint.smAndDown"
          class="flex-row justify-center mb-6"
        >
          <v-tooltip v-for="social in socials" :key="social.link" bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                icon
                color="primary"
                v-bind="attrs"
                :href="social.link"
                target="_blank"
                v-on="on"
              >
                <v-icon>{{ social.icon }}</v-icon></v-btn
              >
            </template>
            <span>{{ social.tooltip }} </span>
          </v-tooltip>
        </div>
        <div class="author-exerpt">
          <nuxt-content :document="item" />
        </div>
        <small v-if="item.copyright" class="muted caption"
          >Image of &copy; {{ item.copyright }}</small
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import slugify from '~/assets/utils/slugify'
import { formatTitleAndInstitutions } from '~/assets/utils/transforms'
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
    return {
      podcast: false,
      socials: [
        ...(this.item.social_channels.website
          ? [
              {
                link: this.item.social_channels.website,
                icon: 'mdi-link-variant',
                tooltip: 'Visit this author website', // TODO i18n
              },
            ]
          : []),
        ...(this.item.social_channels.wikipedia
          ? [
              {
                link: this.item.social_channels.wikipedia,
                icon: 'mdi-wikipedia',
                tooltip: 'Check the Wikipedia page of the author',
              },
            ]
          : []),
        ...(this.item.social_channels.orcid
          ? [
              {
                link: this.item.social_channels.orcid,
                icon: 'mdi-account',
                tooltip: 'Visit the author Orcid page',
              },
            ]
          : []),
        ...(this.item.social_channels.google_scholar
          ? [
              {
                link: this.item.social_channels.google_scholar,
                icon: 'mdi-google',
                tooltip: 'Visit the author Google Scholar page',
              },
            ]
          : []),
        ...(this.item.social_channels.mendeley
          ? [
              {
                link: this.item.social_channels.mendeley,
                icon: 'mdi-school',
                tooltip: 'Visit the author Mendeley page',
              },
            ]
          : []),
        ...(this.item.social_channels.researchgate
          ? [
              {
                link: this.item.social_channels.researchgate,
                icon: 'mdi-flask',
                tooltip: 'Visit the author Researchgate page',
              },
            ]
          : []),
        ...(this.item.social_channels.linkedin
          ? [
              {
                link: this.item.social_channels.linkedin,
                icon: 'mdi-linkedin',
                tooltip: 'Get in touch on Linkedin',
              },
            ]
          : []),
        ...(this.item.social_channels.twitter
          ? [
              {
                link: this.item.social_channels.twitter,
                icon: 'mdi-twitter',
                tooltip: 'Follow this author on Twitter',
              },
            ]
          : []),
        ...(this.item.social_channels.instagram
          ? [
              {
                link: this.item.social_channels.instagram,
                icon: 'mdi-instagram',
                tooltip: 'Visit the author Instagram page',
              },
            ]
          : []),
      ],
    }
  },
  async fetch() {},
  computed: {},
  mounted() {},
  methods: {
    slugifyItem(item) {
      return slugify(item)
    },
    getTitlesAndInstitutions(item) {
      return item?.titles_and_institutions?.length
        ? formatTitleAndInstitutions(item.titles_and_institutions)
        : ''
    },
    highlight: (word = '', query) => {
      const check = new RegExp(query, 'ig')
      return word.replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText +
          '</strong>'
        )
      })
    },
  },
}
</script>

<style scoped>
.author-exerpt {
  max-width: 650px;
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.author-picture {
  background: linear-gradient(to right, #040404, #000000, #656565);
  font-style: normal;
}
div.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
</style>
