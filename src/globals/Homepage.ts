import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'דף הבית',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Hero
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        { name: 'title', type: 'text', label: 'כותרת' },
        { name: 'subtitle', type: 'textarea', label: 'תת-כותרת' },
        { name: 'primaryCta', type: 'text', label: 'כפתור ראשי - טקסט' },
        { name: 'primaryCtaLink', type: 'text', label: 'כפתור ראשי - קישור' },
        { name: 'secondaryCta', type: 'text', label: 'כפתור משני - טקסט' },
        { name: 'secondaryCtaLink', type: 'text', label: 'כפתור משני - קישור' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'תמונה' },
      ],
    },
    // סטטיסטיקות
    {
      name: 'stats',
      type: 'array',
      label: 'סטטיסטיקות',
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', label: 'מספר' },
        { name: 'label', type: 'text', label: 'תיאור' },
      ],
    },
    // Why Us
    {
      name: 'whyUs',
      type: 'array',
      label: 'למה אנחנו',
      fields: [
        { name: 'icon', type: 'text', label: 'אייקון' },
        { name: 'title', type: 'text', label: 'כותרת' },
        { name: 'description', type: 'text', label: 'תיאור' },
      ],
    },
    // כותרות סקשנים
    {
      name: 'sections',
      type: 'group',
      label: 'כותרות סקשנים',
      fields: [
        { name: 'coursesTitle', type: 'text', label: 'כותרת מסלולים', defaultValue: 'המסלולים שלנו' },
        { name: 'blogTitle', type: 'text', label: 'כותרת בלוג', defaultValue: 'חדש בבלוג' },
        { name: 'testimonialsTitle', type: 'text', label: 'כותרת המלצות', defaultValue: 'מה אומרים עלינו' },
        { name: 'partnersTitle', type: 'text', label: 'כותרת שותפים', defaultValue: 'שותפויות ולקוחות' },
      ],
    },
    // Newsletter
    {
      name: 'newsletter',
      type: 'group',
      label: 'ניוזלטר',
      fields: [
        { name: 'title', type: 'text', label: 'כותרת' },
        { name: 'description', type: 'text', label: 'תיאור' },
        { name: 'webhookUrl', type: 'text', label: 'Webhook URL (Fixdigital)' },
      ],
    },
    // CTA תחתון
    {
      name: 'bottomCta',
      type: 'group',
      label: 'CTA תחתון',
      fields: [
        { name: 'title', type: 'text', label: 'כותרת' },
        { name: 'description', type: 'text', label: 'תיאור' },
        { name: 'showForm', type: 'checkbox', label: 'הצג טופס', defaultValue: true },
        { name: 'showWhatsapp', type: 'checkbox', label: 'הצג וואטסאפ', defaultValue: true },
      ],
    },
  ],
}
