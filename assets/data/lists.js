export default {
  mailing: {
    search: {
      type: 'Search',
    },
    test: {
      type: 'Select',
      items: ['date'],
    },
    state: {
      type: 'Select',
      items: ['draft', 'sent'],
    },
  },
  events: {
    search: {
      type: 'Search',
    },
    sortBy: {
      type: 'Select',
      items: ['date'],
    },
    status: {
      type: 'Select',
      items: ['draft', 'published'],
    },
  },
}
