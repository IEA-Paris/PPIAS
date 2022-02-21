<template>
  <v-menu v-if="Object.keys(items).length > 1" offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            x-large
            tile
            icon
            v-bind="attrs"
            class="mr-3"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-{{ current.icon || defaultView.icon }}</v-icon>
          </v-btn>
        </template>
        <span
          v-html="
            $t('view-mode') + $t('view-' + (current.name || defaultView.name))
          "
        ></span>
      </v-tooltip>
    </template>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.name !== current.name"
          :key="index"
          @click="updateView(item.name)"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('view-' + item.name) }}</v-list-item-title>
        </v-list-item>
        <div
          v-else-if="index === items.length"
          :key="index + item.name"
          class="ma-3"
        >
          {{ $t('no-other-mode-available') }}
        </div>
      </template>
    </v-list>
  </v-menu>
</template>
<script>
import lists from '~/assets/data/lists'
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      items: lists[this.type].views,
      defaultView:
        lists[this.type].views[
          Object.keys(lists[this.type].views).find(
            (item) => lists[this.type].views[item].default === true
          )
        ],
    }
  },
  computed: {
    current() {
      return (
        this.items.find(
          (item) => item.name === this.$store.state[this.type].view
        ) || this.defaultView
      )
    },
  },
  mounted() {},
  methods: {
    async updateView(value) {
      await this.$store.dispatch(this.type + '/updateView', value)
    },
  },
}
</script>
<style lang="scss"></style>
