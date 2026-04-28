import type { Block } from 'payload';

export const SectionDivider: Block = {
  slug: 'divider',
  fields: [
    {
      type: 'select',
      name: 'style',
      label: 'Style',
      defaultValue: 'ornament',
      options: [
        { label: 'Ornament (◆)', value: 'ornament' },
        { label: 'Squiggly', value: 'squiggly' },
        { label: 'Line', value: 'line' },
        { label: 'Dots', value: 'dots' },
      ],
    },
  ],
};
