import type { Block } from 'payload';

export const HardFacts: Block = {
  slug: 'hard-facts',
  imageURL: '/payload/blocks/hard-facts.png',
  imageAltText: 'Hard Facts Block',
  fields: [
    {
      type: 'text',
      name: 'title',
      localized: true,
    },
    {
      type: 'array',
      name: 'facts',
      minRows: 4,
      maxRows: 8,
      fields: [
        {
          type: 'text',
          name: 'label',
          localized: true,
        },
        {
          type: 'text',
          name: 'value',
          maxLength: 70,
          localized: true,
        },
        {
          type: 'checkbox',
          name: 'long',
          label: 'Is 2 columns wide',
          defaultValue: false,
        }
      ]
    }
  ]
};
