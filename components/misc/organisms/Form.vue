<template>
  <v-form v-model="valid">
    <component
      :is="input.type"
      v-for="(input, name) in inputs"
      :key="name + input.type"
      :dense="$vuetify.breakpoint.smAndDown"
      :disabled="!!$data.$apolloData.loading"
      :label="$t(input.label)"
      outlined
      :items="input.items && input.items.map((item) => $t(item))"
      :type="type"
      :item="name"
      style="min-width: 150px"
      :rules="itemRules(name)"
      :hint="$t(input.hint)"
      :placeholder="$t(input.placeholder)"
      :multiple="input.multiple"
    ></component>
    <!--   
    CANDIDATES
       datePicker:
          :range="isTimeInterval"
          no-title
          scrollable
          prepend-inner-icon="mdi-calendar-check"
 -->
  </v-form>
</template>
<script>
import rulesSet from '~/assets/utils/rules'
import forms from '~/assets/data/forms'

export default {
  apollo: {
    form: {
      prefetch: true,
      query() {
        return this.gql
      },
      variables() {
        return {
          appId: this.$store.state.apps.current.name.toLowerCase(),
          itemId: this.$route?.params?.id,
        }
      },
      update(data) {
        const rst = data[Object.keys(data)[0]]
        console.log('data: ', rst)
        this.$store.commit('form/updateStore', rst)
        return rst
      },
      error(error) {
        console.error("We've got an error!", error)
      },
    },
  },

  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    gql: {
      type: Object,
      default: () => {},
      required: false,
    },
    inputs: {
      type: Object,
      default: () => {},
      required: true,
    },
    tab: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      valid: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    itemRules(input) {
      /*       console.log('input: ', input)
      console.log('inputs: ', this.inputs)
      console.log('this.tab: ', this.tab)
      console.log('this.type: ', this.type) */

      const itemRawRules = this.tab
        ? forms[this.type][this.tab][input]?.rules
        : forms[this.type][input]?.rules
      /*      console.log('itemRawRules: ', itemRawRules) */
      const rules = itemRawRules
        ? Object.keys(itemRawRules).flatMap((rule) => {
            /*     console.log('rule: ', rule) */
            if (itemRawRules[rule]) {
              return itemRawRules[rule] === true
                ? rulesSet[rule](this)
                : rulesSet[rule](this)(itemRawRules[rule])
            }
            return true
          })
        : []
      /*  console.log('rules: ', rules)
       */
      return rules
    },
  },
}
</script>
<style lang="scss"></style>
