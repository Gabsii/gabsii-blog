import type { Block } from 'payload';

export const AmbientColorWash: Block = {
  slug: 'color-wash',
  fields: [
    {
      type: 'text',
      name: 'color',
      label: 'Background Color',
      required: true,
      admin: {
        description: 'CSS color value (hex, rgb, named). E.g. #f5e6d3',
      },
    },
    {
      type: 'richText',
      name: 'text',
      label: 'Content (optional)',
      localized: true,
    },
    {
      type: 'select',
      name: 'align',
      label: 'Text Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
  ],
};
