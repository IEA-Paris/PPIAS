import { replaceReferenceInFootnote } from '../../../utils/contentUtilities'

export default (node, article, media, authors, issues, options) => {
  // deal with footnotes
  if (
    node?.props?.className &&
    node?.props?.className.length &&
    node?.props?.className[0] === 'footnotes'
  ) {
    node.children
      .find((node) => node.tag === 'ol')
      .children.filter((child) => child.tag === 'li')
      .forEach((footnote, index) => {
        article.footnotes.push({
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
              ...(article.bibliography?.length
                ? replaceReferenceInFootnote(footnote, article.bibliography)
                    .children
                : footnote.children),
            ],
            type: 'root',
          },
        })
      })
  }

  return [node, article, media, authors, issues, options]
}
