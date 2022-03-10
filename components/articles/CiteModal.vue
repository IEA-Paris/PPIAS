<template>
  <div class="text-center">
    <v-dialog v-model="dialog" scrollable>
      <template #activator="{ on: dialogStart, attrs }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              text
              class="py-7"
              tile
              v-bind="attrs"
              nuxt
              target="_blank"
              small
              v-on="{ ...tooltip, ...dialogStart }"
            >
              <v-icon>mdi-format-quote-close</v-icon>
              <template v-if="text">
                {{ $t('cite-or-export') }}
              </template>
            </v-btn>
          </template>
          <span>{{ $t('cite-or-export-this-article') }}</span>
        </v-tooltip>
      </template>

      <v-card>
        <v-card-title>{{ $t('export-this-article') }}</v-card-title>

        <v-card-text>
          <v-btn block outlined class="my-3">
            <v-icon left>mdi-download</v-icon>
            {{ $t('zotero') }}
          </v-btn>
          <v-btn block outlined class="my-3">
            <v-icon left>mdi-download</v-icon>
            {{ $t('endnote') }}
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title>{{ $t('cite-this-article') }}</v-card-title>

        <v-card-text>
          <div
            v-for="(format, index) in citeFormats"
            :key="index"
            class="d-flex mb-6"
          >
            <div class="text-subtitle-2 black--text mt-1">
              {{ format.type }}
            </div>
            <div class="flex-grow-1 mx-6">{{ format.text }}</div>
            <div>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn icon tile v-bind="attrs" small v-on="on">
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('copy') }}</span>
              </v-tooltip>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>{{ $t('quote-this-article') }}</v-card-title>

        <v-card-text>
          {{ $t('inline-quote-tips') }}
          <v-icon x-small>mdi-format-quote-close</v-icon>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
        <v-overlay absolute>
          <v-btn dark tile @click="dialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-sheet dark class="pa-12 text-h6 d-flex justify-center flex-column">
            <v-icon x-large class="pa-6">mdi-account-hard-hat</v-icon
            >{{ $t('this-part-is-still-under-construction') }}
          </v-sheet>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    text: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      citeFormats: [
        {
          type: 'ISO 690',
          text:
            this.item.authors
              .map((author) => author.lastname + ' ' + author.firstname)
              .join(', ') +
            ', ' +
            this.item.article_title +
            ', PIAS, ' +
            new Date(this.item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }) +
            ', DOI:' +
            this.item.doi +
            ', URL:https://pias.science/articles/' +
            this.item.slug, // TODO update with subdomains and locales
        },
        {
          type: 'MLA',
          text:
            this.item.authors
              .map((author) => author.lastname + ' ' + author.firstname)
              .join(', ') +
            ', ' +
            this.item.article_title +
            ', PIAS, ' +
            new Date(this.item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }) +
            ', DOI:' +
            this.item.doi +
            ', URL:https://pias.science/articles/' +
            this.item.slug, // TODO update with subdomains and locales
        },
        {
          type: 'APA',
          text:
            this.item.authors
              .map((author) => author.lastname + ' ' + author.firstname)
              .join(', ') +
            ', ' +
            this.item.article_title +
            ', PIAS, ' +
            new Date(this.item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }) +
            ', DOI:' +
            this.item.doi +
            ', URL:https://pias.science/articles/' +
            this.item.slug, // TODO update with subdomains and locales
        },
        {
          type: 'DOI',
          text: 'https://doi.org/' + this.item.doi,
        },
      ],
    }
  },
  async fetch() {},
}
</script>
