
export default function useArticleAuthors (fromAuthors) {
  const authorInformations = computed(() => {
    let institutions = []
    const authors = []

    fromAuthors.forEach((author) => {
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
      (institution, index) =>
        `<sup class="institution-number">${index}</sup><span class="institution-name">${institution}</span>`
    )
    return { institutions, authors }
  })

  const getFormatedAuthors = (author, institutionsIds) => formatAuthors(
    [author],
    this.$i18n.$t,
    true,
    false,
    this.$config.url,
    institutionsIds,
    this.haveInstitutionsLink
  )

  const getFormatedInstitution = (positionsAndInstitutions) => (positionsAndInstitutions && positionsAndInstitutions && positionsAndInstitutions?.institution) || ''
  
  const slugify = (str) => slugify(str)

  return { authorInformations, getFormatedAuthors, getFormatedInstitution, slugify }
}