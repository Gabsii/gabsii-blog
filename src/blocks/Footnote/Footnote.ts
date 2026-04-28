import type { Block } from 'payload';

export const Footnote: Block = {
  slug: 'footnote',
  fields: [
    {
      type: 'text',
      name: 'label',
      label: 'Label',
      required: true,
      localized: true,
      admin: {
        description: 'The visible trigger text shown in the collapsed state.',
      },
    },
    {
      type: 'text',
      name: 'content',
      label: 'Content',
      required: true,
      localized: true,
      admin: {
        description: 'The aside text revealed when expanded.',
      },
    },
  ],
};
