export default (document, database) => {
  // TODO : apex microservice taxonomy retrieval & update
  if (document.dir.startsWith('/articles') && document.published) {
    return document
  }
  return document
}
