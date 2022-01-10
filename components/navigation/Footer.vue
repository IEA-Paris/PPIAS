<template>
  <v-footer app dark color="black" style="position: relative">
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="12" lg="10" class="mt-6">
          <!--    <nuxt-link :to="localePath('/')" style="transition: all 500ms ease 0s" @click.native="$vuetify.goTo(0)">
            <v-img src="/logo_text_alt.svg" contain width="200" class="my-6"></v-img>
          </nuxt-link> -->
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <div class="text-body-2 my-6">
                <v-icon left>mdi-map-marker</v-icon>
                17, Quai d'Anjou 75004 PARIS - FRANCE
                <br />
                <v-icon left>mdi-phone</v-icon>
                +33(0)1 56 81 00 52
                <br />
                <v-icon left>mdi-email</v-icon>
                <a mailto="information@paris-iea.fr"
                  >information@paris-iea.fr</a
                >
              </div>
              <iframe
                title="openstreetmap"
                width="100%"
                absolute
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633"
                style="border: 1px solid black"
                @click="
                  $router.go(
                    'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911'
                  )
                "
                @keyup.enter="
                  $router.go(
                    'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911'
                  )
                "
              ></iframe>
              <br />
              <small><a href="">View Larger Map</a></small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list flat color="transparent" dense>
                <v-list-item
                  :to="localePath('/about')"
                  nuxt
                  @click="open = false"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('about')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="localePath('/contact')"
                  nuxt
                  @click="open = false"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('contact')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="localePath('/pressroom')"
                  nuxt
                  @click="open = false"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('pressroom')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="localePath('/support')"
                  nuxt
                  @click="open = false"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('support')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="overline">
                {{ $t('subscribe-to-our-newsletter') }}
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  :label="$t('email')"
                  outlined
                  filled
                  dense
                  large
                  height="44"
                >
                  <v-btn outlined large>{{ $t('subscribe') }}</v-btn>
                </v-text-field>
              </div>
            </v-col>
            <v-col cols="12" align="center">
              <v-tooltip v-for="(item, index) in social" :key="index" top>
                <template #activator="{ on }">
                  <v-btn
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.url"
                    fab
                    dark
                    outlined
                    color="grey"
                    class="mx-3"
                    small
                    v-on="on"
                  >
                    <v-icon color="white">mdi-{{ item.icon }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.text }}</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" align="center">
              <span class="overline"
                >&copy; {{ new Date().getFullYear() }}
                {{ $t('paris-ias') }}</span
              >
              <v-btn
                text
                x-small
                nuxt
                dark
                :to="localePath('/terms_of_service')"
              >
                {{ $t('tos') }}
              </v-btn>
              <v-btn text x-small nuxt dark :to="localePath('/privacy_policy')">
                {{ $t('privacy') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
import social from '~/assets/social'
import sitemap from '~/assets/sitemap'
export default {
  props: {},
  data() {
    return {
      social,
      panel: [],
      footer: sitemap.footer,
      email: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('invalid-e-mail')
        },
      },
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
