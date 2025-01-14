import type { CollectionConfig } from 'payload'

import { customField } from '@innovixx/payload-field-boilerplate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    customField({
      label: 'Custom Field',
    }),
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
}
