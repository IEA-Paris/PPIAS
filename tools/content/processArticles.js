import getDOI from './getDOI'
export default async (content) => {
  const { $content } = require('@nuxt/content')
  // TODO filter fields using .only(['field'])
  const articles = await $content('articles', { deep: true })
    .where({ published: true })
    .fetch()
  Promise.all(
    articles.map(async (article, index) => {
      article = await getDOI(article)
    })
  )
}
