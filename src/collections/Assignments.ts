import type { CollectionConfig } from 'payload'

export const Assignments: CollectionConfig = {
  slug: 'assignments',
  labels: {
    singular: 'עבודה',
    plural: 'עבודות',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'cohort', 'type', 'dueDate'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'כותרת',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'תיאור והנחיות',
    },
    {
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      required: true,
      label: 'מחזור',
    },
    {
      name: 'type',
      type: 'select',
      label: 'סוג',
      options: [
        { label: 'תרגיל', value: 'homework' },
        { label: 'מבחן', value: 'exam' },
        { label: 'פרויקט', value: 'project' },
      ],
      defaultValue: 'homework',
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'תאריך הגשה',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'קבצים מצורפים',
      fields: [{ name: 'file', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'maxScore',
      type: 'number',
      label: 'ציון מקסימלי',
      defaultValue: 100,
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
