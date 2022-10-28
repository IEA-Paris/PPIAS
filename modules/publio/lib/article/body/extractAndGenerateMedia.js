export default (article) =>
  article.media
    .map((item) => {
      return {
        ...item,
        article_slug: article.slug,
        date: article.date,
        issue: article.issue,
        highlight: article.highlight,
        language: article.language,
        tags: article.tags,
        years: article.years,
        picture: article.picture,
      }
    })
    .flat()
    .filter((item) => item !== undefined)
// TODO remove duplicate media ID (?)
