import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'titleImage',
      label: 'Title Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      options: [
        { label: 'Announcement', value: 'announcement' },
        { label: 'Update', value: 'update' },
        { label: 'Event', value: 'event' },
        { label: 'Other', value: 'other' },
      ],
      hasMany: true,
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [
        {
          slug: 'paragraph',
          fields: [
            {
              name: 'text',
              type: 'richText',
              required: true,
              localized: true,
            },
          ],
        },
        {
          slug: 'image',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
