<template>
  <v-autocomplete
    v-model="selected"
    v-bind="$attrs"
    multiple
    menu-props="offset-y"
    :loading="$nuxt.loading"
  >
    <template #selection="{ item, index }">
      <SelectionSlot :label="false" :item="item" :index="index" /> </template
  ></v-autocomplete>
</template>

<script>
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
      selectedRaw: [],
    }
  },

  computed: {
    selected: {
      get() {
        return this.selectedRaw
      },

      set(value) {
        // set on parent
        this.$router.replace({
          query: {
            ...this.$route.query,
            [this.type]:
              value && value.length ? JSON.stringify(value) : undefined,
          },
        })
        this.selectedRaw = value
        console.log('QIUE')
      },
    },
  },
  watch: {
    '$route.query'() {
      if (this.$route.query[this.type]) {
        this.selectedRaw = JSON.parse(this.$route.query[this.type])
      } else {
        this.selectedRaw = []
      }
    },
  },

  created() {
    if (this.$route.query[this.type]) {
      this.selectedRaw = JSON.parse(this.$route.query[this.type])
    } else {
      this.selectedRaw = []
    }
  },
  beforeCreate() {},
}
</script>
