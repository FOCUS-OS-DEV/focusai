import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'המלצה',
    plural: 'המלצות',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'course', 'featured', 'status'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'תפקיד/חברה',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה',
    },
    {
      name: 'externalImageUrl',
      type: 'text',
      label: 'URL תמונה חיצונית',
      admin: {
        description: 'ישמש רק אם לא הועלתה תמונה',
        condition: (data) => !data?.image,
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'תוכן ההמלצה',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'דירוג',
      min: 1,
      max: 5,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      label: 'מסלול',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'קישור לוידאו (אופציונלי)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'הצג בדף הבית',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'ממתין לאישור', value: 'pending' },
        { label: 'מאושר', value: 'approved' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
  ],
}
