import filtersRaw from '~/assets/data/filters'
import groupBy from '~/assets/utils/transforms'
export default async (cat, $content, query, search, deep, mobile = false, perPage = 9) => {
  console.log('cat: ', cat)
  const currentPage = parseInt(query.page) || 1
  console.log('currentPage: ', currentPage)

  const filters = filtersRaw[cat]

  const tags = query.tags ? JSON.parse(query.tags) : []
  const pipeline = {
    ...filters,
  }
  console.log('pipeline: ', pipeline)
  if (tags.length) pipeline.tags = { $containsAny: tags }
  const count =
    cat === 'articles'
      ? await $content(cat, { deep }).search(search).where(pipeline).only('[]').fetch()
      : (
          await $content('articles', { deep })
            .search(search)
            .only([
              ...(cat === 'authors' ? ['authors'] : []),
              ...(cat === 'media' ? ['media'] : []),
              ...(cat === 'media' ? ['category_1'] : []),
              ...(cat === 'media' ? ['category_2'] : []),
              ...(cat === 'media' ? ['highlight'] : []),
              ...(cat === 'media' ? ['date'] : []),
              'slug',
            ])
            .fetch()
        )
          .filter((item) => item[cat] && item[cat].length)
          .map((i) => {
            return {
              slug: i.slug,
              ...i[cat]['0'],
              ...(cat === 'media' && { date: i.date }),
              ...(cat === 'media' && { category_1: i.category_1 }),
              ...(cat === 'media' && { category_2: i.category_2 }),
              ...(cat === 'media' && { highlight: i.highlight }),
            }
          })
          .flat()
          .filter((item) => item !== undefined)

  console.log('count: ', count)

  // merge authors
  if (cat === 'authors') {
    // first we merge those with the same orcid
    const sortedItems = count.reduce(function (rv, x) {
      ;(rv[x.social_channels.orcid] = rv[x.social_channels.orcid] || []).push(x)
      return rv
    }, {})
    console.log('sortedItems: ', sortedItems)
  }
  const totalItems = count.length

  console.log('totalItems: ', totalItems)

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
  console.log(skipNumber())
  // pinned logic (removed)
  /* let items, pinnedItem
  if (currentPage === 1) {
    const rawItems =
      cat === 'articles'
        ? await $content(cat, { deep })
            .where(pipeline)
            .search(search)
            .sortBy('date', 'desc')
            .limit(perPage)
            .skip(skipNumber())
            .fetch()
        : count

    pinnedItem = await $content(cat, { deep })
      .search(search)
      .where({ ...pipeline, pinned: true })
      .sortBy('date', 'desc')
      .limit(1)
      .fetch()

    items = pinnedItem ? rawItems.filter((item) => item.slug !== pinnedItem[0]?.slug) : rawItems
  } else { */
  let items =
    cat === 'articles'
      ? await $content(cat, { deep })
          .where(pipeline)
          .search(search)
          .sortBy('date', 'desc')
          .limit(perPage)
          .skip(skipNumber())
          .fetch()
      : count
  const pinnedItem = false
  /* } */

  // sort the highlighted items
  if (currentPage === 0 || !items.length) {
    return
  }
  // fetch the item categories
  items = await Promise.all(
    items.map(async (item) => {
      if (item.category_1)
        item.category_1 = await $content(item.category_1.split('/').slice(1).join('/').split('.')[0])
          .only(['name', 'color'])
          .fetch()
      if (item.category_2)
        item.category_2 = await $content(item.category_2.split('/').slice(1).join('/').split('.')[0])
          .only(['name', 'color'])
          .fetch()
      return item
    }),
  )
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
  console.log('items: ', items.length)

  return {
    total: totalItems,
    numberOfPages: lastPage,
    pinnedItem: pinnedItem.length ? pinnedItem[0] : false,
    items,
  }
}
