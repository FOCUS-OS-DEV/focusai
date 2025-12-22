import type { CollectionConfig } from 'payload'

export const Instructors: CollectionConfig = {
  slug: 'instructors',
  labels: {
    singular: 'מרצה',
    plural: 'מרצים',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'featured', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'תואר/תפקיד',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'ביוגרפיה',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'ביו קצר',
      maxLength: 200,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה',
    },
    {
      name: 'email',
      type: 'email',
      label: 'אימייל',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'לינקדאין',
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'תחומי התמחות',
      fields: [{ name: 'specialty', type: 'text', label: 'תחום' }],
    },
    {
      name: 'order',
      type: 'number',
      label: 'סדר הצגה',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'הצג בדף הבית',
      admin: { position: 'sidebar' },
    },
  ],
}
