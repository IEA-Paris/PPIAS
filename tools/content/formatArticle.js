import Citation from 'citation-js'
import {
  insertReferences,
  replaceReferenceInFootnote,
  insertReferencesInAbstract,
} from '../lib/contentUtilities'
import filters from '../../assets/generated/filters'
import config from '../../config.js'

export default (document) => {
  if (document.dir.startsWith('/articles') && document.published) {
    // we use the issue filter (already sorted by date) to set an index for the fetch of the view by issue
    // TODO find out why issueIndex is not attributed sometimes
    document.issueIndex = document.issue?.length
      ? filters.articles.filters.issue.items.indexOf(
          document.issue.slice(15, -3)
        )
      : -1
    try {
      // TODO handle other formats for biblio such as json
      // TODO import formats from config file
      const styles = ['apa', 'vanvouver', 'harvard1']
      const date = new Date(document.createdAt).toLocaleDateString('EN', {
        timezone: 'UTC',
      })
      if (document.bibliography?.length) {
        document.abstract = insertReferencesInAbstract(
          document.abstract,
          document.bibliography
        )
      }

      // make a json like object
      const docData = {
        abstract: document.abstract,
        address: config.address, // TODO update with other IAS/journals city
        type: 'article',
        keywords: document.tags || [],
        // TODO conference_url: TO BE COMPLETED
        language: document.language || 'en',
        journal: {
          name: 'Proceedings of the Paris Institute for Advanced Study',
          issue: document.issueIndex,
          volume: document.issueIndex,
          identifier: [
            ...(config.identifier.ISSN
              ? [
                  {
                    id: config.identifier.ISSN,
                    type: 'issn',
                  },
                ]
              : []),
          ],
        },
        identifier: [
          {
            ...(document.doi && {
              type: 'DOI',
              id: document.doi,
              url:
                'http://dx.doi.org/' +
                document.doi +
                (config.identifier.ISSN
                  ? '/ISSN-' + config.identifier.ISSN
                  : ''),
            }),
          },
        ],
        link: [{ url: config.url + '/articles/' + document.slug }],
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
            ...(item?.orcid && { orcid: item?.orcid }),
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

      let count = 0
      /*   */

      document.footnotes = []
      document.media = []
      document.years =
        (document.date && document.date.getFullYear()) ||
        new Date().now().getFullYear()
      const toc2 = []
      // add the youtube thumbnail to the media of the article
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
          // deal with footnotes
          if (
            child?.props?.className &&
            child?.props?.className.length &&
            child?.props?.className[0] === 'footnotes'
          ) {
            child.children
              .find((node) => node.tag === 'ol')
              .children.filter((child) => child.tag === 'li')
              .map((footnote, index) => {
                document.footnotes.push({
                  // TODO offset backlink on Y axis
                  backlink: footnote.children[1].props.href,
                  body: {
                    children: [
                      {
                        type: 'element',
                        tag: 'b',
                        props: {
                          id: index,
                          // TODO addd vuetify goTo instead of link
                        },
                        children: [{ type: 'text', value: index + 1 + ' : ' }],
                      },
                      ...(document.bibliography?.length
                        ? replaceReferenceInFootnote(
                            footnote,
                            document.bibliography
                          ).children
                        : footnote.children),
                    ],
                    type: 'root',
                  },
                })
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
    } catch (err) {
      console.error(err)
      console.log(document.article_title)
    }
    return document
  }
  return document
}
