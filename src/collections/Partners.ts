import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'שותף',
    plural: 'שותפים',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'featured', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'לוגו',
    },
    {
      name: 'externalLogoUrl',
      type: 'text',
      label: 'URL לוגו חיצוני',
      admin: {
        description: 'ישמש רק אם לא הועלה לוגו',
        condition: (data) => !data?.logo,
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'אתר',
    },
    {
      name: 'type',
      type: 'select',
      label: 'סוג',
      options: [
        { label: 'אקדמי', value: 'academic' },
        { label: 'תאגידי', value: 'corporate' },
        { label: 'מדיה', value: 'media' },
      ],
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'הצג בדף הבית',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'סדר הצגה',
      admin: { position: 'sidebar' },
    },
  ],
}
