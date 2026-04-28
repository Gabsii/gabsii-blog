import type { Block } from 'payload';

export const PostImage: Block = {
  slug: 'image',
  fields: [
    {
      type: 'upload',
      name: 'image',
      label: 'Image',
      required: true,
      relationTo: 'media',
    },
  ],
};
