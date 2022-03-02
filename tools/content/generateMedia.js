import { mergeDeep, insertDocuments } from '../lib/contentUtilities'
export default async (content) => {
  const { $content } = require('@nuxt/content')
  // TODO filter fields using .only(['field'])
  const media = (
    await $content('articles', { deep: true })
      .where({ published: true })
      .fetch()
  )
    .filter((item) => item.media && item.media.length)
    .map((item, index) => {
      return {
        article_slug: item.slug,
        ...item.media['0'],
        date: item.date,
        category_1: item.category_1,
        category_2: item.category_2,
        highlight: item.highlight,
        language: item.language,
        tags: item.tags,
        years: item.years,
      }
    })
    .flat()
    .filter((item, index, self) => item !== undefined)
  // TODO remove duplicate media ID (?)

  insertDocuments(media, 'media', 'caption')
  return true
}
