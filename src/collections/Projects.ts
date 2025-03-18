import type { CollectionConfig, OptionObject } from 'payload'

import { HardFacts } from '../blocks/HardFacts/HardFacts'

export const ServicesOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Frontend Development', value: 'frontend' },
  { label: 'Backend Development', value: 'backend' },
  { label: 'Full-Stack Development', value: 'fullstack' },
  { label: 'SEO Optimization', value: 'seo' },
] as const;

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    // ! wait for v3 support of https://github.com/NouanceLabs/payload-better-fields-plugin for auto-slug
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      label: 'Link',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dateFrom',
          label: 'Date From',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
        {
          name: 'dateTo',
          label: 'Date To',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'services',
      label: 'Services',
      required: true,
      type: 'select',
      hasMany: true,
      admin: {
        isClearable: true,
      },
      // type juggling
      options: ServicesOptions as unknown as OptionObject[],
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      required: true,
      blocks: [
        HardFacts,
      ],
      admin: {
        components: {
          Field: '@/fields/Projects/ContentEditField.tsx',
        }
      }
    },
  ],
}
