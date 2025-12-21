import type { CollectionConfig } from 'payload'

export const Recordings: CollectionConfig = {
  slug: 'recordings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'lesson', 'duration', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'instructor') return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'instructor',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'instructor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      index: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      index: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'External video URL (YouTube, Vimeo, etc.)',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duration in seconds',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Processing', value: 'processing' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'recordedAt',
      type: 'date',
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'transcription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'chapters',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'timestampSeconds',
          type: 'number',
        },
      ],
    },
  ],
}
