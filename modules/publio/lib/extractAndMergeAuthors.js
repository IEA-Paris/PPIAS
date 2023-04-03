import fs from 'fs'
import parseMD from 'parse-md'
import { mergeDeep, insertDocuments } from '../utils/contentUtilities'

const filterAndMerge = (first, second) => {
  first = first.filter((author) => {
    // does it have a reference? (a reference is the path of the author document.
    // If present, it means that the doc in "first", author data extracted from an article,
    // explicitely referenced an author document to distinguish from potential homonyms)
    if (author.reference && author.reference.length) {
      // is it matching an existing doc?
      const referencedDocIndex = second.findIndex(
        (doc) =>
          doc.path ===
          author.reference.split('/').slice(1).join('/').split('.')[0]
      )
      if (referencedDocIndex > -1) {
        // if so we merge them and remove the related articleAuthor
        second[referencedDocIndex] = mergeDeep(
          second[referencedDocIndex],
          author
        )
        return false
      }
    }
    return true
  })

  first = first.filter((author) => {
    if (!author.social_channels)
      if (author?.social_channels?.orcid) {
        // does it have an orcid?
        // is it matching an existing doc?
        const referencedDocIndex = second.findIndex(
          (doc) => author.social_channels.orcid === doc.social_channels.orcid
        )
        if (referencedDocIndex > -1) {
          // if so we merge them and remove the related articleAuthor
          second[referencedDocIndex] = mergeDeep(
            second[referencedDocIndex],
            author
          )
          return false
        }
      }
    return true
  })

  first = first.filter((author) => {
    // does it have the same firstname/lastname than a doc author?
    const referencedDocIndex = second.findIndex((doc) => {
      if (doc.is_institution && author.is_institution) {
        return (
          author.lastname &&
          doc.lastname &&
          author.lastname.trim().toLowerCase() ===
            doc.lastname.trim().toLowerCase()
        )
      } else {
        return (
          !doc.is_institution &&
          !author.is_institution &&
          author.firstname &&
          doc.firstname &&
          author.firstname.trim().toLowerCase() ===
            doc.firstname.trim().toLowerCase() &&
          author.lastname &&
          doc.lastname &&
          author.lastname.trim().toLowerCase() ===
            doc.lastname.trim().toLowerCase()
        )
      }
    })

    // if so we merge them and remove the related articleAuthor
    if (referencedDocIndex > -1) {
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })
  // remove the authors document that match no article
  /* second = second.filter((author) => !author.reference) */
  return { first, second }
}

export default async (content, options) => {
  const chalk = require('chalk')
  const { $content } = require('@nuxt/content')

  // fetch all authors documents
  let authorsDocs = await $content('authors', { deep: true }).fetch()
  const issues = await $content('issues', { deep: true }).fetch()
  // and all the authors defined in the articles frontmatter
  const articles = await $content('articles', { deep: true })
    .where({ published: true })
    .only([
      'slug',
      'path',
      'authors',
      'language',
      'article_title',
      'date',
      'tags',
      'years',
      'issue',
      'published',
    ])
    .fetch()
  // let's add the DOI
  // we use this opportunity to get the dynamic routes for pdf-printing all the articles
  await writePrintRoutes(articles)

  // extract the authors from articles with backlink
  let articleAuthors = articles
    .map((article) =>
      article.authors.map((author) => {
        return {
          ...author,
          articles: [article.slug],
          tags: article.tags,
          years: [article.years],
          issue: [...(article.issue ? [article.issue] : [])].flat(),
          language: [article.language],
        }
      })
    )
    .flat()
  // include the document body from the original document to avoid a round trip md <> JSON AST
  authorsDocs = authorsDocs.map((doc) => {
    const fileContents = fs.readFileSync('content' + doc.path + '.md', 'utf8')
    const { content } = parseMD(fileContents)
    return {
      ...doc,
      text: content || false,
    }
  })
  const firstPass = filterAndMerge(articleAuthors, authorsDocs)
  articleAuthors = firstPass.first
  authorsDocs = firstPass.second
  // TODO: come up with a global approach for non destructive merge,
  // that could explicitely removed papers that were published but are not anymore
  // or X other reason why it should be marked as from this author anymore)
  const secondPass = filterAndMerge(articleAuthors, articleAuthors)
  articleAuthors = secondPass.first

  authorsDocs = [...authorsDocs, ...secondPass.second]
  authorsDocs = authorsDocs.map((item) => {
    // replace the titles and institutions array of object by an array of arrays (prismjs related?)
    return {
      ...item,
      firstname: item.firstname.trim(),
      lastname: item.lastname.trim(),
      // check that authors have at least one published paper
      active: !!articles.find(
        (article) =>
          item.articles &&
          item.articles?.includes(article.slug) &&
          article.published
      ),
      exerpt: item.text?.length ? item.text.slice(0, 350) : '',
      positions_and_institutions:
        item.positions_and_institutions &&
        Object.keys(item.positions_and_institutions).map((el) => {
          return item.positions_and_institutions[el]
        }),
    }
  })
  return filterAndMerge(authorsDocs, articleAuthors).first.flat()
}
