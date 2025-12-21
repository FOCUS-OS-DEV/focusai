import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'sender', 'recipient', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // User can read messages they sent or received
      return { sender: { equals: user.id } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { sender: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'sender',
      type: 'relationship',
      relationTo: 'users',
      index: true,
    },
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'users',
      index: true,
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unread',
      options: [
        { label: 'Unread', value: 'unread' },
        { label: 'Read', value: 'read' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'parentMessage',
      type: 'relationship',
      relationTo: 'messages',
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
