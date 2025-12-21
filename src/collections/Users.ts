import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'createdAt'],
  },
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600000,
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: 'Last Name',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Student', value: 'student' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      saveToJWT: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      admin: {
        condition: (data) => data.role === 'instructor',
        description: 'Biography for instructors',
      },
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'Preferences',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'he',
          options: [
            { label: 'Hebrew', value: 'he' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'system',
          options: [
            { label: 'System', value: 'system' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
          label: 'Email Notifications',
        },
      ],
    },
  ],
}
