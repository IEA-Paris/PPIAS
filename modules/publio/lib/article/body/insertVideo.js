export default (node, article, media, authors, issues, options) => {
  if (
    node.tag === 'youtube' &&
    !article.media.find((item) => item.id === node.props.yt)
  ) {
    article.media.push({
      type: 'youtube',
      index:
        media.length - (document.yt && document.yt !== node.props.yt ? 0 : 1),
      caption: node.props.caption,
    })
  }
  return [node, article, media, authors, issues, options]
}
