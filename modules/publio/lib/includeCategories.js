export default (document, database) => {
  if (document.dir.startsWith('/articles') && document.published) {
    return document
  }
  return document
}
