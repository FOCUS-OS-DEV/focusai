import type { CollectionConfig } from 'payload'

export const Attendance: CollectionConfig = {
  slug: 'attendance',
  labels: {
    singular: 'נוכחות',
    plural: 'נוכחות',
  },
  admin: {
    defaultColumns: ['student', 'lesson', 'present', 'date'],
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
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      required: true,
      label: 'מחזור',
    },
    {
      name: 'date',
      type: 'date',
      label: 'תאריך',
      required: true,
    },
    {
      name: 'present',
      type: 'checkbox',
      label: 'נוכח',
      defaultValue: false,
    },
    {
      name: 'joinedAt',
      type: 'date',
      label: 'שעת הצטרפות',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'leftAt',
      type: 'date',
      label: 'שעת עזיבה',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'notes',
      type: 'text',
      label: 'הערות',
    },
  ],
}
