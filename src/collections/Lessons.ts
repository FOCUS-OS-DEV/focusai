import type { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  labels: {
    singular: 'שיעור',
    plural: 'שיעורים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'cohort', 'order', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'כותרת השיעור',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
    },
    {
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      required: true,
      label: 'מחזור',
    },
    {
      name: 'order',
      type: 'number',
      label: 'מספר שיעור',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'תיאור',
    },
    {
      name: 'date',
      type: 'date',
      label: 'תאריך השיעור',
    },
    // וידאו
    {
      name: 'video',
      type: 'group',
      label: 'וידאו',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'סוג',
          options: [
            { label: 'קישור (Zoom/YouTube)', value: 'url' },
            { label: 'העלאה', value: 'upload' },
          ],
          defaultValue: 'url',
        },
        { name: 'url', type: 'text', label: 'קישור לוידאו' },
        { name: 'file', type: 'upload', relationTo: 'media', label: 'קובץ וידאו' },
        { name: 'duration', type: 'number', label: 'משך (דקות)' },
      ],
    },
    // חומרים
    {
      name: 'materials',
      type: 'array',
      label: 'חומרים להורדה',
      fields: [
        { name: 'title', type: 'text', label: 'שם הקובץ', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', label: 'קובץ', required: true },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'טיוטה', value: 'draft' },
        { label: 'פורסם', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
  ],
}
