import type { CollectionConfig } from 'payload'

export const Cohorts: CollectionConfig = {
  slug: 'cohorts',
  labels: {
    singular: 'מחזור',
    plural: 'מחזורים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'startDate', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'שם המחזור',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'מסלול',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'תאריך התחלה',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'תאריך סיום',
    },
    {
      name: 'schedule',
      type: 'text',
      label: 'לוח זמנים',
    },
    {
      name: 'location',
      type: 'text',
      label: 'מיקום',
    },
    {
      name: 'zoomLink',
      type: 'text',
      label: 'קישור זום',
    },
    {
      name: 'whatsappGroup',
      type: 'text',
      label: 'קבוצת וואטסאפ',
    },
    {
      name: 'maxStudents',
      type: 'number',
      label: 'מקסימום תלמידים',
      defaultValue: 18,
    },
    {
      name: 'instructors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: 'מרצים',
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'קרוב', value: 'upcoming' },
        { label: 'פעיל', value: 'active' },
        { label: 'הסתיים', value: 'completed' },
      ],
      defaultValue: 'upcoming',
      admin: { position: 'sidebar' },
    },
    {
      name: 'registrationOpen',
      type: 'checkbox',
      label: 'הרשמה פתוחה',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
