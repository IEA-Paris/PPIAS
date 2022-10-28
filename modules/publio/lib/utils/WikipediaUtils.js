import fs from 'fs'

import disciplinesWikipedia from '../../assets/data/disciplinesWikipedia'
const axios = require('axios')
const resultRaw = []
const result = {}
export const getTranslations = async (item = false) => {
  try {
    if (item) {
      console.log('lookup: ', item)
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${item}&prop=langlinks&lllimit=500&format=json`
      const rst = (await axios.get(url)).data.query
      const langlinks = rst?.pages[Object.keys(rst.pages)[0]]?.langlinks
      result[item] = langlinks
        ? langlinks.reduce(
            // eslint-disable-next-line no-sequences
            (obj, item) => ((obj[item.lang] = item['*']), obj),
            {}
          )
        : false
      console.log('got: ', item)
      return langlinks
        ? langlinks.reduce(
            // eslint-disable-next-line no-sequences
            (obj, item) => ((obj[item.lang] = item['*']), obj),
            {}
          )
        : false
    } else {
      return false
    }
  } catch (error) {
    console.log('item: ', item)
    console.log('error: ', error)
  } finally {
    /*     await new Promise((resolve) => setTimeout(resolve, 1000))
    // eslint-disable-next-line no-unsafe-finally
    return getTranslations(item) */
  }
}

export const makeStuff = async () => {
  await recusivelyGetTranslations({
    children: disciplinesWikipedia,
  })
  console.log('resultRaw: ', resultRaw)
  for (let index = 0; index < resultRaw.length; index++) {
    console.log('tick')
    await getTranslations(resultRaw[index])
    await new Promise((resolve) => setTimeout(resolve, 30))
  }
  console.log('result: ', result)
  await fs.writeFileSync('resultField.js', JSON.stringify(result))
}
const recusivelyGetTranslations = (stuff) => {
  try {
    // start with root level
    if (stuff.href || stuff.id) {
      console.log('TICK1')
      resultRaw.push(stuff.href || stuff.id)
    }
    if (stuff.children?.length) {
      stuff.children.forEach((element) => {
        if (element.href || element.id) {
          resultRaw.push(element.href || element.id)
        }
        if (element.children?.length) {
          element.children.forEach((child) => {
            recusivelyGetTranslations(child)
          })
        }
      })
    }
    return stuff
  } catch (error) {
    console.log('error: ', error)
  }
}
