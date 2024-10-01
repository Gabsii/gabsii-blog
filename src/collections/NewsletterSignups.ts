import type { CollectionConfig } from 'payload'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
  ],
}
