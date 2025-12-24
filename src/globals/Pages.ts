import type { GlobalConfig } from 'payload'

export const Pages: GlobalConfig = {
  slug: 'pages',
  label: 'תוכן דפים',
  admin: {
    description: 'תוכן דינמי לכל הדפים באתר',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // ============ ABOUT PAGE ============
    {
      name: 'about',
      type: 'group',
      label: 'דף אודות',
      fields: [
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'אנחנו',
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'מילה מודגשת',
              defaultValue: 'Focus AI Academy',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'האקדמיה המובילה בישראל ללימודי בינה מלאכותית ואוטומציה עסקית. אנחנו מכשירים את הדור הבא של מובילי המהפכה הדיגיטלית.',
            },
          ],
        },
        {
          name: 'mission',
          type: 'group',
          label: 'סקשן משימה',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'תגית',
              defaultValue: 'המשימה שלנו',
            },
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'להפוך את הבינה המלאכותית',
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'חלק מודגש',
              defaultValue: 'לנגישה לכולם',
            },
            {
              name: 'paragraphs',
              type: 'array',
              label: 'פסקאות',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  label: 'טקסט',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'values',
          type: 'array',
          label: 'ערכים',
          minRows: 3,
          maxRows: 6,
          fields: [
            {
              name: 'icon',
              type: 'text',
              label: 'אייקון (emoji)',
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
        {
          name: 'team',
          type: 'group',
          label: 'סקשן צוות',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'תגית',
              defaultValue: 'הצוות שלנו',
            },
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'הכירו את המומחים',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'צוות מומחים מהשורה הראשונה בתחום הבינה המלאכותית והאוטומציה, עם ניסיון מוכח בהטמעת פתרונות AI בחברות מובילות',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'מוכנים להצטרף?',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'בואו נדבר על איך Focus AI Academy יכולה לעזור לכם להוביל את המהפכה הדיגיטלית',
            },
            {
              name: 'primaryButton',
              type: 'group',
              label: 'כפתור ראשי',
              fields: [
                { name: 'text', type: 'text', label: 'טקסט', defaultValue: 'הקורסים שלנו' },
                { name: 'link', type: 'text', label: 'קישור', defaultValue: '/courses' },
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
    },

    // ============ COURSES PAGE ============
    {
      name: 'courses',
      type: 'group',
      label: 'דף קורסים',
      fields: [
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'המסלולים',
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'מילה מודגשת',
              defaultValue: 'שלנו',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'מגוון הכשרות מעשיות בתחום הבינה המלאכותית - מהיסודות ועד לרמה המתקדמת',
            },
          ],
        },
        {
          name: 'emptyState',
          type: 'group',
          label: 'Empty State',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'לא נמצאו קורסים התואמים את החיפוש',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'תת-כותרת',
              defaultValue: 'נסו לשנות את הפילטרים או לחפש משהו אחר',
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'טקסט כפתור',
              defaultValue: 'הצג את כל הקורסים',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'לא בטוחים מה מתאים לכם?',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'נשמח לעזור לכם לבחור את המסלול המתאים ביותר לצרכים שלכם',
            },
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
    },

    // ============ BLOG PAGE ============
    {
      name: 'blog',
      type: 'group',
      label: 'דף בלוג',
      fields: [
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'הבלוג',
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'מילה מודגשת',
              defaultValue: 'שלנו',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'מאמרים, טיפים ותובנות מעולם הבינה המלאכותית והאוטומציה העסקית',
            },
          ],
        },
        {
          name: 'emptyState',
          type: 'group',
          label: 'Empty State',
          fields: [
            {
              name: 'noResults',
              type: 'text',
              label: 'אין תוצאות חיפוש',
              defaultValue: 'לא נמצאו מאמרים התואמים את החיפוש',
            },
            {
              name: 'noPosts',
              type: 'text',
              label: 'אין מאמרים',
              defaultValue: 'עוד אין מאמרים בבלוג',
            },
            {
              name: 'noPostsSubtitle',
              type: 'text',
              label: 'תת-כותרת (אין מאמרים)',
              defaultValue: 'מאמרים חדשים יתווספו בקרוב!',
            },
            {
              name: 'filterSubtitle',
              type: 'text',
              label: 'תת-כותרת (אין תוצאות)',
              defaultValue: 'נסו לשנות את הפילטרים או לחפש משהו אחר',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'רוצים ללמוד עוד?',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית ומקצועית',
            },
            {
              name: 'primaryButton',
              type: 'group',
              label: 'כפתור ראשי',
              fields: [
                { name: 'text', type: 'text', label: 'טקסט', defaultValue: 'הקורסים שלנו' },
                { name: 'link', type: 'text', label: 'קישור', defaultValue: '/courses' },
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
        {
          name: 'postCta',
          type: 'group',
          label: 'CTA בסוף מאמר',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'אהבתם את המאמר?',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית',
            },
          ],
        },
      ],
    },

    // ============ THANK YOU PAGE ============
    {
      name: 'thankYou',
      type: 'group',
      label: 'דף תודה',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'אייקון',
          defaultValue: '🎉',
        },
        {
          name: 'title',
          type: 'text',
          label: 'כותרת',
          defaultValue: 'תודה רבה',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'תת-כותרת',
          defaultValue: 'הפרטים שלך התקבלו בהצלחה!',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'תיאור',
          defaultValue: 'נציג שלנו יצור איתך קשר בהקדם האפשרי (בדרך כלל תוך 24 שעות)',
        },
        {
          name: 'whatNext',
          type: 'group',
          label: 'מה עכשיו?',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'כותרת',
              defaultValue: 'מה עכשיו?',
            },
            {
              name: 'items',
              type: 'array',
              label: 'פריטים',
              fields: [
                { name: 'icon', type: 'text', label: 'אייקון', defaultValue: '📱' },
                { name: 'text', type: 'text', label: 'טקסט', required: true },
              ],
            },
          ],
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'כפתורים',
          maxRows: 3,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'טקסט',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'קישור',
              required: true,
            },
            {
              name: 'style',
              type: 'select',
              label: 'סגנון',
              defaultValue: 'primary',
              options: [
                { label: 'ראשי (סגול)', value: 'primary' },
                { label: 'משני (לבן)', value: 'secondary' },
                { label: 'WhatsApp (ירוק)', value: 'whatsapp' },
              ],
            },
            {
              name: 'icon',
              type: 'text',
              label: 'אייקון (emoji או SVG name)',
            },
          ],
        },
      ],
    },

    // ============ AI READY LANDING PAGE ============
    {
      name: 'aiReady',
      type: 'group',
      label: 'דף AI Ready',
      admin: {
        description: 'תוכן לדף הנחיתה AI Ready',
      },
      fields: [
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Section',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'תג עליון',
              defaultValue: 'AI BUILT',
            },
            {
              name: 'title',
              type: 'text',
              label: 'כותרת שורה 1',
              defaultValue: 'ARE YOU',
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'כותרת שורה 2 (צבעונית)',
              defaultValue: 'AI READY?',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'תת-כותרת',
              defaultValue: 'הכשרה ייחודית בת 8 מפגשים שתלמד אתכם לעבוד עם הכלים המתקדמים ביותר בעולם ה-AI ולהטמיע אותם בעבודה היומיומית שלכם.',
            },
            {
              name: 'primaryCta',
              type: 'text',
              label: 'כפתור ראשי',
              defaultValue: 'הרשמה להכשרה',
            },
            {
              name: 'secondaryCta',
              type: 'text',
              label: 'כפתור משני',
              defaultValue: 'לסילבוס המלא',
            },
          ],
        },
        {
          name: 'trustBadges',
          type: 'array',
          label: 'תגי אמון',
          maxRows: 4,
          fields: [
            { name: 'icon', type: 'text', label: 'אייקון', defaultValue: '🎓' },
            { name: 'text', type: 'text', label: 'טקסט', required: true },
          ],
        },
        {
          name: 'audience',
          type: 'group',
          label: 'למי זה מתאים',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'למי ההכשרה מתאימה?' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת' },
          ],
        },
        {
          name: 'benefits',
          type: 'group',
          label: 'מה מקבלים',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מה מקבלים בהכשרה?' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת' },
          ],
        },
        {
          name: 'pricing',
          type: 'group',
          label: 'מחירים',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מסלולי הכשרה' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת' },
            { name: 'nextCohortDate', type: 'text', label: 'תאריך מחזור קרוב', defaultValue: '27.02.2026' },
            {
              name: 'frontalTrack',
              type: 'group',
              label: 'מסלול פרונטלי',
              fields: [
                { name: 'title', type: 'text', label: 'שם', defaultValue: 'מסלול פרונטלי' },
                { name: 'schedule', type: 'text', label: 'לו"ז', defaultValue: 'הרצליה פיתוח | ימי שישי | 9:00-12:00' },
                { name: 'originalPrice', type: 'text', label: 'מחיר מקורי', defaultValue: '7,900 ₪' },
                { name: 'price', type: 'text', label: 'מחיר', defaultValue: '4,900' },
                { name: 'priceNote', type: 'text', label: 'הערה למחיר', defaultValue: 'מחיר השקה מוקדם' },
              ],
            },
            {
              name: 'zoomTrack',
              type: 'group',
              label: 'מסלול Zoom',
              fields: [
                { name: 'title', type: 'text', label: 'שם', defaultValue: 'מסלול Zoom' },
                { name: 'schedule', type: 'text', label: 'לו"ז', defaultValue: 'אונליין | ימי שישי | 9:00-12:00' },
                { name: 'originalPrice', type: 'text', label: 'מחיר מקורי', defaultValue: '3,900 ₪' },
                { name: 'price', type: 'text', label: 'מחיר', defaultValue: '2,490' },
                { name: 'priceNote', type: 'text', label: 'הערה למחיר', defaultValue: 'מחיר השקה מוקדם' },
              ],
            },
          ],
        },
        {
          name: 'testimonials',
          type: 'group',
          label: 'המלצות',
          fields: [
            { name: 'badge', type: 'text', label: 'תג', defaultValue: 'מה אומרים עלינו' },
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'הסטודנטים שלנו' },
            { name: 'titleHighlight', type: 'text', label: 'חלק מודגש', defaultValue: 'מספרים' },
          ],
        },
        {
          name: 'about',
          type: 'group',
          label: 'אודות',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'הסיפור של Focus AI' },
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
          name: 'cta',
          type: 'group',
          label: 'CTA Section',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מוכנים להפוך ל-AI Ready?' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'עוד צעד קטן ואתם בפנים, בואו נדבר!' },
          ],
        },
        {
          name: 'form',
          type: 'group',
          label: 'טופס',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'רוצים לשמוע עוד?' },
            { name: 'subtitle', type: 'text', label: 'תת-כותרת', defaultValue: 'השאירו פרטים ונחזור אליכם תוך 24 שעות' },
            { name: 'buttonText', type: 'text', label: 'טקסט כפתור', defaultValue: 'שלחו פרטים' },
          ],
        },
      ],
    },

    // ============ COURSE SINGLE PAGE ============
    {
      name: 'courseSingle',
      type: 'group',
      label: 'דף קורס בודד',
      admin: {
        description: 'טקסטים וכותרות לדפי קורסים בודדים',
      },
      fields: [
        {
          name: 'buttons',
          type: 'group',
          label: 'כפתורים',
          fields: [
            { name: 'register', type: 'text', label: 'הרשמה', defaultValue: 'הרשמה לקורס' },
            { name: 'syllabus', type: 'text', label: 'סילבוס', defaultValue: 'לסילבוס המלא' },
            { name: 'contact', type: 'text', label: 'צור קשר', defaultValue: 'דברו איתנו' },
            { name: 'backHome', type: 'text', label: 'חזרה', defaultValue: 'חזרה לדף הבית' },
          ],
        },
        {
          name: 'sections',
          type: 'group',
          label: 'כותרות סקשנים',
          fields: [
            { name: 'whoIsItFor', type: 'text', label: 'למי זה מתאים', defaultValue: 'למי זה מתאים?' },
            { name: 'whyNow', type: 'text', label: 'למה עכשיו', defaultValue: 'למה עכשיו?' },
            { name: 'whatYouGet', type: 'text', label: 'מה תקבלו', defaultValue: 'מה תקבלו בהכשרה?' },
            { name: 'highlights', type: 'text', label: 'מה תלמדו', defaultValue: 'מה תלמדו?' },
            { name: 'syllabus', type: 'text', label: 'סילבוס', defaultValue: 'הסילבוס' },
            { name: 'team', type: 'text', label: 'צוות', defaultValue: 'הצוות' },
            { name: 'testimonials', type: 'text', label: 'המלצות', defaultValue: 'מה אומרים הבוגרים?' },
            { name: 'faq', type: 'text', label: 'שאלות נפוצות', defaultValue: 'שאלות נפוצות' },
          ],
        },
        {
          name: 'alerts',
          type: 'group',
          label: 'הודעות',
          fields: [
            { name: 'spotsLeft', type: 'text', label: 'מקומות אחרונים', defaultValue: 'נותרו מקומות אחרונים למחזור הקרוב' },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA Section',
          fields: [
            { name: 'title', type: 'text', label: 'כותרת', defaultValue: 'מוכנים להתחיל?' },
            { name: 'subtitle', type: 'textarea', label: 'תת-כותרת', defaultValue: 'הצטרפו למאות בוגרים שכבר עובדים עם AI' },
          ],
        },
      ],
    },

    // ============ COMMON CTA SECTION ============
    {
      name: 'commonCta',
      type: 'group',
      label: 'CTA משותף',
      admin: {
        description: 'הגדרות ברירת מחדל ל-CTA sections בכל הדפים',
      },
      fields: [
        {
          name: 'whatsappNumber',
          type: 'text',
          label: 'מספר WhatsApp',
          defaultValue: '972539466408',
        },
        {
          name: 'whatsappText',
          type: 'text',
          label: 'טקסט כפתור WhatsApp',
          defaultValue: 'WhatsApp',
        },
        {
          name: 'contactButtonText',
          type: 'text',
          label: 'טקסט כפתור צור קשר',
          defaultValue: 'שיחת ייעוץ חינם',
        },
      ],
    },
  ],
}
