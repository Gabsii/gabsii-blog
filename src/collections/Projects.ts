import type { CollectionConfig } from 'payload'

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
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
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
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Frontend Development', value: 'frontend' },
        { label: 'Backend Development', value: 'backend' },
        { label: 'Full-Stack Development', value: 'fullstack' },
        { label: 'SEO Optimization', value: 'seo' },
      ],
    },
    // {
    //   name: 'content',
    //   label: 'Content',
    //   type: 'blocks',
    //   required: true,
    //   blocks: [],
    // },
  ],
}
