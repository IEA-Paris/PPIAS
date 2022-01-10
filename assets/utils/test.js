/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]
      if (obj[key] !== undefined || prev[key] !== undefined) {
        if (prev[key] === undefined) prev[key] = obj[key]
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          if (
            (pVal[0] && typeof pVal[0] === 'object') ||
            (oVal[0] && typeof oVal[0] === 'object')
          ) {
            prev[key] = mergeDeep(pVal, oVal)
          } else {
            const newArr = [...pVal.concat(...oVal)]
            prev[key] = newArr.filter((value, index) => {
              const _value = JSON.stringify(value)
              return (
                index ===
                newArr.findIndex((obj) => {
                  return JSON.stringify(obj) === _value
                })
              )
            })
          }
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      }
    })

    return prev
  }, {})
}
const filterAndMerge = (first, second) => {
  console.log('first: ', first)
  first = first.filter((author) => {
    // does it have a reference?
    if (author.reference && author.reference.length) {
      // is it matching an existing doc?
      const referencedDocIndex = second.findIndex(
        (doc) =>
          doc.path ===
          author.reference.split('/').slice(1).join('/').split('.')[0]
      )
      // if so we merge them and remove the related articleAuthor
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })
  console.log('first: ', first)
  first = first.filter((author) => {
    // does it have an orcid?
    if (author.social_channels.orcid) {
      // is it matching an existing doc?
      const referencedDocIndex = second.findIndex(
        (doc) => author.social_channels.orcid === doc.social_channels.orcid
      )
      // if so we merge them and remove the related articleAuthor
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })
  console.log('first: ', first)
  first = first.filter((author) => {
    // does it have the same firstname/lastname than a doc author?
    const referencedDocIndex = second.findIndex((doc) => {
      return (
        author.firstname.trim().toLowerCase() ===
          doc.firstname.trim().toLowerCase() &&
        author.lastname.trim().toLowerCase() ===
          doc.lastname.trim().toLowerCase()
      )
    })
    console.log('referencedDocIndex: ', referencedDocIndex)
    // if so we merge them and remove the related articleAuthor
    if (referencedDocIndex > -1) {
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })
  // finally remove the authors document that match no article
  second = second.filter((author) => !author.reference)
  console.log('first: ', first)
  return { first, second }
}

export default async ($content) => {
  // fetch all authors documents
  let authorsDocs = await $content('authors', { deep: true }).fetch()
  console.log('authorsDocs: ', authorsDocs)
  // and all the authors defined in the articles frontmatter
  const articles = await $content('articles')
    .where({ published: true })
    .only(['slug', 'path', 'authors'])
    .fetch()
  // extract the authors from articles with backlink
  let articleAuthors = articles
    .map((article) =>
      article.authors.map((author) => {
        return {
          ...author,
          articles: [article.path],
        }
      })
    )
    .flat()
  console.log('articleAuthors: ', articleAuthors)
  console.log('authorsDocs: ', authorsDocs)
  const firstPass = filterAndMerge(articleAuthors, authorsDocs)
  articleAuthors = firstPass.first
  authorsDocs = firstPass.second
  console.log('authorsDocs: ', authorsDocs)
  console.log('articleAuthors: ', articleAuthors)
  const secondPass = filterAndMerge(articleAuthors, articleAuthors)
  articleAuthors = secondPass.first
  console.log('articleAuthors: ', articleAuthors)
  console.log('authorsDocs: ', authorsDocs)
  authorsDocs = [...authorsDocs, ...secondPass.second]
  console.log('authorsDocs: ', authorsDocs)
  console.log('articleAuthors: ', articleAuthors)
}
