import { mergeDeep, insertDocuments } from '../../utils/contentUtilities'
export default async (article) => {
  if (article.media.length) {
    const articleMedia = article.media
      .map((item, index) => {
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
      .filter((item, index, self) => item !== undefined)
    // TODO remove duplicate media ID (?)
    await insertDocuments(articleMedia, 'media', ['article_slug', 'caption'])
  }

  return true
}
