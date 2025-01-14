import type { CollectionConfig } from 'payload'

import { modalFields } from '@innovixx/payload-drawer-fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    modalFields({
      name: 'customPageSettings',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'padding',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTop',
                  type: 'number',
                  defaultValue: 0,
                },
                {
                  name: 'paddingLeft',
                  type: 'number',
                  defaultValue: 20,
                },
                {
                  name: 'paddingBottom',
                  type: 'number',
                  defaultValue: 0,
                },
                {
                  name: 'paddingRight',
                  type: 'number',
                  defaultValue: 20,
                },
              ]
            },
          ]
        },
        {
          name: 'fontSizes',
          type: 'group',
          fields: [
            {
              name: 'h1',
              type: 'number',
              defaultValue: 32,
            },
            {
              name: 'h2',
              type: 'number',
              defaultValue: 24,
            },
            {
              name: 'h3',
              type: 'number',
              defaultValue: 20,
            },
            {
              name: 'h4',
              type: 'number',
              defaultValue: 18,
            },
            {
              name: 'h5',
              type: 'number',
              defaultValue: 16,
            },
            {
              name: 'p',
              type: 'number',
              defaultValue: 16,
            },
          ]
        }
      ],
      label: 'Custom Page Settings',
      toggleButtonType: 'button',
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
    modalFields({
      name: 'dateSettings',
      fields: [
        {
          name: 'renderDateSchema',
          type: 'text',
        }
      ],
      label: 'Date Settings',
      toggleButtonType: 'settingIcon'
    }),
    {
      name: 'date',
      type: 'date',
    },
  ],
}
