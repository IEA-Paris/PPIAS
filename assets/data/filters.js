export default {
  articles: {
    published: true,
  },
  authors: {
    articles: { $type: 'array' },
  },
  media: {},
}
