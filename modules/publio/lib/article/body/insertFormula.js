export default (node, article, media, authors, issues, options) => {
  // image
  if (node.tag === 'img') {
    document.images.push({
      url: node.props.src,
      title: node.props.title,
    })
  }
  return [node, article, media, authors, issues, options]
}
