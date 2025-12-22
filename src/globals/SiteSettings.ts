import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'הגדרות אתר',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'שם האתר',
      defaultValue: 'Focus AI Academy',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'תיאור האתר',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'לוגו',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    // פרטי קשר
    {
      name: 'contact',
      type: 'group',
      label: 'פרטי קשר',
      fields: [
        { name: 'email', type: 'email', label: 'אימייל' },
        { name: 'phone', type: 'text', label: 'טלפון' },
        { name: 'whatsapp', type: 'text', label: 'וואטסאפ' },
        { name: 'address', type: 'textarea', label: 'כתובת' },
      ],
    },
    // רשתות חברתיות
    {
      name: 'social',
      type: 'group',
      label: 'רשתות חברתיות',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn' },
        { name: 'youtube', type: 'text', label: 'YouTube' },
        { name: 'tiktok', type: 'text', label: 'TikTok' },
      ],
    },
    // Tracking
    {
      name: 'tracking',
      type: 'group',
      label: 'קודי מעקב',
      fields: [
        { name: 'metaPixel', type: 'text', label: 'Meta Pixel ID' },
        { name: 'tiktokPixel', type: 'text', label: 'TikTok Pixel ID' },
        { name: 'googleAnalytics', type: 'text', label: 'Google Analytics ID' },
      ],
    },
  ],
}
