<template>
  <div
    class="d-flex"
    @click="
      $store.dispatch('resetState', 'articles') &&
        $store.dispatch('resetState', 'media') &&
        $store.dispatch('resetState', 'authors') &&
        $router.push(localePath('/'))
    "
    @keyup.enter="
      $store.dispatch('resetState', 'articles') &&
        $store.dispatch('resetState', 'media') &&
        $store.dispatch('resetState', 'authors') &&
        $router.push(localePath('/'))
    "
  >
    <v-img
      class="mr-2 logo-container"
      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
      src="/logo_b.png"
      contain
      max-height="120"
      max-width="120"
      style="cursor: pointer"
    ></v-img>
    <!--  <div>
      <div class="main-title ml-3">
        Proceedings&nbsp;of&nbsp;the
       <v-select
        v-model="current"
        :items="items"
        hide-details
        solo
        flat
        min-height="30"
        height="30"
        class="domain-select fit"
        :menu-props="{ bottom: true, offsetY: true }"
      >
        <template #selection="{ item }">
          <span class="main-title-select">
            {{ item.replace(' ', '&nbsp;') }}
          </span>
        </template>
      </v-select> 
        <br />
        Institutes for
        <br />
        Advanced
        <br />
        Study
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 'Paris',
      items: [
        'Berlin',
        'Boston',
        'Hongkong',
        'Vancouver',
        'Sydney',
        'Belo Horizonte',
        'Jerusalem',
        'London',
        'Madrid',
        'Oslo',
        'Paris',
        'Prague',
        'Rome',
      ].sort(),
    }
  },
}
</script>
<style>
.logo-container {
  border: 4px black solid;
}
.main-title-select,
.main-title {
  max-width: 25rem;
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 700;
  font-family: 'Bodoni Moda';
  display: inline-flex;
}
.main-title {
  color: black;
}
.main-title-select {
  color: #757575 !important;
}
.domain-select {
  max-width: fit-content;
}
.domain-select .v-input__control {
  min-height: 18px !important;
}

.domain-select .v-input__slot {
  background: transparent !important;
}
.domain-select .v-list-item__content {
  font-family: 'Bodoni Moda' !important;
  font-weight: 900;
  line-height: 1 !important;
}
.v-select.fit {
  width: min-content;
}
.v-select.fit .v-select__selection--comma {
  text-overflow: unset;
}
.v-text-field .v-select__slot .v-select__selection--comma {
  min-width: min-content;
}
.v-select .v-select__selections {
  color: #757575 !important;
}
</style>
