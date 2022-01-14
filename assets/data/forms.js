export default {
  articles: {
    filter: {
      search: {
        type: 'TextInput',
        rules: {},
        label: 'Search',
      },
      categories: {
        type: 'TextInput',
        rules: {},
        label: 'Search',
      },
      author: {
        type: 'Autocomplete',
        rules: {},
        label: 'tags',
        hint: 'x-tags-max',
      },
    },
    sort: {},
  },
  events: {
    details: {
      general: {
        name: {
          type: 'TextInput',
          rules: {
            required: true,
            min: 500,
            max: 1000,
          },
          label: 'name',
        },
        description: {
          type: 'TextInput',
          rules: {
            required: false,
            min: 0,
            max: 1000,
          },
          label: 'description',
          hint: 'events.tell-us-all-about-your-event',
        },
        tags: {
          type: 'Autocomplete',
          rules: {
            required: false,
          },
          label: 'tags',
          hint: 'x-tags-max',
        },
        date: {
          type: 'DatePicker',
          rules: {
            required: true,
          },
          label: 'date',
        },
        time: {
          type: 'TimePicker',
          rules: {
            required: true,
          },
          label: 'time',
        },
        timezone: {
          type: 'Autocomplete',
          rules: {
            required: true,
          },
          label: 'timezone',
        },
        showTimezone: {
          type: 'Checkbox',
          rules: {},
          label: 'show-timezone',
        },
        type: {
          type: 'Select',
          rules: {
            required: true,
          },
          label: 'location',
        },
        location: {
          type: 'PlacePicker',
          rules: {
            required: true,
          },
          label: 'timezone',
        },
        link: {
          type: 'TextInput',
          rules: {
            required: true,
            url: true,
          },
          label: 'Link',
        },
      },
    },
    registration: {
      inputs: {
        type: 'InputPicker',
        rules: {
          required: true,
        },
        label: 'requested-information',
      },
    },
  },
}
