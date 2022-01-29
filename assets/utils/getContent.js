import filtersRaw from '~/assets/data/filters'
import sortsRaw from '~/assets/data/sorts'
import groupBy from '~/assets/utils/transforms'
export default async (
  cat,

  $content,
  query,
  search = false,
  deep,
  mobile = false,
  perPage = 9
) => {
  const currentPage = parseInt(query.page) || 1
  console.log('args', cat, query, search, deep, mobile, perPage)
  const filters = filtersRaw[cat]
  const sorts = sortsRaw[cat]
  if (search === undefined) search = ''
  const pipeline = {
    ...filters,
  }
  Object.keys(query).forEach((filter) => {
    console.log('typeof filter: ', query[filter])
    if (query[filter]?.length && !['page', 'search'].includes(filter)) {
      const val = JSON.parse(query[filter])
      console.log('val: ', val)
      // check if we are matching against an array value
      if (['tags'].includes(filter)) {
        pipeline[filter] = { $containsAny: val }
        // years to date special case
        // TODO make a fancy feature to limit the gte lt
      } else if (filter === 'years') {
        console.log('year: ', new Date(+val[0] + 1, 0))
        if (val.length > 1) {
          pipeline.$or = val.map((year) => {
            return {
              date: {
                $regex: year,
              },
            }
          })
        } else {
          pipeline.date = { $regex: val[0] }
        }
      } else {
        pipeline[filter] =
          val.length > 1
            ? {
                $in: val,
              }
            : val[0]
      }
    }
  })
  console.log('pipeline: ', pipeline)

  const count = await $content(cat, { deep })
    .search(search)
    .where(pipeline)
    .only('[]')
    .fetch()

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
  let items = await $content(cat, { deep })
    .where(pipeline)
    .search(search)
    .sortBy(sorts)
    .limit(perPage)
    .skip(skipNumber())
    .fetch()

  const pinnedItem = false
  /* } */

  // sort the highlighted items
  if (currentPage === 0 || !items.length) {
    return
  }
  // TODO put in the build scripts @tool/content
  // fetch the item categories
  if (['articles', 'media'].includes(cat)) {
    items = await Promise.all(
      items.map(async (item) => {
        if (item.category_1 && item.category_1.length)
          item.category_1 = await $content(
            item.category_1.split('/').slice(1).join('/').split('.')[0]
          )
            .only(['name', 'color'])
            .fetch()
        if (item.category_2 && item.category_2.length)
          item.category_2 = await $content(
            item.category_2.split('/').slice(1).join('/').split('.')[0]
          )
            .only(['name', 'color'])
            .fetch()
        return item
      })
    )
  }

  // on mobile highlight slots are the first ones
  if (mobile) {
    items = items.sort((a, b) => b.highlight - a.highlight)
  } else {
    // on md highlight slots are on a 1/5/6 pattern
    const availableSlots = perPage / 3

    const highlightedItems = items.filter((item) => item.highlight)

    const slotedHighlightedItems = highlightedItems.slice(0, availableSlots)

    const regularItems = [
      ...highlightedItems.slice(availableSlots),
      ...items.filter((item) => !item.highlight),
    ]

    const sortedItems = []
    slotedHighlightedItems.forEach((element, index) => {
      sortedItems.push(element)
      sortedItems.push(...regularItems.splice(index * 2, 2))
    })
    sortedItems.push(...regularItems)
    items = sortedItems
  }

  return {
    total: totalItems,
    numberOfPages: lastPage,
    pinnedItem: pinnedItem.length ? pinnedItem[0] : false,
    items,
  }
}
