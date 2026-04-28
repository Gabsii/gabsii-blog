import type { Block } from 'payload';

export const PostMap: Block = {
  slug: 'location',
  fields: [
    {
      type: 'text',
      name: 'label',
      label: 'Label',
      required: true,
      localized: true,
    },
    {
      type: 'number',
      name: 'latitude',
      label: 'Latitude',
      required: true,
      min: -90,
      max: 90,
    },
    {
      type: 'number',
      name: 'longitude',
      label: 'Longitude',
      required: true,
      min: -180,
      max: 180,
    },
    {
      type: 'number',
      name: 'zoom',
      label: 'Zoom Level',
      defaultValue: 12,
      min: 1,
      max: 20,
    },
    {
      name: 'mapPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/components/MapPreview',
        },
      },
    },
  ],
};
