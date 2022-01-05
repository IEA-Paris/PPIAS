<template>
  <div>
    <template v-if="authors.length === 1">
      {{ authors[0].lastname + ',&nbsp;' + authors[0].firstname }}
    </template>
    <template v-for="(author, index) in authors" v-else>
      <template v-if="index < 3">
        {{
          author.lastname +
          ',&nbsp;' +
          author.firstname
            .match(/(\b\S)?/g)
            .join('')
            .toUpperCase()
        }}
        <template v-if="index === 0 && authors.length === 2">{{ $t('and') }}</template>
        <template v-if="index < 2 && authors.length > 2">,&nbsp;</template>
      </template>
    </template>
    <template v-if="authors.length > 3">et&nbsp;al.</template>
  </div>
</template>
<script>
export default {
  props: {
    authors: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
