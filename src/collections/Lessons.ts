import type { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'chapter', 'order', 'isFree'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { isFree: { equals: true } }
    },
    create: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'instructor',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'instructor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'Course',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'chapter',
      type: 'text',
      label: 'Chapter',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      label: 'Order',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'videoType',
      type: 'select',
      defaultValue: 'url',
      options: [
        { label: 'URL', value: 'url' },
        { label: 'Upload', value: 'upload' },
      ],
      label: 'Video Type',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        condition: (data) => data.videoType === 'url',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Video File',
      admin: {
        condition: (data) => data.videoType === 'upload',
      },
    },
    {
      name: 'duration',
      type: 'number',
      min: 0,
      label: 'Duration (minutes)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isFree',
      type: 'checkbox',
      defaultValue: false,
      label: 'Free Preview',
      admin: {
        position: 'sidebar',
        description: 'Allow this lesson to be viewed without enrollment',
      },
    },
    {
      name: 'materials',
      type: 'array',
      label: 'Materials',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'File',
        },
      ],
    },
    {
      name: 'resources',
      type: 'array',
      label: 'Resources',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
  ],
}
