import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'משתמש',
    plural: 'משתמשים',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם מלא',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'טלפון',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה',
    },
    {
      name: 'role',
      type: 'select',
      label: 'תפקיד',
      defaultValue: 'student',
      options: [
        { label: 'מנהל', value: 'admin' },
        { label: 'מרצה', value: 'instructor' },
        { label: 'תלמיד', value: 'student' },
      ],
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}
