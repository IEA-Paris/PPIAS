<template>
  <v-btn-toggle
    value="currentPage"
    role="navigation"
    aria-label="Pagination Navigation"
  >
    <v-btn
      v-if="!(hidePrevNext && firstPageSelected())"
      min-width="35"
      height="35"
      width="35"
      :tabindex="!hidePrevNext && firstPageSelected() ? -1 : 0"
      aria-label="Previous Page"
      nuxt
      :to="`/${type}/${currentPage - 1}`"
      @keyup.enter="$router.push(`/${type}/${currentPage - 1}`)"
    >
      <v-icon>mdi-chevron-left </v-icon>
    </v-btn>

    <template v-for="(page, index) in renderPages">
      <v-btn
        v-if="page.isGap"
        :key="page.key"
        min-width="35"
        height="35"
        width="35"
        icon
        :to="`/${type}/${Math.floor(
          renderPages[index - 1].key +
            ((renderPages[index + 1].key || totalPages) -
              renderPages[index - 1].key) /
              2
        )}`"
      >
        ...
      </v-btn>
      <template v-else>
        <v-btn
          :key="page.key"
          :class="{ 'active-page': page.current }"
          :to="`/${type}/${page.value}`"
          tabindex="0"
          outlined
          min-width="35"
          height="35"
          tile
          :color="page.current ? 'white' : 'black'"
          text
          width="35"
          :aria-current="page.current ? 'true' : 'false'"
          :aria-label="
            page.current
              ? `Current page, Page ${page.value}`
              : `Goto Page ${page.value}`
          "
          @keyup.enter="$router.push(`/${type}/${page.value}`)"
        >
          {{ page.value }}
        </v-btn>
      </template>
    </template>

    <v-btn
      v-if="!(hidePrevNext && lastPageSelected())"
      :tabindex="!hidePrevNext && lastPageSelected() ? -1 : 0"
      aria-label="Next Page"
      :to="`/${type}/${currentPage + 1}`"
      min-width="35"
      height="35"
      width="35"
      @keyup.enter="$router.push(`/${type}/${currentPage + 1}`)"
    >
      <v-icon>mdi-chevron-right</v-icon></v-btn
    >
  </v-btn-toggle>
</template>

<script>
// THIS COMPONENT IS INITALLY BASED ON https://github.com/ashwinkshenoy/vue-simple/tree/master/packages/vs-pagination
// AND MODIFIED TO FIT INTO OUR NEEDS (Vuetify + nuxt)
export default {
  props: {
    /**
     * Total no. of pages
     */
    totalPages: {
      type: Number,
      required: true,
    },
    /**
     * Sets the current page. Pages start at 1.
     */
    currentPage: {
      type: Number,
      default: 1,
      validator: (value) => {
        return value > 0
      },
    },
    /**
     * Sets the number of pages that appear before and after active page
     * between gap indicator
     */
    pagePadding: {
      type: Number,
      default: 1,
      validator: (value) => {
        return value > 0
      },
    },
    /**
     * Positions the leading and trailing gap indicator, based on
     * the current and total pages
     */
    pageGap: {
      type: Number,
      default: 2,
      validator: (value) => {
        return value > 0
      },
    },
    /**
     * Hide prev and next button on reaching first or last page
     */
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
  },

  data() {
    return {}
  },

  computed: {
    renderPages() {
      const pages = []

      for (let pageIndex = 1; pageIndex <= this.totalPages; pageIndex++) {
        // Always display current, first, and last pages
        if (
          pageIndex === this.currentPage ||
          pageIndex < this.pageGap ||
          pageIndex > this.totalPages - this.pageGap + 1
        ) {
          pages.push(this.createPage(pageIndex))
          continue
        }

        let minimum
        let maximum

        if (this.currentPage <= this.pageGap + this.pagePadding) {
          minimum = this.pageGap + 1
          maximum = minimum + this.pagePadding * 2
        } else if (
          this.currentPage >=
          this.totalPages - this.pageGap - this.pagePadding
        ) {
          maximum = this.totalPages - this.pageGap
          minimum = maximum - this.pagePadding * 2
        } else {
          minimum = this.currentPage - this.pagePadding
          maximum = this.currentPage + this.pagePadding
        }

        // Display padded window of pages
        if (
          (pageIndex >= minimum && pageIndex <= this.currentPage) ||
          (pageIndex >= this.currentPage && pageIndex <= maximum)
        ) {
          pages.push(this.createPage(pageIndex))
          continue
        }

        // Handle start gap
        if (pageIndex === this.pageGap) {
          if (
            minimum > this.pageGap + 1 &&
            this.currentPage > this.pageGap + this.pagePadding + 1
          ) {
            pages.push(this.createGap(pageIndex))
          } else {
            pages.push(this.createPage(pageIndex))
          }

          continue
        }

        // Handle end gap
        if (pageIndex === this.totalPages - this.pageGap + 1) {
          if (
            maximum < this.totalPages - this.pageGap &&
            this.currentPage < this.totalPages - this.pageGap - this.pagePadding
          ) {
            pages.push(this.createGap(pageIndex))
          } else {
            pages.push(this.createPage(pageIndex))
          }

          continue
        }
      }
      return pages
    },
  },

  watch: {},

  methods: {
    /**
     * Create object for page and return
     * @param {Number} pageIndex
     * @returns {Object}
     */
    createPage(pageIndex) {
      return {
        key: pageIndex,
        current: this.currentPage === pageIndex,
        value: pageIndex,
      }
    },

    /**
     * Create object for gap in page and return
     * @param {Number} pageIndex
     * @returns {Object}
     */
    createGap(pageIndex) {
      return {
        key: pageIndex,
        isGap: true,
      }
    },

    /**
     * Returns boolean if first page
     * @returns {Boolean}
     */
    firstPageSelected() {
      return this.currentPage === 1
    },

    /**
     * Returns boolean if last page
     * @returns {Boolean}
     */
    lastPageSelected() {
      return this.currentPage === this.totalPages || this.totalPages === 0
    },
  },
}
</script>

<style lang="scss">
.active-page {
  background-color: #000;
  color: #f5f5f5 !important;
}
</style>
