export default (
  article,
  media,
  authors,
  issues,
  options,
  metadata,
  transformers
) => {
  // We'll buid the data along the way
  article.media = []
  article.images = []
  article.footnotes = []
  article.Toc2 = []
  article.countMap = []
  article.countRefs = []
  article.maths = []
  article.count = 0
  // process the article frontmatter
  metadata.forEach(
    (fn) =>
      ([article, media, authors, issues, options] = fn(
        article,
        media,
        authors,
        issues,
        options
      ))
  )
  // add the youtube thumbnail to the media of the article
  if (article.yt) {
    article.media.push({
      index: 0,
      type: 'youtube',
      id: article.yt,
      caption: article.article_title,
    })
  }
  article.years =
    (article.date && new Date(article.date)?.getFullYear()) ||
    new Date().getFullYear()

  // process node by node to enrich the content
  article.body.children = article.body.children.filter((child, index) => {
    if (child.value !== '\n') {
      transformers.forEach(
        (transform) =>
          ([child, article, media, authors, issues, options] = transform(
            child,
            article,
            media,
            authors,
            issues,
            options
          ))
      )
      // increment paragraph count
      article.count++
      return child
    } else {
      return false
    }
  })

  // replace legacy toc
  article.toc = [
    ...article.Toc2,

    ...(article?.bibliography?.length
      ? [
          {
            depth: 2,
            id: 'bibliography',
            text: 'bibliography', // TODO replace with translation (call i18n)
            isMedia: false,
          },
        ]
      : []),

    ...(article?.footnotes?.length
      ? [
          {
            depth: 2,
            id: 'footnotes',
            text: 'footnotes', // TODO replace with translation (call i18n)
            isMedia: false,
          },
        ]
      : []),
  ]

  delete article.Toc2
  delete article.count

  return [article, media, authors, issues, options]
}
