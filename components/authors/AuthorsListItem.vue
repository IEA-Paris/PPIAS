<template>
  <div class="transition-swing">
    <div v-if="$store.state.loading">
      <v-skeleton-loader
        :class="index > 0 ? 'mt-6' : 'mt-12'"
        tile
        size="160"
        max-width="1000"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
      <v-divider></v-divider>
    </div>
    <v-card v-else nuxt :to="localePath('/authors/' + item.slug)" flat>
      <v-row :class="{ 'mt-6': index > 0 }" no-gutters>
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          cols="3"
          lg="2"
          class="d-flex align-end flex-column"
        >
          <div class="d-flex align-center flex-column">
            <v-avatar
              :size="$vuetify.breakpoint.xl ? '180' : '120'"
              class="mt-6 mx-6 mb-1"
              tile
            >
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
            <div
              class="flex-row justify-center text-center mb-3"
              style="max-width: 120px"
            >
              <AuthorSocials :socials="socials"></AuthorSocials>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8" class="mx-3 py-6">
          <div :id="slugifyItem(item.lastname)" class="anchor"></div>
          <div
            :class="$vuetify.breakpoint.xl ? 'text-h4' : 'text-h5'"
            v-html="highlightWord(item.firstname + ' ' + item.lastname)"
          ></div>
          <div
            class="text-subtitle-2 mb-1"
            v-html="highlightWord(getTitlesAndInstitutions(item))"
          ></div>
          <div
            v-if="$vuetify.breakpoint.smAndDown"
            class="flex-row justify-center align-center mb-6"
          >
            <AuthorSocials :socials="socials"></AuthorSocials>
          </div>
          <div
            class="author-exerpt text-subtitle-1"
            v-html="highlightWord(item.exerpt)"
          ></div>
          <small v-if="item.copyright" class="muted caption"
            >Image of &copy; {{ item.copyright }}</small
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>
<script>
import slugify from '~/assets/utils/slugify'
import {
  formatTitleAndInstitutions,
  highlight,
} from '~/assets/utils/transforms'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
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
    highlightWord(word = '') {
      return this.$store.state.authors.search
        ? highlight(word, this.$store.state.authors.search || '')
        : word
    },
  },
}
</script>

<style>
.author-exerpt {
  max-width: 650px;
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.author-picture {
  background: black;
  font-style: normal;
}
div.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
.v-skeleton-loader__avatar {
  height: 120px !important;
  width: 120px !important;
  margin-left: 15px;
}
</style>
