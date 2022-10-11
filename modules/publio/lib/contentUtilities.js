/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-regex-literals */
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import fsExtra from 'fs-extra'
/* import { Repository, Tree, Diff } from 'nodegit' */
import slugify from './slugify'
import { formatAuthors } from './transforms'
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
  'checksum',
]
function processFrontmatter(md, options) {
  const frontmatter = matter(md).data
  Object.entries(options).forEach(function ([fieldName, value]) {
    if (value === 'del' || value === '-') {
      delete frontmatter[fieldName]
    } else {
      frontmatter[fieldName] = value
    }
  })

  return matter.stringify(matter(md))
}
/* export const printWikipediaDisciplines = () => {
  const result = disciplines
  const replaceUl = (node) => {
    if (
      node.children &&
      node.children[0] &&
      node.children[0].tag === 'ul' &&
      node.children[0].children.length
    ) {
      console.log('REMOVED UL', node.children[0].tag === 'ul')
      node.children = [
        ...node.children[0].children,
        ...(node.children &&
        Array.isArray(node.children) &&
        node.children.length > 1
          ? node.children.shift()
          : []),
      ]
    }
    if (
      node.children &&
      node.children[0] &&
      node.children[0].tag === 'ul' &&
      node.children[0].children.length
    ) {
      replaceUl(node)
    }
    return node
  }
  const processNode = (node) => {
    try {
      // handle description
      if (node.description?.children?.length) {
        let description = `
      <p>
      `
        node.description.children.forEach((descriptionChild) => {
          if (descriptionChild.type === 'text')
            description += descriptionChild.value
          if (descriptionChild.tag === 'a')
            description += `<a href="https://en.wikipedia.org/wiki/${descriptionChild.href}" target="_blank">${descriptionChild.value}</a>`
          if (descriptionChild.tag === 'em')
            description += `<br><b>${descriptionChild?.children
              .map((i) => processNode(i))
              .join()}</b>`
        })
        node.description = description + '</p>'
      }
      replaceUl()
      if (node.outline?.length) {
        node.outline = 'https://en.wikipedia.org/wiki/' + node.outline
      }
      if (node.children) {
        node.children.forEach((child) => {
          child = processNode(child)
          /*  if () 
        })
      }
      return node
      // is it a category?
    } catch (error) {
      console.log('error: ', error)
      console.log('node.children: ', node.value)
      return node
    }
  }
  disciplines.forEach((item) => {
    processNode(item)
    item = processNode(item)
  })
  fs.writeFileSync('result.js', JSON.stringify(result))
  // start with h2 nodes
 const headers2 = 
  return content 
} */
/* export const getStagedChanges = async () => {
  const emptyTree = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'
  const repo = await Repository.open(path.resolve('./.git'))

  const head = await repo.getHeadCommit()
  if (!head) {
    return []
  }
  const tree = await (head ? head.getTree() : Tree.lookup(repo, emptyTree))
  const diff = await Diff.treeToIndex(repo, tree, null)
  const patches = await diff.patches()
   console.log(patches.map((patch) => patch.newFile().path())) 
} 
async function print() {
  const repo = await Repository.open(path.resolve('./.git'))
  const diff = await Diff.indexToWorkdir(repo, null, {
    flags:
      Diff.OPTION.SHOW_UNTRACKED_CONTENT | Diff.OPTION.RECURSE_UNTRACKED_DIRS,
  })

  // you can't simple log diff here, it logs as empty object
  // console.log(diff); // -> {}

  diff.patches().then((patches) => {
    patches.forEach((patch) => {
      patch.hunks().then((hunks) => {
        hunks.forEach((hunk) => {
          hunk.lines().then((lines) => {
                    console.log('diff', patch.oldFile().path(), patch.newFile().path())
            console.log(hunk.header().trim()) 
            lines.forEach((line) => {
                    console.log(
                String.fromCharCode(line.origin()) + line.content().trim()
              ) 
            })
          })
        })
      })
    })
  })

  return diff
}

print().catch((err) => console.error(err)) */
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
        if (prev[key] === undefined) prev[key] = oVal
        // if we deal with an array
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          // check its items type
          if (
            (pVal[0] && typeof pVal[0] === 'object') ||
            (oVal[0] && typeof oVal[0] === 'object')
          ) {
            // if object, recursive call
            prev[key] = mergeDeep(pVal, oVal)
          } else {
            // if not we concat
            const newArr = [...pVal.concat(...oVal)]
            // and deduplicate
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
          // if object, recursive call
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
          // if string and the base is not set
        } else if (typeof oVal === 'string' && !prev[key].length && oVal.length)
          prev[key] = oVal.trim()
        // if string and both are set (conflict) // TODO decide on a conflict default strategy
        else if (
          typeof oVal === 'string' &&
          prev[key].length &&
          oVal.length &&
          prev[key].trim() !== oVal.trim()
        ) {
          prev[key] = pVal.trim() // just to cleanup the existing string from spaces
          // TODO write conflicts in a file somewhere to use it in CMS
          console.log(`CONFLICTED INFO: ${prev[key]} VS ${oVal} in ${key}`)
        } else if (typeof prev[key] === 'string') prev[key] = prev[key].trim()

        // TODO handle cases where we wanna add the different values instead of replacing
      }
    })
    return prev
  }, {})
}
export const generateChecksum = (str, algorithm, encoding) => {
  const crypto = require('crypto')
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}
export const writePrintRoutes = async () => {
  // first, we clean existing files
  const targetFolder = path.resolve('static/pdfs')
  /*   if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true })
  } else {
    fsExtra.emptyDirSync(targetFolder)
  } */
  console.log('writePrintRoutes')

  const { $content } = require('@nuxt/content')
  // TODO : replace {published:true} with dynamic filters from import
  const articles = await $content('articles', { deep: true })
    // TODO check that custom_PDF is correctly evaluated
    .where({ $and: [{ published: true }, { custom_pdf: { $ne: true } }] })
    .fetch()
  /*   console.log(
    'articles: ',
    articles.map((art) => art.article_title)
  ) */
  console.log('articles: ', articles.length)

  return articles.map((article) => {
    // if the file has been changed
    return {
      // Route to content that should be converted into pdf.
      route: '/print/' + article.slug,
      file: 'pdfs/' + article.slug + '.pdf',
      // Default option is to remove the route after generation so it is not accessible
      keep: false, // defaults to false
      // Specifify language for pdf. (Only when i18n is enabled!)
      /*   locale: 'da', */
      // Override global meta with individual meta for each pdf.
      // TODO complete and change produced depending on the journal
      meta: {
        title: article.article_title,

        author: formatAuthors(article.authors).replace('&nbsp;', ' '),

        producer: 'PPIAS - Proceeding of Paris Institution for Advanced Study',

        // Control the date the file is created.
        creationDate: article.createdAt,

        keywords: article.tags || [],
        language: article.language || 'en',
      },
    }
  })
  /*     )
  ) */
}
export const cleanupString = (str) =>
  str
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace('<br>', ' ')
    .replace(/\u00A0/g, ' ')
    .trim()

export const deepEqual = (x, y) =>
  // cleanUpString is meant to avoid discrepancies with possible changes that Zenodo makes on the string, regarding mostly html entities.
  Object.keys(x).every((key) => {
    /*     console.log('X', x[key])
    console.log('typeof X', typeof x[key])
    console.log('Y', y[key])
    console.log('typeof Y', typeof y[key]) */
    // if it is a primitive type, let's proceed
    if (['string', 'integer', 'boolean', 'undefined'].includes(typeof x[key])) {
      return typeof item === 'string'
        ? cleanupString(x[key]) === cleanupString(y[key])
        : // eslint-disable-next-line eqeqeq
          x[key] == y[key]
    }
    // deal with the arrays (recursive since it could be an array of objects, e.g. authors)
    else if (typeof x[key] === 'object') {
      // array of stuff or object?
      if (Array.isArray(x[key])) {
        if (x[key].length) {
          // check if it an array of primitives or an array of objects
          if (['string', 'integer', 'boolean'].includes(typeof x[key][0])) {
            if (
              !x[key].every(
                (item, index) =>
                  cleanupString(item) === cleanupString(y[key][index])
              )
            )
              console.log('NOK')
            return x[key].every((item, index) =>
              typeof item === 'string'
                ? cleanupString(item) === cleanupString(y[key][index])
                : item === y[key][index]
            )
          } else {
            const sortedX = x[key].sort()
            const sortedY = y[key].sort()
            let isOk = true
            sortedX.forEach((element, index) => {
              if (!deepEqual(element, sortedY[index])) isOk = false
            })
            if (!isOk) console.log('isOk: ', isOk)

            return isOk
          }
        } else {
          // no items in array
          return (Array.isArray(y[key]) && !y[key].length) || y[key] === null
        }
      } else {
        // it is a regular object
        return deepEqual(x[key], y[key])
      }
    } else {
      console.log('NOK: unanticipated value for ', x[key])
      return false
    }
  })

export const updateArticlesDoiAndZid = (document) => {
  const data = fs.readFileSync('./content' + document.path + '.md', 'utf8')
  const markdown = data.split('---')[2]
  const frontmatter = yaml.load(data.split('---')[1])
  if (
    (document.DOI && !frontmatter.DOI) ||
    (document.Zid && !frontmatter.Zid)
  ) {
    if (document.DOI && !frontmatter.DOI) frontmatter.DOI = document.DOI
    console.log('document.DOI: ', document.DOI)
    if (document.Zid && !frontmatter.Zid) frontmatter.Zid = document.Zid
    console.log('document.Zid: ', document.Zid)
    // writeFlag is true only if the
    fs.writeFileSync(
      './content' + document.path + '.md',
      `---
${yaml.dump(frontmatter, { noRefs: true, sortKeys: true })}
---
${markdown || ''}`
    )
  }
}
export const batchInsertArticles = (data) => {
  data.forEach((article) => {
    // start by creating the folder if it doesn't exist
    const folderPath =
      'content/articles/' +
      (article.issue?.length ? article.issue.slice(15, -3) : '') +
      (article.issue?.length && article.subissue?.length
        ? '/' + slugify(article.subissue)
        : '')

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
    // then dump the data in a file if there is not one already
    const fileName = folderPath + '/' + slugify(article.article_title) + '.md'
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(
        fileName,
        `---
${yaml.dump(article, { noRefs: true, sortKeys: true })}
---
`
      )
    } else {
      console.log('ARTICLE ALREADY EXISTS AT ', fileName)
    }
  })
}
export const insertDocuments = (data, cat, filenameFlag) => {
  // filenameFlag is used to indicate which attribute to build the path upon
  // e.g. authors =  ['lastname', 'firstname'] or media = ['article_slug', 'caption']

  // TODO diff and selectively CRUD
  // create the folder structure or delete all the previous files
  // console.log('creating folder structure for ', cat)
  for (const folder of cat === 'articles'
    ? data.map((item) => item.issue.slice(15, -3))
    : '0123456789abcdefghijklmnopqrstuvwxyz') {
    const folderPath = path.resolve('content/' + cat + '/' + folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    } else {
      fsExtra.emptyDirSync(folderPath)
    }
  }
  const findFileName = (fileName, index = 2) => {
    // file exists
    if (
      fs.existsSync(
        './content/' +
          cat +
          '/' +
          fileName[0] +
          '/' +
          fileName +
          '_' +
          index +
          '.md'
      )
    ) {
      index++
      return findFileName(fileName, index)
    } else {
      return fileName + '_' + index + '.md'
    }
  }
  // create the new ones
  data.forEach((doc, index) => {
    const filteredDoc = Object.fromEntries(
      Object.entries(doc).filter(([k]) => !fieldsToDelete.includes(k))
    )
    let fileName = slugify(
      doc[filenameFlag[0]] +
        (doc[filenameFlag[1]] && doc[filenameFlag[1]].length
          ? '_' + doc[filenameFlag[1]] || ''
          : '')
    )
    if (
      fs.existsSync(
        './content/' + cat + '/' + fileName[0] + '/' + fileName + '.md'
      )
    ) {
      fileName = findFileName(fileName, 1)
    } else {
      fileName = fileName + '.md'
    }
    fs.writeFileSync(
      './content/' + cat + '/' + fileName[0] + '/' + fileName,
      `---
${yaml.dump(filteredDoc, { noRefs: true, sortKeys: true })}
---
${doc.text ? doc.text : ''}`
    )
  })
}
/* export const generateDisciplines = () => {
  // TODO make selective depending on website settings
  disciplines.forEach((area) => {})
} */
// eslint-disable-next-line no-misleading-character-class
const referenceRegex = new RegExp(
  // eslint-disable-next-line no-misleading-character-class
  /@[\w-' '陳大文łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹßÇŒÆČŠŽ.âê都道府県Федерацииআবাসযোগ্য জমির걸쳐 있는:!\/,?.;*$=()\\&-'"&²¹`#\[\]\{\}\%\#\$\^\~\&\_]+_[\w-' '陳大文łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹßÇŒÆČŠŽ.âê都道府県Федерацииআবাসযোগ্য জমির걸쳐 있는:!\/,?.;*$=()\\&-'"&²¹`#\[\]\{\}\%\#\$\^\~\&\_]+_\d{4}/,
  'i'
)
export const insertReferencesInAbstract = (text, biblio) => {
  const matches = text.match(referenceRegex)
  if (matches !== null) {
    const element = matches[0]
    // find the related reference
    const ref = biblio.find(
      (item) => item.id === element.toLowerCase().substring(1)
    )
    if (!ref) {
      // TODO write it in a file somewhere to use it in CMS
      console.log('REFERENCE NOT FOUND IN BIB FILE: ', element)
    } else {
      text = insertReferencesInAbstract(
        text.replace(element, ref.citation),
        biblio
      )
    }
    // edit the node to include the link
    return text
  }
  return text
}
export const insertReferences = (node, biblio) => {
  try {
    const replaceReference = (node) => {
      // only match citation keys (@author_title_year)
      // 'author' 'title' above refer to the first word of these only

      const matches = node.value.match(referenceRegex)
      // do we have references to replace?
      if (matches !== null) {
        const element = matches[0]
        // find the related reference
        const ref = biblio.find(
          (item) => item.id === element.toLowerCase().substring(1)
        )
        if (!ref) {
          // TODO write it in a file somewhere to use it in CMS
          console.log('REFERENCE NOT FOUND IN BIB FILE: ', element)
        } else {
          ref.link = true
          // edit the node to include the link
          node = {
            type: 'element',
            tag: 'span',
            props: { class: 'node' },
            children: [
              { type: 'text', value: node.value.split(element)[0] },
              {
                type: 'element',
                tag: 'a',
                props: {
                  id: 'bb-' + ref.id,
                  href: '#bb-' + ref.id,
                  onclick: 'event.stopPropagation();',
                },
                children: [
                  {
                    type: 'text',
                    value: ref.citation,
                  },
                ],
              },
              node.value.split(element).slice(1).join(element) &&
                replaceReference({
                  type: 'text',
                  value: node.value.split(element).slice(1).join(element),
                }),
            ],
          }
        }
      }
      return node
    }
    if (node.type === 'text') {
      node = replaceReference(node)
    } else if (node?.children?.length > 0) {
      node.children = node.children.map((child) =>
        insertReferences(child, biblio)
      )
    }
    return node
  } catch (error) {
    console.log('error: ', error)
  }
}
export const replaceReferenceInFootnote = (footnote, biblio) => {
  if (!footnote.value && footnote.children.length) {
    footnote.children = footnote.children.map((footNoteChild) =>
      replaceReferenceInFootnote(footNoteChild, biblio)
    )
  } else if (footnote.value) {
    const matches = footnote.value.match(referenceRegex)
    if (matches !== null) {
      for (let index = 0; index < matches.length; index++) {
        const element = matches[index]
        // find the related reference
        const ref = biblio.find(
          (item) => item.id === element.toLowerCase().substring(1)
        )
        if (!ref) {
          console.log('REFERENCE NOT FOUND IN BIB FILE: ', element)
          continue
        }
        ref.link = true
        // edit the node to include the link
        footnote.value = footnote.value.replace(
          element,
          `<a id="bb-${ref.id}" href="#bb-${ref.id}" onclick="event.stopPropagation();">${ref.citation}</a>`
        )
      }
    }
  } else {
    console.log('NO FOOTNOTE VALUE')
  }
  return footnote
}
