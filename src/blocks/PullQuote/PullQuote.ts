import type { Block } from 'payload';

export const PullQuote: Block = {
  slug: 'pull-quote',
  fields: [
    {
      type: 'text',
      name: 'quote',
      label: 'Quote',
      required: true,
      localized: true,
    },
    {
      type: 'text',
      name: 'author',
      label: 'Author (optional)',
      localized: true,
    },
    {
      type: 'text',
      name: 'source',
      label: 'Source (optional)',
      localized: true,
    },
  ],
};
