export default (article, options) => {
  // we use the issue filter (already sorted by date) to set an index for the fetch of the view by issue
  // TODO find out why issueIndex is not attributed sometimes
  article.issueIndex = article.issue?.length
    ? options.issue.items.reverse().indexOf(article.issue.slice(15, -3))
    : -1
  return article
}
