export default (articles, media, authors, issues, options, transformers) => {
  articles.forEach((article) => {
    // process node by node to enrich the content
    transformers.forEach(
      (transform) =>
        ([article, media, authors, issues, options] = transform(
          article,
          media,
          authors,
          issues,
          options
        ))
    )
  })

  return [articles, media, authors, issues, options]
}
