<template>
  <v-menu offset-y open-on-hover bottom>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" class="text-button" text x-large v-on="on">
        {{ $i18n.locale.toUpperCase() }}
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="$i18n.setLocale('en')">
        <v-list-item-title class="text-uppercase text-button">
          {{ $t('english') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="$i18n.setLocale('fr')">
        <v-list-item-title class="text-uppercase text-button">
          {{ $t('french') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 0)">
        <v-list-item-title class="text-uppercase text-button">Logo texte</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 1)">
        <v-list-item-title class="text-uppercase text-button">Logo original</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 2)">
        <v-list-item-title class="text-uppercase text-button">Logo Blanc sur noir</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 3)">
        <v-list-item-title class="text-uppercase text-button">Logo Noir sur blanc</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 4)">
        <v-list-item-title class="text-uppercase text-button">Logo Pont &amp; Texte</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 5)">
        <v-list-item-title class="text-uppercase text-button">Sans texte / Logo Blanc/Noir</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 6)">
        <v-list-item-title class="text-uppercase text-button">Sans texte / Logo original</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.commit('setLogo', 7)">
        <v-list-item-title class="text-uppercase text-button">Sans texte / Logo original</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
