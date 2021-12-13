<template>
  <div class="d-flex">
    <v-img class="ml-10 mr-2" src="/icon.png" max-height="150" max-width="150" contain></v-img>
    <div>
      <div class="main-title ml-3">Proceedings of the</div>
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
          <span class="main-title">
            {{ item }}
          </span>
        </template>
      </v-select>
      <div class="main-title ml-3">
        Institute for
        <br />
        Advanced
        <br />
        Study
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 'Paris',
      items: ['Berlin', 'Boston', 'Hongkong', 'Jerusalem', 'London', 'Madrid', 'Olso', 'Paris', 'Prague', 'Rome'],
    }
  },
}
</script>
<style>
.main-title {
  max-width: 25vw;
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 900;
  font-family: 'Bodoni Moda';
  display: inline-flex;
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
