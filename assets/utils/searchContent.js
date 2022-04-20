import filtersRaw from '~/assets/data/filters'
export default async ($content, search) => {
  let result = {}

  result = await Promise.all([
    $content('articles', { deep: true })
      .search(search)
      .where(filtersRaw.articles)
      .limit(3)
      .fetch(),
    $content('media', { deep: true })
      .search(search)
      .where(filtersRaw.media)
      .only(['caption', 'article_slug'])
      .limit(3)
      .fetch(),
    $content('authors', { deep: true })
      .search(search)
      .where(filtersRaw.authors)
      .only(['slug', 'firstname', 'lastname', 'titles_and_institutions'])
      .limit(3)
      .fetch(),
    $content('articles', { deep: true })
      .search(search)
      .where(filtersRaw.articles)
      .only('[]')
      .fetch(),
    $content('media', { deep: true })
      .search(search)
      .where(filtersRaw.media)
      .only('[]')
      .fetch(),
    $content('authors', { deep: true })
      .search(search)
      .where(filtersRaw.authors)
      .only('[]')
      .fetch(),
  ])
  return result
}
