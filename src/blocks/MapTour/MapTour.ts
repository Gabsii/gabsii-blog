import type { Block } from 'payload';

export const MapTour: Block = {
  slug: 'map-tour',
  fields: [
    {
      type: 'array',
      name: 'stops',
      label: 'Map Stops',
      minRows: 1,
      fields: [
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
          label: 'Description',
          localized: true,
        },
        {
          type: 'number',
          name: 'latitude',
          label: 'Latitude',
          required: true,
        },
        {
          type: 'number',
          name: 'longitude',
          label: 'Longitude',
          required: true,
        },
        {
          type: 'upload',
          name: 'image',
          label: 'Image (optional)',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'number',
      name: 'zoom',
      label: 'Default Zoom Level',
      defaultValue: 7,
      min: 1,
      max: 20,
    },
  ],
};
