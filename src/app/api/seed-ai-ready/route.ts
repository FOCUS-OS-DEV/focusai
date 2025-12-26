import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Seed AI Ready course data
 *
 * NOTE: AI Ready data is now in Course collection (Single Source of Truth!)
 * This endpoint updates the AI Ready course with full syllabus and content.
 */
export async function GET() {
  console.log('🌱 Seed AI Ready API called')

  try {
    const payload = await getPayload({ config })

    // Find or create the AI Ready course
    const { docs: existingCourses } = await payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: 'ai-ready-course',
        },
      },
    })

    const courseData = {
      title: 'AI Ready',
      slug: 'ai-ready-course',
      subtitle: 'הכשרה יישומית לכלי AI מתקדמים',
      excerpt: '8 מפגשים מעשיים שישנו את הדרך שבה אתם עובדים עם בינה מלאכותית',
      type: 'frontal' as const,
      duration: '8 מפגשים',
      schedule: 'ימי שישי 9:00-12:00',
      location: 'אריה שנקר 14, הרצליה פיתוח (Nolton House)',
      hasZoom: true,
      maxStudents: 18,
      instructorRatio: '1-2 מרצים על 18 תלמידים',
      certificate: 'תעודת Focus AI',
      status: 'published' as const,
      featured: true,
      order: 2,
      nextCohortDate: '27.02.2026',
      trustBadges: [
        { icon: '🎓', text: '8 מפגשים מעשיים' },
        { icon: '👨‍🏫', text: 'מרצים מומחים' },
        { icon: '📜', text: 'תעודת סיום' },
        { icon: '💻', text: 'פרונטלי + זום' },
      ],
      pricingTracks: [
        {
          name: 'מסלול פרונטלי',
          schedule: 'הרצליה פיתוח | ימי שישי | 9:00-12:00',
          price: 4900,
          originalPrice: 7900,
          priceNote: 'מחיר השקה מוקדם',
        },
        {
          name: 'מסלול Zoom',
          schedule: 'אונליין | ימי שישי | 9:00-12:00',
          price: 2490,
          originalPrice: 3900,
          priceNote: 'מחיר השקה מוקדם',
        },
      ],
      syllabus: [
        {
          number: 1,
          title: 'מבוא לבינה מלאכותית והנדסת פרומפטים',
          description:
            'מבוא מקיף לעולם ה-AI, היכרות עם מודלי שפה גדולים ויכולות הכלים המובילים. למידה מעמיקה של עקרונות חשיבה ובניית בקשות מדויקות.',
          topics: [{ text: 'מודלי שפה' }, { text: 'Prompt Engineering' }],
          tools: [{ name: 'ChatGPT' }, { name: 'Claude' }],
          icon: '🎯',
        },
        {
          number: 2,
          title: 'מחקר חכם ובניית סוכני AI',
          description:
            'בניית סוכנים חכמים המיועדים לכל מטרה אישית או מקצועית. ביצוע מחקר ואיסוף מידע לבניית בסיס ידע איכותי.',
          topics: [{ text: 'GPTs Builder' }, { text: 'AI Agents' }],
          tools: [{ name: 'GPTs Builder' }, { name: 'Perplexity' }],
          icon: '🤖',
        },
        {
          number: 3,
          title: 'סיכום פגישות, עיבוד מסמכים ויצירת מצגות',
          description:
            'למידה מעמיקה של כלים לניתוח מסמכים, תמלול וסיכום פגישות, עיבוד תוכן מורכב ובניית תובנות.',
          topics: [{ text: 'ניתוח מסמכים' }, { text: 'מצגות' }],
          tools: [{ name: 'GenSpark' }, { name: 'NotebookLM' }, { name: 'Google AI Studio' }],
          icon: '📝',
        },
        {
          number: 4,
          title: 'יצירת תמונות וסרטונים בכלים חדשניים',
          description:
            'יצירת תמונות ווידאו מקצועיים באמצעות כלי AI מתקדמים. כתיבת פרומפטים יצירתיים, עריכת תמונות קיימות.',
          topics: [{ text: 'Image Generation' }, { text: 'Video AI' }],
          tools: [{ name: 'DALL-E' }, { name: 'Midjourney' }, { name: 'Kling AI' }],
          icon: '🎨',
        },
        {
          number: 5,
          title: 'בניית דשבורדים חכמים',
          description:
            'בניית דשבורדים אינטראקטיביים לצרכים ניהוליים ועסקיים. הגדרת ויזואליזציה של נתונים, מעקב אחר KPIs.',
          topics: [{ text: 'Dashboards' }, { text: 'Data Visualization' }],
          tools: [{ name: 'Lovable' }, { name: 'Data Tools' }],
          icon: '📊',
        },
        {
          number: 6,
          title: 'אפיון עסקי, איסוף מידע ויצירת דשבורדים',
          description:
            'שיטות לאיסוף מידע איכותי ומיפוי תהליכים בארגון, זיהוי נקודות כאב וצווארי בקבוק.',
          topics: [{ text: 'Business Analysis' }, { text: 'Process Mapping' }],
          tools: [{ name: 'BPMN' }, { name: 'RACI' }],
          icon: '📋',
        },
        {
          number: 7,
          title: 'דפי נחיתה, מיילים מעוצבים ואוטומציה',
          description:
            'יסודות הפיתוח לבניית דפי נחיתה ומיילים שיווקיים מעוצבים. שימוש נכון בכותרות, טקסטים ואוטומציות.',
          topics: [{ text: 'Landing Pages' }, { text: 'Automation' }],
          tools: [{ name: 'n8n' }, { name: 'Email Tools' }],
          icon: '🌐',
        },
        {
          number: 8,
          title: 'יישום מעשי ופרויקט אישי',
          description:
            'התכלית של כל ההכשרה! יישום כל היכולות שנרכשו בפרויקט אמיתי מהארגון או מהעסק שלכם.',
          topics: [{ text: 'פרויקט גמר' }, { text: 'יישום' }],
          tools: [{ name: 'פרויקט אמיתי' }, { name: 'ליווי צמוד' }],
          icon: '🚀',
        },
      ],
      whyNow: [
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
    }

    let result
    if (existingCourses.length > 0) {
      // Update existing course
      result = await payload.update({
        collection: 'courses',
        id: existingCourses[0].id,
        data: courseData,
      })
      console.log('✅ AI Ready course updated!')
    } else {
      // Create new course
      result = await payload.create({
        collection: 'courses',
        data: courseData,
      })
      console.log('✅ AI Ready course created!')
    }

    return Response.json({
      success: true,
      message: existingCourses.length > 0 ? 'AI Ready course updated!' : 'AI Ready course created!',
      courseId: result.id,
      sections: {
        syllabus: `${courseData.syllabus.length} meetings`,
        whyNow: `${courseData.whyNow.length} cards`,
        trustBadges: `${courseData.trustBadges.length} badges`,
        pricingTracks: `${courseData.pricingTracks.length} tracks`,
      },
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
