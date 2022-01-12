import path from 'path'
import fs from 'fs'
import { dump } from 'js-yaml'
import fsExtra from 'fs-extra'
import slugify from '../../assets/utils/slugify'
/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export const mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]
      if (obj[key] !== undefined || prev[key] !== undefined) {
        if (prev[key] === undefined) prev[key] = obj[key]
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          if (
            (pVal[0] && typeof pVal[0] === 'object') ||
            (oVal[0] && typeof oVal[0] === 'object')
          ) {
            prev[key] = mergeDeep(pVal, oVal)
          } else {
            const newArr = [...pVal.concat(...oVal)]
            prev[key] = newArr.filter((value, index) => {
              const _value = JSON.stringify(value)
              return (
                index ===
                newArr.findIndex((obj) => {
                  return JSON.stringify(obj) === _value
                })
              )
            })
          }
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      }
    })

    return prev
  }, {})
}
export const insertDocuments = (data, cat, filenameFlag) => {
  // create the folder structure or delete all the previous author files
  for (const folder of 'abcdefghijklmnopqrstuvwxyz') {
    const folderPath = path.resolve('content/' + cat + '/' + folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
      console.log('make folder: ', 'content/' + cat + '/' + folder)
    } else {
      console.log('empty folder: ', 'content/' + cat + '/' + folder)
      fsExtra.emptyDirSync(folderPath)
    }
  }

  // create the new ones
  data.forEach((doc, index) => {
    // only keep relevant fields in the stored document
    const fieldsToDelete = [
      'slug',
      'body',
      'dir',
      'path',
      'extension',
      'updatedAt',
      'toc',
      'description',
      'title',
      'text',
    ]
    const filteredDoc = Object.fromEntries(
      Object.entries(doc).filter(([k]) => !fieldsToDelete.includes(k))
    )
    const fileName = slugify(doc[filenameFlag].trim()) + '.md'

    console.log('fileName: ', fileName)
    const filePath = path.join('content/' + cat + '/' + fileName[0], fileName)
    console.log('filePath: ', filePath)

    fs.writeFileSync(
      './content/' + cat + '/' + fileName[0] + '/' + fileName,
      `---
${dump(filteredDoc)}
---
${doc.text ? doc.text : ''}`
    )
  })
}
