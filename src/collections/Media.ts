import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'מדיה',
    plural: 'מדיה',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1200, height: 600, position: 'centre' },
    ],
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'טקסט חלופי',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'כיתוב',
    },
  ],
}
