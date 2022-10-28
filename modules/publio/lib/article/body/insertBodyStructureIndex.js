import { insertReferences } from '../../utils/contentUtilities'

export default (node, article, media, authors, issues, options) => {
  const flag = ['h2', 'h3', 'youtube', 'img'].indexOf(node.tag)
  return [
    ...(node.value !== '\n'
      ? [
          {
            type: 'element',
            tag: 'div',
            isHeading: ['h2', 'h3'].includes(node.tag),
            isMedia: ['youtube'].includes(node.tag),
            isImage: ['img'].includes(node.tag),
            props: { class: 'node d-flex' },
            children: [
              {
                type: 'element',
                tag: 'a',
                props: {
                  class:
                    'text-right index mr-3 ' +
                      [' mt-10', ' mt-6', 'mt-3', 'mt-3', 'mt-5'][
                        ['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(node.tag)
                      ] || '',
                  id: article.count,
                  href: '#' + article.count,
                  // TODO addd vuetify goTo instead of link
                },
                children: [{ type: 'text', value: article.count }],
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
                          (article.media.length -
                            (article.yt && article.yt !== node.props.yt
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
                    ['h2', 'h3', 'p', 'ul', 'youtube', 'img'].indexOf(node.tag)
                  ],
                },
                // insert Bibliographical references
                children: [
                  article.bibliography?.length
                    ? insertReferences(node, article.bibliography)
                    : node,
                ],
              },
            ],
          },
        ]
      : node),
    article,
    media,
    authors,
    issues,
    options,
  ]
}
