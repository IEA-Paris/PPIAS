<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 2 : 0"
      flat
      nuxt
      :to="localePath('/authors/' + item.slug)"
      class="text-h5 ma-2 pa-2"
    >
      {{ item.firstname + ' ' + item.lastname }}
    </v-card>
  </v-hover>
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
    index: {
      type: Number,
      default: 0,
    },
    extended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
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

<style lang="scss"></style>
