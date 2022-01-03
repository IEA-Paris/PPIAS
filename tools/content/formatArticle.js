export default (document, database) => {
  if (document.category === 'Article') {
    let count = 0
    document.footnotes = []
    document.body.children = document.body.children.map((child, index) => {
      /*       console.log('child: ', child) */
      if (child.value !== '\n') {
        count++
        if (child?.props?.className && child?.props?.className.length && child?.props?.className[0] === 'footnotes') {
          child.children
            .find((node) => node.tag === 'ol')
            .children.map((footnote) => {
              console.log('footnote: ', footnote)
              if (footnote.tag === 'li') {
                document.footnotes.push(footnote.children[0].value)
              }
              return true
            })
          console.log('child: ', child)
          return {
            type: 'element',
            tag: 'div',
            props: { class: 'node d-flex' },
            children: [child],
          }
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
            {
              type: 'element',
              tag: 'div',
              props: {
                class: [' ', ' ', '', '', 'youtube'][['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(child.tag)],
              },
              children: [child],
            },
          ],
        }
      } else {
        return child
      }
    })
    return document
  }
  return document
}
