import filtersRaw from '~/assets/data/filters'
export default async ($content, search) => {
  let result = {}

  result = await Promise.all([
    $content('articles', { deep: true })
      .search(search)
      .where(filtersRaw.articles)
      .limit(5)
      .fetch(),
    $content('media', { deep: true })
      .search(search)
      .where(filtersRaw.media)
      .only(['slug', 'caption'])
      .limit(5)
      .fetch(),
    $content('authors', { deep: true })
      .search(search)
      .where(filtersRaw.authors)
      .only(['slug', 'firstname', 'lastname', 'titles_and_institutions'])
      .limit(5)
      .fetch(),
  ])
  console.log('result: ', result)
  return result
}
