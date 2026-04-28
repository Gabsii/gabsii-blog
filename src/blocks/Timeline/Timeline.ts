import type { Block } from 'payload';

export const Timeline: Block = {
  slug: 'timeline',
  fields: [
    {
      type: 'array',
      name: 'items',
      label: 'Timeline Items',
      minRows: 1,
      fields: [
        {
          type: 'text',
          name: 'date',
          label: 'Date',
          required: true,
          localized: true,
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
          localized: true,
        },
        {
          type: 'text',
          name: 'description',
          label: 'Description (optional)',
          localized: true,
        },
        {
          type: 'upload',
          name: 'image',
          label: 'Image (optional)',
          relationTo: 'media',
        },
      ],
    },
  ],
};
