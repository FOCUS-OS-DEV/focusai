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
    {
      name: 'category',
      type: 'select',
      label: 'קטגוריה',
      options: [
        { label: 'מרצים', value: 'instructor' },
        { label: 'המלצות', value: 'testimonial' },
        { label: 'גלריה', value: 'gallery' },
        { label: 'שותפים', value: 'partner' },
        { label: 'לוגו', value: 'logo' },
        { label: 'Hero', value: 'hero' },
        { label: 'אחר', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'URL חיצוני',
      admin: {
        description: 'לתמונות שמאוחסנות ב-Cloudinary או שרת חיצוני',
        condition: (data) => !data?.filename,
      },
    },
  ],
}
