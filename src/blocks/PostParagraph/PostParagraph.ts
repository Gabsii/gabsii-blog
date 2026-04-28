import type { Block } from 'payload';

export const PostParagraph: Block = {
  slug: 'paragraph',
  fields: [
    {
      type: 'richText',
      name: 'text',
      label: 'Text',
      required: true,
      localized: true,
    },
  ],
};
