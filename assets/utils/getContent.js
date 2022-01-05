import filtersRaw from '~/assets/data/filters'

export default async (cat, $content, query, search, deep, mobile = false, perPage = 9) => {
  const currentPage = parseInt(query.page) || 1
  const filters = filtersRaw[cat]

  const tags = query.tags ? JSON.parse(query.tags) : []
  const pipeline = {
    ...filters,
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

  // sort the highlighted items
  if (currentPage === 0 || !items.length) {
    return
  }
  console.log('mobile: ', mobile)
  console.log('items: ', typeof items)

  // on mobile highlight slots are the first ones
  if (mobile) {
    items = items.sort((a, b) => b.highlight - a.highlight)
  } else {
    // on md highlight slots are on a 1/5/6 pattern
    const availableSlots = perPage / 3
    console.log('availableSlots:', availableSlots)
    const highlightedItems = items.filter((item) => item.highlight)
    console.log('highlightedItems: ', highlightedItems.length)
    const slotedHighlightedItems = highlightedItems.slice(0, availableSlots)
    console.log('slotedHighlightedItems:', slotedHighlightedItems.length)
    const regularItems = [...highlightedItems.slice(availableSlots), ...items.filter((item) => !item.highlight)]
    console.log('regularItems:', regularItems.length)

    const sortedItems = []
    slotedHighlightedItems.forEach((element, index) => {
      sortedItems.push(element)
      sortedItems.push(...regularItems.splice(index * 2, 2))
    })
    sortedItems.push(...regularItems)
    items = sortedItems
  }
  console.log(
    'items2: ',
    items.map((item) => item.article_title),
  )
  console.log(
    'highlights: ',
    items.filter((item) => item.highlight).map((item) => item.article_title),
  )
  return {
    total: totalItems,
    numberOfPages: lastPage,
    pinnedItem: pinnedItem.length ? pinnedItem[0] : false,
    items,
  }
}
