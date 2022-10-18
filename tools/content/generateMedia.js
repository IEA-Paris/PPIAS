import { mergeDeep, insertDocuments } from '../lib/contentUtilities'
export default async (content) => {
  const { $content } = require('@nuxt/content')
  // TODO filter fields using .only(['field'])
  console.log('generating media')
  let media = await $content('articles', { deep: true })
    .where({ published: true })
    .fetch()
  media = media
    .filter((item) => item.media && item.media.length)
    .map((item, index) => {
      return {
        article_slug: item.slug,
        ...item.media['0'],
        date: item.date,
        issue: item.issue,
        highlight: item.highlight,
        language: item.language,
        tags: item.tags,
        years: item.years,
        picture: item.picture,
      }
    })
    .flat()
    .filter((item, index, self) => item !== undefined)
  // TODO remove duplicate media ID (?)

  await insertDocuments(media, 'media', ['article_slug', 'caption'])
}
