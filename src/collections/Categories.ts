import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'קטגוריה',
    plural: 'קטגוריות',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם',
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
      name: 'description',
      type: 'textarea',
      label: 'תיאור',
    },
    {
      name: 'color',
      type: 'text',
      label: 'צבע',
      admin: { description: 'קוד צבע HEX' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'סדר הצגה',
    },
  ],
}
