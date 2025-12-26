import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  console.log('🌱 Seed AI Ready API called')

  try {
    const payload = await getPayload({ config })

    console.log('📄 Updating Pages global with AI Ready data...')

    await payload.updateGlobal({
      slug: 'pages',
      data: {
        aiReady: {
          hero: {
            badge: '🎓 AI BUILT',
            title: 'ARE YOU',
            titleHighlight: 'AI READY?',
            subtitle:
              'הכשרה ייחודית בת 8 מפגשים שתלמד אתכם לעבוד עם הכלים המתקדמים ביותר בעולם ה-AI ולהטמיע אותם בעבודה היומיומית שלכם.',
            primaryCta: 'הרשמה להכשרה',
            secondaryCta: 'לסילבוס המלא',
          },
          trustBadges: [
            { icon: '🎓', text: '8 מפגשים מעשיים' },
            { icon: '👨‍🏫', text: 'מרצים מומחים' },
            { icon: '📜', text: 'תעודת סיום' },
            { icon: '💻', text: 'פרונטלי + זום' },
          ],
          audience: {
            title: 'למי ההכשרה מתאימה?',
            subtitle: 'אנשי מקצוע שרוצים להתקדם בעידן ה-AI',
          },
          benefits: {
            title: 'מה מקבלים בהכשרה?',
            subtitle: 'כל מה שצריך להפוך ל-AI Ready',
          },
          pricing: {
            title: 'מסלולי הכשרה',
            subtitle: 'בחרו את המסלול שמתאים לכם',
            nextCohortDate: '27.02.2026',
            frontalTrack: {
              title: 'מסלול פרונטלי',
              schedule: 'הרצליה פיתוח | ימי שישי | 9:00-12:00',
              originalPrice: '7,900 ₪',
              price: '4,900',
              priceNote: 'מחיר השקה מוקדם',
            },
            zoomTrack: {
              title: 'מסלול Zoom',
              schedule: 'אונליין | ימי שישי | 9:00-12:00',
              originalPrice: '3,900 ₪',
              price: '2,490',
              priceNote: 'מחיר השקה מוקדם',
            },
          },
          testimonials: {
            badge: 'מה אומרים עלינו',
            title: 'הסטודנטים שלנו',
            titleHighlight: 'מספרים',
          },
          about: {
            title: 'הסיפור של Focus AI',
          },
          team: {
            title: 'צוות המרצים',
            subtitle: 'המומחים שילוו אתכם לאורך ההכשרה',
          },
          cta: {
            title: 'מוכנים להפוך ל-AI Ready?',
            subtitle: 'עוד צעד קטן ואתם בפנים, בואו נדבר!',
          },
          form: {
            title: 'רוצים לשמוע עוד?',
            subtitle: 'השאירו פרטים ונחזור אליכם תוך 24 שעות',
            buttonText: 'שלחו פרטים',
          },
          syllabus: {
            badge: '📚 תכנית לימודים',
            title: 'סילבוס במיקוד יישומי ופרקטי',
            subtitle:
              '8 מפגשים שייקחו אותכם מהבסיס לשליטה מלאה בכלי AI המתקדמים ביותר',
            meetings: [
              {
                number: 1,
                title: 'מבוא לבינה מלאכותית והנדסת פרומפטים',
                description:
                  'מבוא מקיף לעולם ה-AI, היכרות עם מודלי שפה גדולים ויכולות הכלים המובילים. למידה מעמיקה של עקרונות חשיבה ובניית בקשות מדויקות.',
                tools: [
                  { name: 'ChatGPT' },
                  { name: 'Claude' },
                  { name: 'Prompt Engineering' },
                ],
                icon: '🎯',
              },
              {
                number: 2,
                title: 'מחקר חכם ובניית סוכני AI',
                description:
                  'בניית סוכנים חכמים המיועדים לכל מטרה אישית או מקצועית. ביצוע מחקר ואיסוף מידע לבניית בסיס ידע איכותי. כל משתתף יבנה סוכן AI פעיל!',
                tools: [
                  { name: 'GPTs Builder' },
                  { name: 'Perplexity' },
                  { name: 'AI Agents' },
                ],
                icon: '🤖',
              },
              {
                number: 3,
                title: 'סיכום פגישות, עיבוד מסמכים ויצירת מצגות',
                description:
                  'למידה מעמיקה של כלים לניתוח מסמכים, תמלול וסיכום פגישות, עיבוד תוכן מורכב ובניית תובנות. יצירת מצגות מקצועיות.',
                tools: [
                  { name: 'GenSpark' },
                  { name: 'NotebookLM' },
                  { name: 'Google AI Studio' },
                ],
                icon: '📝',
              },
              {
                number: 4,
                title: 'יצירת תמונות וסרטונים בכלים חדשניים',
                description:
                  "יצירת תמונות ווידאו מקצועיים באמצעות כלי AI מתקדמים. כתיבת פרומפטים יצירתיים, עריכת תמונות קיימות, והפקת סרטונים קצרים.",
                tools: [
                  { name: 'DALL-E' },
                  { name: 'Midjourney' },
                  { name: 'Kling AI' },
                ],
                icon: '🎨',
              },
              {
                number: 5,
                title: 'בניית דשבורדים חכמים',
                description:
                  'בניית דשבורדים אינטראקטיביים לצרכים ניהוליים ועסקיים. הגדרת ויזואליזציה של נתונים, מעקב אחר KPIs, והפקת תובנות מהירות.',
                tools: [
                  { name: 'Lovable' },
                  { name: 'Dashboards' },
                  { name: 'Data Visualization' },
                ],
                icon: '📊',
              },
              {
                number: 6,
                title: 'אפיון עסקי, איסוף מידע ויצירת דשבורדים',
                description:
                  'שיטות לאיסוף מידע איכותי ומיפוי תהליכים בארגון, זיהוי נקודות כאב, צווארי בקבוק ואבדן יעילות.',
                tools: [
                  { name: 'BPMN' },
                  { name: 'RACI' },
                  { name: 'Dashboards' },
                ],
                icon: '📋',
              },
              {
                number: 7,
                title: 'דפי נחיתה, מיילים מעוצבים ואוטומציה',
                description:
                  'יסודות הפיתוח לבניית דפי נחיתה ומיילים שיווקיים מעוצבים. שימוש נכון בכותרות, טקסטים, תמונות, כפתורי פעולה ואוטומציות.',
                tools: [
                  { name: 'n8n' },
                  { name: 'Landing Pages' },
                  { name: 'Automation' },
                ],
                icon: '🌐',
              },
              {
                number: 8,
                title: 'יישום מעשי ופרויקט אישי',
                description:
                  'התכלית של כל ההכשרה! יישום כל היכולות שנרכשו בפרויקט אמיתי מהארגון או מהעסק שלכם. בניית פתרון מבוסס AI, ליווי צמוד ומשוב.',
                tools: [{ name: 'פרויקט אמיתי' }, { name: 'ליווי צמוד' }],
                icon: '🚀',
              },
            ],
          },
          whyNow: {
            badge: '⏰ למה עכשיו?',
            title: 'למה עכשיו זה הזמן?',
            cards: [
              {
                icon: '📉',
                title: 'פער משמעותי בשוק העבודה',
                description:
                  'ארגונים מפטרים עובדים שלא יודעים לעבוד עם AI ומחפשים מועמדים שמבינים איך ליישם את הכלים האלה בפועל.',
              },
              {
                icon: '📈',
                title: 'ROI מהשבוע הראשון',
                description:
                  'שימוש נכון בכלי AI מניב תוצאות כבר מהשבוע הראשון - חיסכון משמעותי בשעות עבודה, דיוק גבוה יותר במשימות.',
              },
              {
                icon: '🏢',
                title: 'אימוץ מהיר בארגונים',
                description:
                  'ארגונים בכל הגדלים מטמיעים כלי AI לשיפור יעילות ותקשורת. מי שיודע להוביל את השינוי הזה - מקבל יתרון משמעותי.',
              },
              {
                icon: '🚀',
                title: 'העתיד כבר כאן',
                description:
                  'הביקוש למיומנויות AI רק ימשיך לצמוח בשנים הקרובות. להתחיל עכשיו זה לא "להיות מוקדם" - זה להיות בזמן.',
              },
            ],
          },
        },
      },
    })

    console.log('✅ Pages global updated with AI Ready data!')

    return Response.json({
      success: true,
      message: 'AI Ready data seeded successfully!',
      sections: [
        'hero',
        'trustBadges',
        'audience',
        'benefits',
        'pricing',
        'testimonials',
        'about',
        'team',
        'cta',
        'form',
        'syllabus (8 meetings)',
        'whyNow (4 cards)',
      ],
    })
  } catch (error) {
    console.error('❌ Seed AI Ready error:', error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
