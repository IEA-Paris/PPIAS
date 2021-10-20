<template>
  <v-text-field
    v-model.trim="val"
    v-bind="$attrs"
    single-line
    :rules="itemRules"
    @click:clear="$router.push({ ...$route.query, query: { [filter]: undefined } })"
  />
</template>
<script>
import rulesSet from '~/assets/utils/rules'
import forms from '~/assets/data/forms'
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    item: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      itemRawRules: forms[this.type][this.item].rules,
    }
  },

  computed: {
    val: {
      get() {
        return this.$store.state.form[this.item]
      },
      set(value) {
        return this.$store.dispatch('form/update', { type: this.type, [this.item]: value })
      },
    },
    itemRules() {
      const rules = Object.keys(this.itemRawRules).flatMap((rule) => {
        if (this.itemRawRules[rule]) {
          return this.itemRawRules[rule] === true ? rulesSet[rule](this) : rulesSet[rule](this)(this.itemRawRules[rule])
        }
        return false
      })

      return rules
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
