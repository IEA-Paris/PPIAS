<template>
  <div class="d-flex ml-auto">
    <v-expand-x-transition>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-show="!expand"
            text
            tile
            small
            class="py-7 px-6"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-h4' : 'text-h6'"
            nuxt
            depressed
            v-bind="attrs"
            v-on="on"
            @click="showInput()"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>
    </v-expand-x-transition>
    <v-expand-x-transition>
      <v-text-field
        v-show="expand"
        ref="search"
        v-model="searchString"
        height="40"
        :style="'max-width:' + (expand ? '400px' : '0px') + '; '"
        placeholder="Search"
        outlined
        prepend-inner-icon="mdi-magnify"
        :color="$vuetify.theme.themes.light.primary"
        hide-details
        clearable
      />
    </v-expand-x-transition>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    searchString: {
      get() {
        return this.$store.state[this.type].search
      },
      set(value) {
        this.$store.dispatch(this.type + '/updateSearch', value)
      },
    },
    expand() {
      return this.searchString.length > 0
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showInput() {
      // Show the input component
      this.expand = true
      // Focus the component, but we have to wait
      // so that it will be showing first.
      this.$nextTick(() => {
        this.focusInput()
      })
    },
    focusInput() {
      this.$refs.search.focus()
    },
    onClickOutside() {
      this.expand = false
    },
  },
}
</script>
<style lang="scss"></style>
