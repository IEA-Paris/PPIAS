import referenceRegex from '../../../utils/referenceRegex'

const insertBibliographicalReferences = (node, biblio) => {
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
                  href: '#!bb-' + ref.id, // Add ! to avoid scrolling
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
        insertBibliographicalReferences(child, biblio)
      )
    }
    return node
  } catch (error) {
    console.log('error: ', error)
  }
}

export default insertBibliographicalReferences
