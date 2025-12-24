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
        { name: 'fixdigitalClientKey', type: 'text', label: 'Fixdigital Client Key' },
      ],
    },
    // Scripts Management
    {
      name: 'scripts',
      type: 'group',
      label: 'ניהול סקריפטים',
      admin: {
        description: 'הוספת קודי מעקב וסקריפטים חיצוניים לאתר',
      },
      fields: [
        {
          name: 'headScripts',
          type: 'code',
          label: 'סקריפטים ב-Head',
          admin: {
            language: 'html',
            description: 'קוד שירוץ בתוך תגית <head>',
          },
        },
        {
          name: 'bodyStartScripts',
          type: 'code',
          label: 'סקריפטים בתחילת Body',
          admin: {
            language: 'html',
            description: 'קוד שירוץ מיד אחרי <body>',
          },
        },
        {
          name: 'footerScripts',
          type: 'code',
          label: 'סקריפטים בסוף Body',
          admin: {
            language: 'html',
            description: 'קוד שירוץ לפני </body>',
          },
        },
      ],
    },
    // Pixels (structured)
    {
      name: 'pixels',
      type: 'array',
      label: 'פיקסלים מובנים',
      admin: {
        description: 'ניהול פיקסלים בצורה מובנית',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'פלטפורמה',
          required: true,
          options: [
            { label: 'Meta (Facebook/Instagram)', value: 'meta' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Google Analytics', value: 'google' },
            { label: 'Google Ads', value: 'googleAds' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Fixdigital', value: 'fixdigital' },
            { label: 'אחר', value: 'custom' },
          ],
        },
        {
          name: 'pixelId',
          type: 'text',
          label: 'Pixel ID / Measurement ID',
          required: true,
        },
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'פעיל',
          defaultValue: true,
        },
        {
          name: 'customScript',
          type: 'code',
          label: 'סקריפט מותאם אישית',
          admin: {
            language: 'javascript',
            condition: (data, siblingData) => siblingData?.platform === 'custom',
          },
        },
      ],
    },
  ],
}
