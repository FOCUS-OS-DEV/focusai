import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: {
    singular: 'הגשה',
    plural: 'הגשות',
  },
  admin: {
    defaultColumns: ['student', 'assignment', 'submittedAt', 'status'],
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'תלמיד',
    },
    {
      name: 'assignment',
      type: 'relationship',
      relationTo: 'assignments',
      required: true,
      label: 'עבודה',
    },
    {
      name: 'files',
      type: 'array',
      label: 'קבצים',
      fields: [{ name: 'file', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'הערות התלמיד',
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'תאריך הגשה',
    },
    {
      name: 'score',
      type: 'number',
      label: 'ציון',
    },
    {
      name: 'feedback',
      type: 'richText',
      label: 'משוב',
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'ממתין לבדיקה', value: 'pending' },
        { label: 'נבדק', value: 'graded' },
        { label: 'הוחזר לתיקון', value: 'returned' },
      ],
      defaultValue: 'pending',
    },
  ],
}
