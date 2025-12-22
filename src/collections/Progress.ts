import type { CollectionConfig } from 'payload'

export const Progress: CollectionConfig = {
  slug: 'progress',
  labels: {
    singular: 'התקדמות',
    plural: 'התקדמות',
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
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
      label: 'שיעור',
    },
    {
      name: 'watched',
      type: 'checkbox',
      label: 'נצפה',
      defaultValue: false,
    },
    {
      name: 'watchedAt',
      type: 'date',
      label: 'תאריך צפייה',
    },
    {
      name: 'watchTime',
      type: 'number',
      label: 'זמן צפייה (שניות)',
    },
    {
      name: 'completed',
      type: 'checkbox',
      label: 'הושלם',
      defaultValue: false,
    },
  ],
}
