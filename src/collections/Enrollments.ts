import type { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: 'הרשמה',
    plural: 'הרשמות',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['student', 'cohort', 'status', 'enrolledAt'],
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
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      required: true,
      label: 'מחזור',
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'ממתין', value: 'pending' },
        { label: 'פעיל', value: 'active' },
        { label: 'הושלם', value: 'completed' },
        { label: 'בוטל', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'enrolledAt',
      type: 'date',
      label: 'תאריך הרשמה',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'תאריך סיום',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      label: 'סטטוס תשלום',
      options: [
        { label: 'ממתין', value: 'pending' },
        { label: 'שולם', value: 'paid' },
        { label: 'זוכה', value: 'refunded' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'הערות',
    },
  ],
}
