export default async (cat, $content, query, search, deep) => {
  const currentPage = parseInt(query.page) || 1

  const perPage = 5

  const tags = query.tags ? JSON.parse(query.tags) : []
  const pipeline = { published: true }
  if (tags.length) pipeline.tags = { $containsAny: tags }
  const count = await $content(cat, { deep }).search(search).where(pipeline).only([]).fetch()

  const totalArticles = count.length

  // use Math.ceil to round up to the nearest whole number
  const lastPage = Math.ceil(totalArticles / perPage)

  // use the % (modulus) operator to get a whole remainder
  const lastPageCount = totalArticles % perPage

  const skipNumber = () => {
    if (+currentPage === 1) {
      return 0
    }
    if (+currentPage === lastPage) {
      if (lastPageCount === 0) {
        return totalArticles - perPage
      }

      return totalArticles - lastPageCount
    }
    return (currentPage - 1) * perPage
  }
  let articles, pinnedPost
  if (currentPage === 1) {
    const rawPosts = await $content(cat, { deep })
      .search(search)
      .where(pipeline)
      .sortBy('date', 'desc')
      .limit(perPage)
      .skip(skipNumber())
      .fetch()

    pinnedPost = await $content(cat, { deep })
      .search(search)
      .where({ ...pipeline, pinned: true })
      .sortBy('date', 'desc')
      .limit(1)
      .fetch()

    articles = pinnedPost ? rawPosts.filter((item) => item.slug !== pinnedPost[0]?.slug) : rawPosts
  } else {
    articles = await $content(cat, { deep })
      .where(pipeline)
      .search(search)
      .sortBy('date', 'desc')
      .limit(perPage)
      .skip(skipNumber())
      .fetch()
    pinnedPost = false
  }

  if (currentPage === 0 || !articles.length) {
    return
  }

  return {
    count: totalArticles,
    pages: lastPage,
    pinnedPost: pinnedPost.length ? pinnedPost[0] : false,
    articles,
  }
}
