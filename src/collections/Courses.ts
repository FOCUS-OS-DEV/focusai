import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'מסלול',
    plural: 'מסלולים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'featured'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // בסיסי
    {
      name: 'title',
      type: 'text',
      label: 'שם המסלול',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'תת-כותרת',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'תיאור מלא',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'תקציר קצר',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה ראשית',
    },
    // סוג ופרטים
    {
      name: 'type',
      type: 'select',
      label: 'סוג המסלול',
      required: true,
      options: [
        { label: 'פרונטלי', value: 'frontal' },
        { label: 'דיגיטלי', value: 'digital' },
        { label: 'סדנה לארגונים', value: 'workshop' },
        { label: 'ליווי אישי', value: 'coaching' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      label: 'משך',
      admin: { description: 'למשל: 12 שבועות' },
    },
    {
      name: 'schedule',
      type: 'text',
      label: 'לוח זמנים',
      admin: { description: 'למשל: ימי שני 17:00-21:00' },
    },
    {
      name: 'location',
      type: 'text',
      label: 'מיקום',
      defaultValue: 'אריה שנקר 14, הרצליה פיתוח (Nolton House)',
    },
    {
      name: 'hasZoom',
      type: 'checkbox',
      label: 'אפשרות זום',
      defaultValue: true,
    },
    {
      name: 'maxStudents',
      type: 'number',
      label: 'מקסימום תלמידים',
      defaultValue: 18,
    },
    {
      name: 'instructorRatio',
      type: 'text',
      label: 'יחס מרצים',
      admin: { description: 'למשל: 3 מרצים על 18 תלמידים' },
    },
    // תעודה
    {
      name: 'certificate',
      type: 'text',
      label: 'סוג תעודה',
    },
    {
      name: 'certificateDescription',
      type: 'textarea',
      label: 'תיאור התעודה',
    },
    // מחיר בסיסי (לקורסים דיגיטליים)
    {
      name: 'price',
      type: 'number',
      label: 'מחיר',
      admin: { condition: (data) => data.type === 'digital' },
    },
    {
      name: 'showPrice',
      type: 'checkbox',
      label: 'הצג מחיר באתר',
      defaultValue: false,
    },
    // מסלולי מחיר (לקורסים עם מספר אופציות - פרונטלי/זום)
    {
      name: 'pricingTracks',
      type: 'array',
      label: 'מסלולי מחיר',
      admin: {
        description: 'מחירון לקורסים עם מספר אופציות (פרונטלי, זום, וכו\')',
        condition: (data) => data.type === 'frontal' || data.type === 'workshop',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'שם המסלול',
          required: true,
          admin: { description: 'לדוגמה: מסלול פרונטלי, מסלול Zoom' },
        },
        {
          name: 'schedule',
          type: 'text',
          label: 'לו"ז',
          admin: { description: 'לדוגמה: הרצליה פיתוח | ימי שישי | 9:00-12:00' },
        },
        {
          name: 'price',
          type: 'number',
          label: 'מחיר',
          required: true,
        },
        {
          name: 'originalPrice',
          type: 'number',
          label: 'מחיר מקורי (לפני הנחה)',
        },
        {
          name: 'priceNote',
          type: 'text',
          label: 'הערה למחיר',
          admin: { description: 'לדוגמה: מחיר השקה מוקדם' },
        },
        {
          name: 'features',
          type: 'array',
          label: 'מה כלול',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'פיצ\'ר',
            },
          ],
        },
      ],
    },
    // תאריך מחזור קרוב
    {
      name: 'nextCohortDate',
      type: 'text',
      label: 'תאריך מחזור קרוב',
      admin: {
        description: 'לדוגמה: 27.02.2026',
      },
    },
    // למה עכשיו - כרטיסי שיווק
    {
      name: 'whyNow',
      type: 'array',
      label: 'למה עכשיו',
      admin: {
        description: 'כרטיסי שיווק שמסבירים למה עכשיו זה הזמן להצטרף',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'אייקון',
          defaultValue: '🎯',
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
          required: true,
        },
      ],
    },
    // תגי אמון
    {
      name: 'trustBadges',
      type: 'array',
      label: 'תגי אמון',
      admin: {
        description: 'תגים כמו "8 מפגשים", "קבוצות קטנות", וכו\'',
      },
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'אייקון',
          defaultValue: '🎓',
        },
        {
          name: 'text',
          type: 'text',
          label: 'טקסט',
          required: true,
        },
      ],
    },
    // נקודות מפתח
    {
      name: 'highlights',
      type: 'array',
      label: 'נקודות מפתח',
      fields: [
        { name: 'icon', type: 'text', label: 'אייקון', admin: { description: 'שם אייקון מ-Lucide' } },
        { name: 'text', type: 'text', label: 'טקסט', required: true },
      ],
    },
    // סילבוס (מבנה מלא - מקור האמת היחיד)
    {
      name: 'syllabus',
      type: 'array',
      label: 'סילבוס',
      admin: {
        initCollapsed: true,
        description: 'תכנית הלימודים - מפגשים/שבועות',
      },
      fields: [
        {
          name: 'number',
          type: 'number',
          label: 'מספר מפגש',
          required: true,
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
          required: true,
        },
        {
          name: 'topics',
          type: 'array',
          label: 'נושאים',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'נושא',
            },
          ],
        },
        {
          name: 'tools',
          type: 'array',
          label: 'כלים וטכנולוגיות',
          admin: {
            description: 'כלי AI שילמדו במפגש (ChatGPT, Claude, וכו\')',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'שם הכלי',
            },
          ],
        },
        {
          name: 'icon',
          type: 'text',
          label: 'אייקון',
          admin: {
            description: 'אמוג\'י או אייקון',
          },
        },
      ],
    },
    // FAQ
    {
      name: 'faq',
      type: 'array',
      label: 'שאלות נפוצות',
      fields: [
        { name: 'question', type: 'text', label: 'שאלה', required: true },
        { name: 'answer', type: 'richText', label: 'תשובה', required: true },
      ],
    },
    // גלריה
    {
      name: 'gallery',
      type: 'array',
      label: 'גלריית תמונות',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'תמונה', required: true },
        { name: 'caption', type: 'text', label: 'כיתוב' },
      ],
    },
    // קשרים
    {
      name: 'instructors',
      type: 'relationship',
      relationTo: 'instructors',
      hasMany: true,
      label: 'מרצים',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'המלצות',
    },
    // CTA
    {
      name: 'ctaText',
      type: 'text',
      label: 'טקסט כפתור',
      defaultValue: 'השארת פרטים',
    },
    {
      name: 'ctaType',
      type: 'select',
      label: 'סוג כפתור',
      options: [
        { label: 'טופס יצירת קשר', value: 'contact' },
        { label: 'רכישה', value: 'purchase' },
        { label: 'קישור חיצוני', value: 'link' },
      ],
      defaultValue: 'contact',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'קישור (אם רלוונטי)',
    },
    // מטא
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
      name: 'order',
      type: 'number',
      label: 'סדר הצגה',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'מומלץ',
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
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'תמונה לשיתוף' },
      ],
    },
  ],
}
