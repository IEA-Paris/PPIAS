
export default function useSearchContent() {
  
  const searchContent = async (search) => {
    let result = {}

    result = await Promise.all([
      queryContent('articles')
        .search(search)
        .where(filtersRaw.articles)
        .limit(3)
        .find(),
      queryContent('media')
        .search(search)
        .where(filtersRaw.articles)
        .only(['caption', 'article_slug'])
        .limit(3)
        .find(),
      queryContent('authors')
        .search(search)
        .where(filtersRaw.articles)
        .only(['slug', 'firstname', 'lastname', 'positions_and_institutions'])
        .limit(3)
        .find(),
      queryContent('articles')
        .search(search)
        .where(filtersRaw.articles)
        .only('[]')
        .find(),
      queryContent('media')
        .search(search)
        .where(filtersRaw.media)
        .only('[]')
        .find(),
      queryContent('authors')
        .search(search)
        .where(filtersRaw.authors)
        .only('[]')
        .find(),
    ])
    return result
  }

  return { searchContent }
}