export default (node, article, media, authors, issues, options) => {
  const getCount = (item, count = 0, type) => {
    item.children &&
      item.children.forEach((element) => {
        if (type === 'text') {
          if (element.type === type) {
            count += element.value === '\n' ? 0 : element.value.length
          } else if (element?.children?.length)
            count = getCount(element, count, type)
        } else if (type === 'link') {
          if (element.tag === 'a') {
            count += 1
          } else if (element?.children?.length)
            count = getCount(element, count, type)
        }
      })
    return count
  }

  // generate count & stats for the graph thumbnails
  article.countMap = [...article.countMap, getCount(node, 0, 'text')]
  article.countRefs = [...article.countRefs, getCount(node, 0, 'link')]
  /*     console.log(`${chalk.green('✔')}  Generated stats for ${document.slug}`) */
  return [node, article, media, authors, issues, options]
}
