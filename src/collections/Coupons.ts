import type { CollectionConfig } from 'payload'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'discountType', 'discountValue', 'isActive', 'usedCount', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { isActive: { equals: true } }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'discountType',
      type: 'select',
      defaultValue: 'percentage',
      options: [
        { label: 'Percentage', value: 'percentage' },
        { label: 'Fixed Amount', value: 'fixed' },
      ],
    },
    {
      name: 'discountValue',
      type: 'number',
      min: 0,
    },
    {
      name: 'minPurchaseAmount',
      type: 'number',
      min: 0,
    },
    {
      name: 'maxDiscountAmount',
      type: 'number',
      min: 0,
    },
    {
      name: 'applicableCourses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
    },
    {
      name: 'usageLimit',
      type: 'number',
      min: 0,
    },
    {
      name: 'usedCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'validFrom',
      type: 'date',
    },
    {
      name: 'validUntil',
      type: 'date',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
