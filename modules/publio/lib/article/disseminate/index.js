export default async (articles, options, zenodoQueue, transformers) => {
  console.log('disseminate', articles?.length)
  // now that we have the related PDF, DOI and Zenodo record,we can update the article file
  for (const transformer of transformers) {
    console.log('disseminate', articles?.length)
    articles = await transformer(articles, options, zenodoQueue)
  }
  console.log('RETURNING ARTICLES', articles?.length)
  // Now that we're done with tedious stuff, let's disseminate AF
  // Other plugins
  return articles
}
