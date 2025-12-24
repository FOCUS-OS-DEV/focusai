import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'דף הבית',
  admin: {
    description: 'כל התוכן של דף הבית - כותרות, סטטיסטיקות, CTAs',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // ============ HERO SECTION ============
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'הסקשן הראשי בראש הדף',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'כותרת ראשית',
          defaultValue: 'הפכו לאלופי ה-AI',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'מילה מודגשת (בגרדיאנט)',
          defaultValue: 'AI',
          admin: {
            description: 'המילה שתהיה בצבע הגרדיאנט',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'תת-כותרת',
          defaultValue: 'האקדמיה המובילה בישראל ללימודי בינה מלאכותית ואוטומציה עסקית',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'תמונה/וידאו',
        },
        {
          name: 'primaryCta',
          type: 'group',
          label: 'כפתור ראשי',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'טקסט',
              defaultValue: 'הקורסים שלנו',
            },
            {
              name: 'link',
              type: 'text',
              label: 'קישור',
              defaultValue: '/courses',
            },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'כפתור משני',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'טקסט',
              defaultValue: 'שיחת ייעוץ חינם',
            },
            {
              name: 'link',
              type: 'text',
              label: 'קישור',
              defaultValue: '#contact',
            },
          ],
        },
      ],
    },

    // ============ GLOBAL STATS ============
    {
      name: 'globalStats',
      type: 'group',
      label: 'סטטיסטיקות גלובליות',
      admin: {
        description: 'מספרים שמוצגים בכל האתר (דף הבית, אודות וכו\')',
      },
      fields: [
        {
          name: 'graduates',
          type: 'group',
          label: 'בוגרים',
          fields: [
            {
              name: 'value',
              type: 'number',
              label: 'מספר',
              defaultValue: 500,
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'תווית',
              defaultValue: 'בוגרים מרוצים',
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'סיומת',
              defaultValue: '+',
            },
          ],
        },
        {
          name: 'courses',
          type: 'group',
          label: 'קורסים',
          fields: [
            {
              name: 'value',
              type: 'number',
              label: 'מספר',
              defaultValue: 50,
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'תווית',
              defaultValue: 'קורסים וסדנאות',
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'סיומת',
              defaultValue: '+',
            },
          ],
        },
        {
          name: 'companies',
          type: 'group',
          label: 'חברות',
          fields: [
            {
              name: 'value',
              type: 'number',
              label: 'מספר',
              defaultValue: 100,
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'תווית',
              defaultValue: 'חברות שעבדנו איתן',
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'סיומת',
              defaultValue: '+',
            },
          ],
        },
        {
          name: 'satisfaction',
          type: 'group',
          label: 'שביעות רצון',
          fields: [
            {
              name: 'value',
              type: 'number',
              label: 'אחוז',
              defaultValue: 95,
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'label',
              type: 'text',
              label: 'תווית',
              defaultValue: 'שביעות רצון',
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'סיומת',
              defaultValue: '%',
            },
          ],
        },
      ],
    },

    // ============ LEGACY STATS (for backward compatibility) ============
    {
      name: 'stats',
      type: 'array',
      label: 'סטטיסטיקות (ישן)',
      admin: {
        description: 'שדה ישן - השתמש ב-globalStats במקום',
      },
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', label: 'מספר' },
        { name: 'label', type: 'text', label: 'תיאור' },
      ],
    },

    // ============ WHY US SECTION ============
    {
      name: 'whyUs',
      type: 'array',
      label: 'למה אנחנו',
      admin: {
        description: 'נקודות מפתח שמסבירות למה לבחור בנו',
      },
      fields: [
        { name: 'icon', type: 'text', label: 'אייקון (emoji)', defaultValue: '🎯' },
        { name: 'title', type: 'text', label: 'כותרת', required: true },
        { name: 'description', type: 'textarea', label: 'תיאור', required: true },
      ],
    },

    // ============ ABOUT SECTION ============
    {
      name: 'about',
      type: 'group',
      label: 'About Section',
      admin: {
        description: 'סקשן אודות בדף הבית',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'כותרת',
          defaultValue: 'מי אנחנו',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'תת-כותרת',
          defaultValue: 'האקדמיה המובילה בישראל להכשרות AI מעשיות',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'תוכן',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'תמונה',
        },
        {
          name: 'features',
          type: 'array',
          label: 'פיצ׳רים',
          admin: {
            description: 'נקודות מפתח שמוצגות בסקשן',
          },
          fields: [
            {
              name: 'icon',
              type: 'text',
              label: 'אייקון (emoji)',
              defaultValue: '✓',
            },
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'תיאור',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'טקסט',
              defaultValue: 'קראו עוד עלינו',
            },
            {
              name: 'link',
              type: 'text',
              label: 'קישור',
              defaultValue: '/about',
            },
          ],
        },
      ],
    },

    // ============ SECTION TITLES ============
    {
      name: 'sections',
      type: 'group',
      label: 'כותרות סקשנים',
      admin: {
        description: 'כותרות ותתי-כותרות לכל סקשן בדף',
      },
      fields: [
        {
          name: 'programs',
          type: 'group',
          label: 'מסלולים',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'המסלולים שלנו' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'מגוון הכשרות מעשיות בתחום הבינה המלאכותית' },
          ],
        },
        {
          name: 'testimonials',
          type: 'group',
          label: 'המלצות',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מה אומרים עלינו' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'שמעו מהבוגרים שלנו' },
          ],
        },
        {
          name: 'team',
          type: 'group',
          label: 'צוות',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'צוות המרצים' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'המומחים שילוו אתכם לאורך ההכשרה' },
          ],
        },
        {
          name: 'partners',
          type: 'group',
          label: 'שותפים',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'שותפויות ולקוחות' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת' },
          ],
        },
        // Legacy fields for backward compatibility
        { name: 'coursesTitle', type: 'text', label: 'כותרת מסלולים (ישן)', defaultValue: 'המסלולים שלנו' },
        { name: 'blogTitle', type: 'text', label: 'כותרת בלוג (ישן)', defaultValue: 'חדש בבלוג' },
        { name: 'testimonialsTitle', type: 'text', label: 'כותרת המלצות (ישן)', defaultValue: 'מה אומרים עלינו' },
        { name: 'partnersTitle', type: 'text', label: 'כותרת שותפים (ישן)', defaultValue: 'שותפויות ולקוחות' },
      ],
    },

    // ============ NEWSLETTER ============
    {
      name: 'newsletter',
      type: 'group',
      label: 'ניוזלטר',
      fields: [
        { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'הישארו מעודכנים' },
        { name: 'description', type: 'textarea', label: 'תיאור', defaultValue: 'הרשמו לקבלת עדכונים, טיפים ותכנים בלעדיים' },
        { name: 'buttonText', type: 'text', label: 'טקסט כפתור', defaultValue: 'הרשמה' },
        { name: 'webhookUrl', type: 'text', label: 'Webhook URL' },
      ],
    },

    // ============ BOTTOM CTA ============
    {
      name: 'bottomCta',
      type: 'group',
      label: 'CTA תחתון',
      fields: [
        { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מוכנים להתחיל?' },
        { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'הצטרפו לאלפי בוגרים שכבר עשו את הצעד' },
        { name: 'showForm', type: 'checkbox', label: 'הצג טופס', defaultValue: true },
        { name: 'showWhatsapp', type: 'checkbox', label: 'הצג וואטסאפ', defaultValue: true },
        {
          name: 'primaryButton',
          type: 'group',
          label: 'כפתור ראשי',
          fields: [
            { name: 'text', type: 'text', label: 'טקסט', defaultValue: 'שיחת ייעוץ חינם' },
            { name: 'link', type: 'text', label: 'קישור', defaultValue: '#contact' },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          label: 'כפתור משני',
          fields: [
            { name: 'text', type: 'text', label: 'טקסט', defaultValue: 'WhatsApp' },
            { name: 'link', type: 'text', label: 'קישור', defaultValue: 'https://wa.me/972539466408' },
          ],
        },
      ],
    },
  ],
}
