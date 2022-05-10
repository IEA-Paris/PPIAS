import { env } from 'process'
import Citation from 'citation-js'
import {
  insertReferences,
  replaceReferenceInString,
  insertReferencesInAbstract,
} from '../lib/contentUtilities'
import filters from '../../assets/generated/filters'
const fs = require('fs')

export default (document, database) => {
  const chalk = require('chalk')
  if (document.dir.startsWith('/articles') && document.published) {
    document.issueIndex = document.issue?.length
      ? filters.articles.filters.issue.items.indexOf(
          document.issue.slice(15, -3)
        )
      : -1
    try {
      // TODO handle other formats for biblio such as json
      const styles = ['apa', 'vanvouver', 'harvard1']
      const date = new Date(document.createdAt).toLocaleDateString('EN', {
        timezone: 'UTC',
      })
      let cites
      // generate bibliography if required
      if (document.bibliography?.length) {
        const data = fs.readFileSync(
          './static/' + document.bibliography,
          'utf8'
        )
        cites = new Citation(data)
        document.bibliography = cites.data.map((item) => {
          return {
            ...item,
            // TODO update with dynamic lang & add more formats, dynamic default format: https://citation.js.org/api/0.3/tutorial-output_plugins_csl.html
            citation: new Citation(item)
              .format('citation', {
                format: 'text',
                template: 'apa',
                lang: 'en-US',
              })
              // To remove the parentheses
              // TODO come up with a better way (mb a CSL template w/out parenthesis)
              .slice(1, -1),
            APA: new Citation(item).format('bibliography', {
              format: 'html',
              template: 'apa',
              lang: 'en-US',
            }),
            vancouver: new Citation(item).format('bibliography', {
              format: 'html',
              template: 'vancouver',
              lang: 'en-US',
            }),
            harvard1: new Citation(item).format('bibliography', {
              format: 'html',
              template: 'harvard1',
              lang: 'en-US',
            }),
          }
        })
      }

      document.abstract = insertReferencesInAbstract(
        document.abstract,
        document.bibliography
      )
      // make a json like object
      const docData = {
        abstract: document.abstract,
        address: 'PARIS', // TODO update with other IAS/journals city
        type: 'article',
        keywords: document.tags || [],
        // TODO references: add .bib file extract
        reference: cites ? cites.data : [],
        // TODO conference_url: TO BE COMPLETED
        language: document.language || 'en',
        journal: {
          name: 'Proceedings of the Paris Institute for Advanced Study',
          issue: document.issueIndex,
          volume: document.issueIndex,
          identifier: [
            {
              id: env?.config?.ISSN || false, // TODO replace by value from config file,
              type: 'issn',
            },
          ],
        },
        // TODO update for other platforms
        identifier: [
          {
            type: 'DOI',
            id: document.doi,
            url: 'http://dx.doi.org/' + document.doi,
          },
        ],
        link: [{ url: 'https://paris.pias.science/articles/' + document.slug }], // TODO make from dyynamic platform name
        accessed: {
          'date-parts': [new Date().toISOString()],
        },
        issued: {
          'date-parts': [date],
        },
        month: new Date(document.createdAt).toLocaleString('en-US', {
          month: 'short',
        }),
        year: new Date(document.createdAt).getFullYear(),
        title: document.article_title,
        author: document.authors.map((item) => {
          // TODO include all title & institution info
          return {
            name: item.lastname + ', ' + item.firstname,
            firstname: item.firstname,
            lastname: item.lastname,
            id: item.lastname,
            ...(item.titles_and_institutions &&
              item.titles_and_institutions[0] &&
              item.titles_and_institutions[0].institution && {
                affiliation: item.titles_and_institutions[0].institution,
              }),
            ...(item?.orcid_id && { orcid: item?.orcid_id }),
          }
        }),
        license: [
          {
            type: 'copyheart',
            url: 'http://copyheart.org/manifesto/',
            description: 'A great license',
            jurisdiction: 'universal',
          },
        ],
      }

      document.toCite = styles
        .map((style) => {
          const obj = new Citation(docData).format('bibliography', {
            format: 'html',
            template: style,
            lang: 'en-US',
          })
          return { [style]: obj }
        })
        .reduce((rst, tick) => Object.assign(rst, tick), {})
    } catch (err) {
      console.error(err)
    }

    // let's make the DOI if it is not available
    // TODO move elsewhere and include it to the author document backlink rewrite
    /*  if (!document.doi || !document.doi.length) document.doi = getDOI(document) */
    let count = 0
    /*   */
    // we use the issue filter (already sorted by date) to set an index for the fetch of the view by issue

    document.footnotes = []
    document.media = []
    document.years =
      (document.date && document.date.getFullYear()) ||
      new Date().now().getFullYear()
    const toc2 = []
    if (document.yt) {
      document.media.push({
        index: 0,
        type: 'youtube',
        id: document.yt,
        caption: document.article_title,
      })
    }
    document.body.children = document.body.children.map((child, index) => {
      if (child.value !== '\n') {
        count++
        if (
          child?.props?.className &&
          child?.props?.className.length &&
          child?.props?.className[0] === 'footnotes'
        ) {
          child.children
            .find((node) => node.tag === 'ol')
            .children.map((footnote) => {
              if (footnote.tag === 'li') {
                document.footnotes.push({
                  // TODO offset backlink on Y axis
                  backlink: footnote.children[1].props.href,
                  value: replaceReferenceInString(
                    footnote.children[0].value,
                    document.bibliography
                  ),
                })
              }
              return true
            })
          return {
            type: 'element',
            tag: 'div',
            props: { class: 'node d-flex' },
            children: [child],
          }
        }
        // make the upgraded toc
        if (
          document.article_title ===
          'Mental health self-help apps for coping with COVID-19 : Lessons learnt'
        )
          console.log(child.tag)
        const flag = ['h2', 'h3', 'youtube', 'img'].indexOf(child.tag)
        if (flag >= 0 && flag < 3) {
          toc2.push({
            depth: flag + 2,
            id: child.props.id || 'youtube_' + document.media.length,
            text:
              document.toc.find((item) => item.id === child.props.id)?.text ||
              child.props.caption,
            isMedia: flag === 2,
          })
        }
        // it's a youtube video
        if (flag === 2) {
          if (!document.media.find((item) => item.id === child.props.yt))
            document.media.push({
              type: 'youtube',
              index:
                document.media.length -
                (document.yt && document.yt !== child.props.yt ? 0 : 1),
              caption: child.props.caption,
            })
        }
        // it's an image
        if (flag === 3) {
          console.log('child: ', child)
          document.images.push({
            url: child.props.src,
            title: child.props.title,
          })
        }
        return {
          type: 'element',
          tag: 'div',
          isHeading: ['h2', 'h3'].includes(child.tag),
          isMedia: ['youtube'].includes(child.tag),
          isImage: ['img'].includes(child.tag),
          props: { class: 'node d-flex' },
          children: [
            {
              type: 'element',
              tag: 'a',
              props: {
                class:
                  'text-right index mr-3 ' +
                    [' mt-10', ' mt-6', 'mt-3', 'mt-3', 'mt-5'][
                      ['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(child.tag)
                    ] || '',
                id: count,
                href: '#' + count,
                // TODO addd vuetify goTo instead of link
              },
              children: [{ type: 'text', value: count }],
            },
            ...(flag === 2
              ? [
                  {
                    type: 'element',
                    tag: 'h2',
                    props: {
                      class: '',
                      id:
                        'youtube_' +
                        (document.media.length -
                          (document.yt && document.yt !== child.props.yt
                            ? 0
                            : 1)),
                      // TODO addd vuetify goTo instead of link?
                    },
                    children: [{ type: 'text', value: ' ' }],
                  },
                ]
              : []),
            {
              type: 'element',
              tag: 'div',
              props: {
                class: [' ', ' ', '', '', 'youtube', ''][
                  ['h2', 'h3', 'p', 'ul', 'youtube', 'img'].indexOf(child.tag)
                ],
              },
              // insert Bibliographical references
              children: [
                document.bibliography?.length
                  ? insertReferences(child, document.bibliography)
                  : child,
              ],
            },
          ],
        }
      } else {
        // insert Bibliographical references
        return document.bibliography?.length
          ? insertReferences(child, document.bibliography)
          : child
      }
    })

    // replace legacy toc
    document.toc = [
      ...toc2,

      ...(document?.bibliography?.length
        ? [
            {
              depth: 2,
              id: 'bibliography',
              text: 'bibliography',
              isMedia: false,
            },
          ]
        : []),

      ...(document?.footnotes?.length
        ? [
            {
              depth: 2,
              id: 'footnotes',
              text: 'footnotes',
              isMedia: false,
            },
          ]
        : []),
    ]
    /*     console.log(`${chalk.green('✔')}  Formatted article ${document.slug}`) */

    return document
  }
  return document
}
