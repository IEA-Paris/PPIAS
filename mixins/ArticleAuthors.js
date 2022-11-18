import { formatAuthors, highlight } from '~/assets/utils/transforms'
import slugify from '~/assets/utils/slugify'

export default {
  computed: {
    authorInformations() {
      // Generate the authors informations and format them
      // Will return an object of array with institutions and authors formated with exponential
      //
      // Example:
      // {
      //   "institutions": ['institution1', 'institution2'],
      //   "authors": ['<a href="...">author1 <sup>0</sup><sup>1</sup>.</a>', '<a href="...">author2<sup>1</sup></a>']
      // }

      let institutions = []
      const authors = []

      this.authors.forEach((author) => {
        const authorsIndexInstutions = []

        if ('positions_and_institutions' in author) {
          author.positions_and_institutions.forEach(
            (positionAndInstitution) => {
              // get all institutions

              const highlightedInstitution = this.getFormatedInstitution(
                positionAndInstitution
              )
              // get the index of the institution if it already exists
              let indexInstitution = institutions.findIndex(
                (institution) =>
                  institution.toLowerCase() ===
                  highlightedInstitution.toLowerCase()
              )
              // if not, add it to the institutions array
              if (indexInstitution === -1) {
                institutions.push(highlightedInstitution)
                indexInstitution = institutions.length - 1
              }
              // add the index of the institution to the author
              authorsIndexInstutions.push(indexInstitution)
            }
          )
        }

        // format the author with the institutions with exponential index of the institution
        authors.push(this.getFormatedAuthors(author, authorsIndexInstutions))
      })

      // Format the institutions with exponential index
      institutions = institutions.map(
        (institution, index) => `<sup>${index}</sup>${institution}`
      )
      return { institutions, authors }
    },
  },
  methods: {
    getFormatedAuthors(author, institutionsIds) {
      return highlight(
        formatAuthors(
          [author],
          this.$i18n.$t,
          false,
          false,
          this.$config.url,
          institutionsIds
        ),
        this.$store.state.articles.search || ''
      )
    },
    getFormatedInstitution(positionsAndInstitutions) {
      return highlight(
        (positionsAndInstitutions &&
          positionsAndInstitutions &&
          positionsAndInstitutions?.institution) ||
          '',
        this.$store.state.articles.search || ''
      )
    },
    slugify(str) {
      return slugify(str)
    },
  },
}
