<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        :value="formatted"
        readonly
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selected"
      color="primary"
      show-current
      v-bind="$attrs"
      @input="menu = false"
      @click:clear="
        $router.push({ ...$route.query, query: { [item]: undefined } })
      "
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { formatDate } from '~/assets/utils/transforms'
export default {
  props: {
    item: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    selected: {
      get() {
        return formatDate(
          !this.$route.params.id
            ? this.$store.state.list[this.item]
            : this.$store.state.form[this.item]
        )
      },

      set(value) {
        console.log('value: ', value)
        /*
        value = Math.floor(Date.parse(new Date(value).getTime() / 1000))
        console.log('value: ', value) */
        return this.$store.dispatch('form/update', {
          type: this.type,
          itemId: this.$route.params.id,
          values: { [this.item]: value },
        })
      },
    },
    formatted() {
      console.log('this.selected: ', this.selected)
      console.log(
        'formatDate(this.selected): ',
        formatDate(
          !this.$route.params.id
            ? this.$store.state.list[this.item]
            : this.$store.state.form[this.item]
        )
      )
      return this.selected
        ? formatDate(
            !this.$route.params.id
              ? this.$store.state.list[this.item]
              : this.$store.state.form[this.item]
          )
        : ''
    },
  },
  mounted() {},
  beforeCreate() {},
  created() {},
}
</script>
