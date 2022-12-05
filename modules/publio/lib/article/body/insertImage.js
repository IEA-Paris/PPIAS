export default (node, article, media, authors, issues, options) => {
  // image
  if (node.tag === 'img') {
    article.images.push({
      url: node.props.src,
      title: node.props.title,
    })
  }
  return [node, article, media, authors, issues, options]
}
