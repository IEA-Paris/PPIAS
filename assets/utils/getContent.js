export default async (cat, $content, query, search, deep) => {
  const currentPage = parseInt(query.page) || 1

  const perPage = 5

  const tags = query.tags ? JSON.parse(query.tags) : []
  const pipeline = {
    /* published: true  */
  }
  if (tags.length) pipeline.tags = { $containsAny: tags }
  const count = await $content(cat, { deep }).search(search).where(pipeline).only([]).fetch()

  const totalItems = count.length

  // use Math.ceil to round up to the nearest whole number
  const lastPage = Math.ceil(totalItems / perPage)

  // use the % (modulus) operator to get a whole remainder
  const lastPageCount = totalItems % perPage

  const skipNumber = () => {
    if (+currentPage === 1) {
      return 0
    }
    if (+currentPage === lastPage) {
      if (lastPageCount === 0) {
        return totalItems - perPage
      }

      return totalItems - lastPageCount
    }
    return (currentPage - 1) * perPage
  }
  let items, pinnedItem
  if (currentPage === 1) {
    const rawPosts = await $content(cat, { deep })
      .search(search)
      .where(pipeline)
      .sortBy('date', 'desc')
      .limit(perPage)
      .skip(skipNumber())
      .fetch()

    pinnedItem = await $content(cat, { deep })
      .search(search)
      .where({ ...pipeline, pinned: true })
      .sortBy('date', 'desc')
      .limit(1)
      .fetch()

    items = pinnedItem ? rawPosts.filter((item) => item.slug !== pinnedItem[0]?.slug) : rawPosts
  } else {
    items = await $content(cat, { deep })
      .where(pipeline)
      .search(search)
      .sortBy('date', 'desc')
      .limit(perPage)
      .skip(skipNumber())
      .fetch()
    pinnedItem = false
  }

  if (currentPage === 0 || !items.length) {
    return
  }

  return {
    total: totalItems,
    numberOfPages: lastPage,
    pinnedItem: pinnedItem.length ? pinnedItem[0] : false,
    items,
  }
}
