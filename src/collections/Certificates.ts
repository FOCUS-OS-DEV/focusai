import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'תעודה',
    plural: 'תעודות',
  },
  admin: {
    defaultColumns: ['student', 'course', 'issuedAt', 'status'],
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
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'מסלול',
    },
    {
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      label: 'מחזור',
    },
    {
      name: 'certificateNumber',
      type: 'text',
      label: 'מספר תעודה',
      unique: true,
    },
    {
      name: 'issuedAt',
      type: 'date',
      label: 'תאריך הנפקה',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'קובץ PDF',
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'ממתין', value: 'pending' },
        { label: 'הונפק', value: 'issued' },
        { label: 'בוטל', value: 'revoked' },
      ],
      defaultValue: 'pending',
    },
  ],
}
