<template>
  <v-container
    class="transition-swing mb-12"
    :fluid="!rootStore.scrolled"
    :class="{ 'py-0': !rootStore.scrolled }"
  >
    <v-row
      v-bind="$attrs"
      class="transition-swing"
      :no-gutters="!rootStore.scrolled"
      justify="center"
      :class="[
        rootStore.scrolled
          ? ''
          : mobile
          ? 'mx-2'
          : 'mx-6',
      ]"
    >
      <v-col cols="12" md="12" lg="10" xl="10">
        <v-card>
          <div class="d-flex">
            <v-btn tile text nuxt small exact class="py-7" @click="goBack">
              <v-icon left>mdi-chevron-left</v-icon>
              {{ $t('back') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-if="item"
                  variant="text"
                  class="py-7"
                  tile
                  v-bind="attrs"
                  nuxt
                  :href="'/authors/' + item._path.split('/').at(-1)"
                  target="_blank"
                  :title="item.lastname"
                  size="small"
                  v-on="on"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </template>
              <span>Open in a new tab</span>
            </v-tooltip>
          </div>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="7">
              <div v-if="item">
                <PageTitle
                  :text="item.firstname + ' ' + item.lastname"
                  class="pa-6"
                >
                  <template v-if="socials && socials.length">
                    <AuthorSocials :socials="socials"></AuthorSocials>
                  </template>
                </PageTitle>
                <v-card-text>
                  <ContentRenderer class="nuxt-content" :value="item" />
                  <AuthorTitles
                    v-if="
                      item.positions_and_institutions &&
                      item.positions_and_institutions.length
                    "
                    width="650"
                    :item="item"
                    class="justify-self-start"
                  ></AuthorTitles>
                  <template v-if="articles && articles.length">
                    <div class="text-h5 my-6">
                      {{
                        item.is_institution
                          ? $t('articles-from-this-institution')
                          : $t('articles-from-this-author')
                      }}
                    </div>
                    <ArticleSearchItem
                      v-for="(article, index) in articles"
                      :key="index"
                      :index="index"
                      :item="article"
                      :scroll="rootStore.scrolled"
                    ></ArticleSearchItem>
                  </template>
                </v-card-text>
              </div>
              <div v-else>
                {{ $t('author-unavailable') }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row></v-container
  >
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const rootStore = useRootStore()
const route = useRoute()
const router = useRouter()

const { data: item } = await useAsyncData('item-authors', () => queryContent('authors').where({ slug: route.params.slug }).findOne())
const { data: articles } = await useAsyncData('item-authors-articles', () => queryContent('articles').where({ slug: { $in: item.articles } }).find())

const goBack = () => {
  router.go(-1)
}

const socials = reactive([
      ...(item?.social_channels?.website
        ? [
            {
              link: item.social_channels.website,
              icon: 'mdi-link-variant',
              tooltip: 'Visit this author website', // TODO i18n
            },
          ]
        : []),
      ...(item?.social_channels?.wikipedia
        ? [
            {
              link: item.social_channels.wikipedia,
              icon: 'mdi-wikipedia',
              tooltip: 'Check the Wikipedia page of the author',
            },
          ]
        : []),
      ...(item?.social_channels?.orcid
        ? [
            {
              link: 'https://orcid.org/' + item.social_channels.orcid,
              icon: 'mdi-account',
              tooltip: 'ORCID',
            },
          ]
        : []),
      ...(item?.social_channels?.google_scholar
        ? [
            {
              link: item.social_channels.google_scholar,
              icon: 'mdi-google',
              tooltip: 'Visit the author Google Scholar page',
            },
          ]
        : []),
      ...(item?.social_channels?.mendeley
        ? [
            {
              link: item.social_channels.mendeley,
              icon: 'mdi-school',
              tooltip: 'Visit the author Mendeley page',
            },
          ]
        : []),
      ...(item?.social_channels?.researchgate
        ? [
            {
              link: item.social_channels.researchgate,
              icon: 'mdi-flask',
              tooltip: 'Visit the author Researchgate page',
            },
          ]
        : []),
      ...(item?.social_channels?.linkedin
        ? [
            {
              link: item.social_channels.linkedin,
              icon: 'mdi-linkedin',
              tooltip: 'Get in touch on Linkedin',
            },
          ]
        : []),
      ...(item?.social_channels?.twitter
        ? [
            {
              link: item.social_channels.twitter,
              icon: 'mdi-twitter',
              tooltip: 'Follow this author on Twitter',
            },
          ]
        : []),
      ...(item?.social_channels?.instagram
        ? [
            {
              link: item.social_channels.instagram,
              icon: 'mdi-instagram',
              tooltip: 'Visit the author Instagram page',
            },
          ]
        : []),
    ])
</script>
<style lang="scss"></style>
