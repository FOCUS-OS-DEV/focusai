import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'tiktok',
          type: 'text',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'titleSuffix',
          type: 'text',
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'defaultImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'scripts',
      type: 'group',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'text',
          admin: {
            description: 'Google Analytics ID (e.g., G-XXXXXXXXXX)',
          },
        },
        {
          name: 'facebookPixel',
          type: 'text',
          admin: {
            description: 'Facebook Pixel ID',
          },
        },
        {
          name: 'headScripts',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Scripts to add in <head>',
          },
        },
        {
          name: 'bodyScripts',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Scripts to add before </body>',
          },
        },
      ],
    },
  ],
}
