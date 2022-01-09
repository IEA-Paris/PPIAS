export default async ($content) => {
  const authorsDocs = await $content('authors').fetch()
  console.log('authorsDocs: ', authorsDocs)
  // and all the authors defined in the articles frontmatter
  const articles = await $content('articles').where({ published: true }).only(['slug', 'path', 'authors']).fetch()
  let articleAuthors = articles
    .map((article) =>
      article.authors.map((author) => {
        return {
          ...author,
          articles: [article.path],
        }
      }),
    )
    .flat()
  console.log('articleAuthors: ', articleAuthors)

  // merge those who are directly referencing their document counterpart
  articleAuthors = articleAuthors
    .filter((author) => {
      // does it have a reference?
      if (author.reference && author.reference.length) {
        // is it matching an existing doc?
        const referencedDocIndex = authorsDocs.findIndex((doc) => doc.path === author.reference)
        // if so we merge them and remove the related articleAuthor
        authorsDocs[referencedDocIndex] = { ...authorsDocs[referencedDocIndex], ...author }
        return false
      }
      return true
    })
    // merge those with the same orcid, backlink the articles
    .filter((author) => {
      // does it have a reference?
      if (author.social_channels.orcid) {
        // is it matching an existing doc?
        const referencedDocIndex = authorsDocs.findIndex(
          (doc) => author.social_channels.orcid === doc.social_channels.orcid,
        )
        // if so we merge them and remove the related articleAuthor
        authorsDocs[referencedDocIndex] = { ...authorsDocs[referencedDocIndex], ...author }
        return false
      }
      return true
    })
    // then merge those with the same first and last name, backlink the articles as well
    .filter((author) => {
      // does it have a reference?
      // is it matching an existing doc?
      const referencedDocIndex = authorsDocs.findIndex(
        (doc) => author.firstname === doc.firstname && author.lastname === doc.lastname,
      )
      // if so we merge them and remove the related articleAuthor
      authorsDocs[referencedDocIndex] = { ...authorsDocs[referencedDocIndex], ...author }
      if (referencedDocIndex) return false
      return true
    })
  console.log('articleAuthors2: ', articleAuthors)
}
