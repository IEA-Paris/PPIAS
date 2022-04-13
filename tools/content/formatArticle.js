import { env } from 'process'
import Citation from 'citation-js'
import { insertReferences } from '../lib/contentUtilities'
const fs = require('fs')

export default (document, database) => {
  const chalk = require('chalk')
  if (document.dir.startsWith('/articles') && document.published) {
    // and generate bibliography if required
    if (document.bibliography?.length) {
      try {
        const data = fs.readFileSync(
          './static/' + document.bibliography,
          'utf8'
        )
        // TODO handle other formats for biblio such as json
        const cites = new Citation(data)
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
              // TODO come up with a better way
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
      } catch (err) {
        console.error(err)
      }
    }

    // let's make the DOI if it is not available
    // TODO move elsewhere and include it to the author document backlink rewrite
    /*  if (!document.doi || !document.doi.length) document.doi = getDOI(document) */
    let count = 0
    /*   */
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
                  value: footnote.children[0].value,
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
        const flag = ['h2', 'h3', 'youtube'].indexOf(child.tag)
        if (flag >= 0) {
          toc2.push({
            depth: flag + 2,
            id: child.props.id || 'youtube_' + document.media.length,
            text:
              document.toc.find((item) => item.id === child.props.id)?.text ||
              child.props.caption,
            isMedia: flag === 2,
          })
        }
        if (flag === 2) {
          if (!document.media.find((item) => item.id === child.props.yt))
            document.media.push({
              type: 'youtube',
              index: document.media.length - (document.yt ? 1 : 0),
              caption: child.props.caption,
            })
        }
        return {
          type: 'element',
          tag: 'div',
          isHeading: ['h2', 'h3'].includes(child.tag),
          isMedia: ['youtube'].includes(child.tag),
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
                        (document.media.length - (document.yt ? 1 : 0)),
                      // TODO addd vuetify goTo instead of link
                    },
                    children: [{ type: 'text', value: ' ' }],
                  },
                ]
              : []),
            {
              type: 'element',
              tag: 'div',
              props: {
                class: [' ', ' ', '', '', 'youtube'][
                  ['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(child.tag)
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
    // insert Bibliographical references

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
