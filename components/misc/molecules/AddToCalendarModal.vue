<template>
  <v-dialog :value="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5 lighten-2 mb-6">
        <v-icon left color="black">mdi-calendar-plus</v-icon>
        {{ $t('add-to-my-calendar') }}
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column">
          <v-btn color="default" outlined class="my-3">
            <v-icon left>mdi-google</v-icon>
            <AddToCalendar
              :title="item.title"
              location="Online"
              :start="new Date()"
              :end="new Date(new Date().setDate(new Date().getDate() + 1))"
              inline-template
            >
              <google-calendar id="google-calendar" style="color: inherit; text-decoration: none">
                Add to Google calendar
              </google-calendar>
            </AddToCalendar>
          </v-btn>
          <v-btn color="default" outlined class="my-3">
            <v-icon left>mdi-microsoft-windows</v-icon>
            <AddToCalendar
              :title="item.title"
              location="Online"
              :start="new Date()"
              :end="new Date(new Date().setDate(new Date().getDate() + 1))"
              inline-template
            >
              <microsoft-calendar id="microsoft-calendar" style="color: inherit; text-decoration: none">
                Add to Microsoft live calendar
              </microsoft-calendar>
            </AddToCalendar>
          </v-btn>
          <v-btn color="default" outlined class="my-3">
            <v-icon left>mdi-microsoft-office</v-icon>
            <AddToCalendar
              :title="item.title"
              location="Online"
              :start="new Date()"
              :end="new Date(new Date().setDate(new Date().getDate() + 1))"
              inline-template
            >
              <office365-calendar id="office365-calendar" style="color: inherit; text-decoration: none">
                Add to Office365 outlook
              </office365-calendar>
            </AddToCalendar>
          </v-btn>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
/* import AddToCalendar from 'vue-add-to-calendar' */
export default {
  components: {
    /*    AddToCalendar, */
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
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
