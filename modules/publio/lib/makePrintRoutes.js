import { formatAuthors } from '../utils/transforms'

export default (articles, options) => {
  console.log('make print routes for array of articles', articles.length)
  const pdfArticles = articles.filter(
    (article) => !article.custom_pdf && article.todo.generatePDF
  )
  const thumbnailArticles = articles.filter(
    (article) => !article.picture && !article.yt && article.todo.generateGraph
  )
  return {
    pdfs: pdfArticles.map((article) => {
      // if the file has been changed
      return {
        // Route to content that should be converted into pdf.
        route: '/print/' + article.slug,
        file: article.slug + '.pdf',
        // Default option is to remove the route after generation so it is not accessible
        keep: false, // defaults to false
        // Specifify language for pdf. (Only when i18n is enabled!)
        // TODO : make it work with any language
        locale: article.language === 'English' ? 'en' : 'fr',
        // Override global meta with individual meta for each pdf.
        meta: {
          title: article.article_title,

          author: formatAuthors(article.authors).replace('&nbsp;', ' '),
          producer: options.config.name + ' - ' + options.config.full_name,

          // Control the date the file is created.
          creationDate: article.createdAt,

          keywords: article.tags || [],
          language: article.language || 'en',
        },
      }
    }),
    thumbnails: thumbnailArticles.map((article) => {
      // if the file has been changed
      return {
        // Route to content that should be converted into pdf.
        route: '/print/' + article.slug + '/graph',
        file: article.slug + '.png',
        // Default option is to remove the route after generation so it is not accessible
        keep: false, // defaults to false
        // TODO : make it work with any language
        locale: article.language === 'English' ? 'en' : 'fr',
        // Override global meta with individual meta for each pdf.
        meta: {
          title: article.article_title,

          author: formatAuthors(article.authors).replace('&nbsp;', ' '),
          // TODO complete and change produced depending on the journal
          producer: options.config.name + ' - ' + options.config.full_name,

          // Control the date the file is created.
          creationDate: article.createdAt,

          keywords: article.tags || [],
          language: article.language || 'en',
        },
      }
    }),
  }
}
