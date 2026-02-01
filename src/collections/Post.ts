import type { CollectionConfig } from 'payload'

export const Post: CollectionConfig = {
  slug: 'post',
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      name: 'titleImage',
      label: 'Title Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publishedAt',
      label: 'Published At',
      type: 'date',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      options: [
        { label: 'Travel', value: 'travel' },
      ],
      hasMany: true,
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [
        {
          slug: 'paragraph',
          fields: [
            {
              name: 'text',
              type: 'richText',
              required: true,
              localized: true,
            },
          ],
        },
        {
          slug: 'image',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          slug: 'location',
          labels: {
            singular: 'Location',
            plural: 'Locations',
          },
          fields: [
            {
              name: 'label',
              label: 'Location Name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'latitude',
              label: 'Latitude',
              type: 'number',
              required: true,
              min: -90,
              max: 90,
            },
            {
              name: 'longitude',
              label: 'Longitude',
              type: 'number',
              required: true,
              min: -180,
              max: 180,
            },
            {
              name: 'zoom',
              label: 'Zoom Level',
              type: 'number',
              required: false,
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
        },
      ],
    },
  ],
}
