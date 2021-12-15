export default (document, database) => {
  if (document.category === 'Article') {
    let count = 0

    document.body.children = document.body.children.map((child, index) => {
      /*       console.log('child: ', child) */
      if (child.value !== '\n') {
        count++
        return {
          type: 'element',
          tag: 'div',
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
              processed: true,
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
