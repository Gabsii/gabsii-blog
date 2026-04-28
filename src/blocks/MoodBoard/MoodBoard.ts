import type { Block } from 'payload';

export const MoodBoard: Block = {
  slug: 'mood-board',
  fields: [
    {
      type: 'array',
      name: 'images',
      label: 'Images',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          required: true,
          relationTo: 'media',
        },
        {
          type: 'text',
          name: 'caption',
          label: 'Caption (optional)',
          localized: true,
        },
      ],
    },
  ],
};
