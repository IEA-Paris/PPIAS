import { formatAuthors } from '../utils/transforms'

export default (articles) => {
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
        /*   locale: 'da', */
        // Override global meta with individual meta for each pdf.
        meta: {
          title: article.article_title,

          author: formatAuthors(article.authors).replace('&nbsp;', ' '),
          // TODO complete and change produced depending on the journal
          producer:
            'PPIAS - Proceeding of Paris Institution for Advanced Study',

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
        // Specifify language for pdf. (Only when i18n is enabled!)
        /*   locale: 'da', */
        // Override global meta with individual meta for each pdf.
        meta: {
          title: article.article_title,

          author: formatAuthors(article.authors).replace('&nbsp;', ' '),
          // TODO complete and change produced depending on the journal
          producer:
            'PPIAS - Proceeding of Paris Institution for Advanced Study',

          // Control the date the file is created.
          creationDate: article.createdAt,

          keywords: article.tags || [],
          language: article.language || 'en',
        },
      }
    }),
  }
}
