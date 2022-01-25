export default (document) => {
  const chalk = require('chalk')

  const getCount = (item, count = 0, type) => {
    item.children &&
      item.children.forEach((element) => {
        if (type === 'text') {
          if (element.type === type) {
            count += element.value === '\n' ? 0 : element.value.length
          } else if (element?.children.length)
            count = getCount(element, count, type)
        } else if (type === 'link') {
          if (element.tag === 'a') {
            count += 1
          } else if (element?.children.length)
            count = getCount(element, count, type)
        }
      })
    return count
  }
  // we assume it is markdown
  /*     if (document.extension === '.md') { */
  // generate count & stats for the graph thumbnails
  if (document.dir.startsWith('/articles') && document.published) {
    const countMap = []
    const countRefs = []
    document.body.children.forEach((child) => {
      countMap.push(getCount(child, 0, 'text'))
      countRefs.push(getCount((child, 0, 'link')))
    })
    document.countMap = countMap
    document.countRefs = countRefs
    console.log(`${chalk.green('✔')}  Generated stats for ${document.slug}`)
    return document
  }
  return document
}
