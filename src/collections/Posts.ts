import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'מאמר',
    plural: 'מאמרים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'כותרת',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'תקציר',
      maxLength: 200,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'תוכן',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה ראשית',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'קטגוריה',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'כותב',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'תגיות',
      fields: [{ name: 'tag', type: 'text', label: 'תגית' }],
    },
    // CTA בתוך המאמר
    {
      name: 'cta',
      type: 'group',
      label: 'קריאה לפעולה',
      fields: [
        { name: 'enabled', type: 'checkbox', label: 'הצג CTA' },
        { name: 'text', type: 'text', label: 'טקסט' },
        { name: 'url', type: 'text', label: 'קישור' },
        {
          name: 'style',
          type: 'select',
          label: 'סגנון',
          options: [
            { label: 'ראשי', value: 'primary' },
            { label: 'משני', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'relatedCourse',
      type: 'relationship',
      relationTo: 'courses',
      label: 'קורס קשור',
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'זמן קריאה (דקות)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      options: [
        { label: 'טיוטה', value: 'draft' },
        { label: 'פורסם', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'תאריך פרסום',
      admin: { position: 'sidebar' },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'כותרת מטא' },
        { name: 'metaDescription', type: 'textarea', label: 'תיאור מטא' },
      ],
    },
  ],
}
