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
  access: {
    // כולם יכולים ליצור חשבון (הרשמה)
    create: () => true,
    // קריאה: עצמי או אדמין
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // עדכון: עצמי או אדמין
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // מחיקה: אדמין בלבד
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
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
    // קורסים שהמשתמש רשום אליהם
    {
      name: 'enrolledCourses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'קורסים רשומים',
      admin: {
        description: 'הקורסים שהמשתמש רשום אליהם',
      },
    },
  ],
}
