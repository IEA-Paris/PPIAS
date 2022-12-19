<template>
  <v-row class="mt-12" :class="{ 'mx:6': mdAndUp }">
    <v-col
      v-if="mdAndUp"
      cols="3"
      col-md-offset="1"
      justify="center"
      align="center"
      class="d-flex flex-column align-center"
    >
      <v-avatar size="160" class="mb-3">
        <OptimizedImage
          v-if="item.image"
          alt="Avatar"
          :src="item.image"
          height="160"
          :ratio="1"
        />
        <v-icon
          v-else
          class="white--text headline"
          :style="
            'background-color:' +
            theme.themes.light.primary +
            '; font-style: normal;'
          "
        >
          {{ item.firstname[0] + item.lastname[0] }}
        </v-icon>
      </v-avatar>
      <div class="flex-row justify-center">
        <v-tooltip v-if="item.wikipedia" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              :href="item.wikipedia"
              target="_blank"
              v-on="on"
            >
              <v-icon>mdi-wikipedia</v-icon>
            </v-btn>
          </template>
          <span
            >Check the Wikipedia page of the
            {{ mentor ? 'mentor' : 'fellow' }}</span
          >
        </v-tooltip>
        <v-tooltip v-if="item.linkedin" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              :href="item.linkedin"
              target="_blank"
              v-on="on"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </template>
          <span>Get in touch on Linkedin</span>
        </v-tooltip>
        <v-tooltip v-if="item.twitter" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              :href="item.twitter"
              target="_blank"
              v-on="on"
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </template>
          <span>Follow this {{ mentor ? 'mentor' : 'fellow' }} on Twitter</span>
        </v-tooltip>
        <v-tooltip v-if="item.website" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              :href="item.website"
              target="_blank"
              v-on="on"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          <span
            >Check this {{ mentor ? 'mentor' : 'fellow' }} personal
            website</span
          >
        </v-tooltip>
      </div>
    </v-col>
    <v-col cols="12" md="8" class="mx-3">
      <div :id="slugifyItem(item.lastname)" class="anchor"></div>
      <div
        class="text-h5 font-weight-black"
        v-html="item.firstname + ' ' + item.lastname"
      ></div>
      <div class="text-h6 mb-3" v-html="item.positions_and_institutions"></div>
      <div
        v-if="smAndDown"
        class="flex-row justify-center mb-6"
      >
        <v-tooltip v-for="social in getSocials(item)" :key="social.link" bottom>
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
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ social.tooltip }}</span>
        </v-tooltip>
        <template v-if="podcast">
          <v-btn
            outlined
            nuxt
            :href="'https://www.intercontinental-academia.org/blog/' + podcast"
          >
            <v-icon left>mdi-play-circle</v-icon>
            Podcast
          </v-btn>
        </template>
      </div>
      <p v-html="item.presentation"></p>

      <div>
        <small v-if="item.copyright" class="muted caption"
          >Image of &copy; {{ item.copyright }}</small
        >
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import slugify from '~/assets/utils/slugify'
import { useDiplay, useTheme } from 'vuetify'

const theme = useTheme()
const { mdAndUp, smAndDown } = useDiplay()

const props = defineProps({
  mentor: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => {},
  }
})

const slugifyItem = (item) => {
  return slugify(item)
}

const highlight = (word, query) => {
  const check = new RegExp(query, 'ig')
  return word.replace(check, function (matchedText, a, b) {
    return (
      '<strong style="color: darkslategray;background-color: yellow;">' +
      matchedText +
      '</strong>'
    )
  })
}

const getSocials = (itemSocial) => {
  const socials = []
  if (itemSocial.website)
    socials.push({
      icon: 'mdi-link-variant',
      link: itemSocial.website,
      tooltip: 'Check this ' + (props.mentor ? 'mentor' : 'fellow') + ' personal website',
    })
  if (itemSocial.linkedin)
    socials.push({
      icon: 'mdi-linkedin',
      link: itemSocial.linkedin,
      tooltip: 'Get in touch on Linkedin',
    })
  if (itemSocial.twitter)
    socials.push({
      icon: 'mdi-twitter',
      link: itemSocial.twitter,
      tooltip: 'Follow this ' + (props.mentor ? 'mentor' : 'fellow') + ' on Twitter',
    })
  if (itemSocial.wikipedia)
    socials.push({
      icon: 'mdi-wikipedia',
      link: itemSocial.wikipedia,
      tooltip:
        'Check the Wikipedia page of the ' + (props.mentor ? 'mentor' : 'fellow'),
    })
  return socials
}
</script>

<style lang="scss">
div.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
</style>
