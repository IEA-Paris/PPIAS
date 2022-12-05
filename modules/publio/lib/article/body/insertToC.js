// make the upgraded toc
export default (node, article, media, authors, issues, options) => {
  const flag = ['h2', 'h3', 'youtube', 'img'].indexOf(node.tag)
  // if it is an header 2 or 3
  if (flag >= 0 && flag < 3) {
    article.Toc2.push({
      depth: flag + 2,
      id: node.props.id || 'youtube_' + article.media.length,
      text:
        article.toc.find((item) => item.id === node.props.id)?.text ||
        node.props.caption,
      isMedia: flag === 2,
    })
  }
  return [node, article, media, authors, issues, options]
}
