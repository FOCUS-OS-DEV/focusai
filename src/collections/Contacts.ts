import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'ליד',
    plural: 'לידים',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'interest', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'אימייל',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'טלפון',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'חברה',
    },
    {
      name: 'interest',
      type: 'select',
      label: 'מתעניין ב-',
      options: [
        { label: 'Bot-Camp', value: 'bot-camp' },
        { label: 'AI Ready', value: 'ai-ready' },
        { label: 'סדנה לארגון', value: 'workshop' },
        { label: 'ליווי אישי', value: 'coaching' },
        { label: 'קורס דיגיטלי', value: 'digital' },
        { label: 'כללי', value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'הודעה',
    },
    {
      name: 'source',
      type: 'text',
      label: 'מקור',
      admin: { description: 'מאיזה עמוד הגיע - נקבע אוטומטית' },
    },
  ],
}
