import { getPayload } from 'payload'
import config from '@payload-config'

// Helper to create simple Lexical richText content
function createRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          direction: 'rtl' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'rtl' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export async function GET(request: Request) {
  console.log('🌱 Seed API called')

  // Check for force parameter to allow re-seeding
  const url = new URL(request.url)
  const force = url.searchParams.get('force') === 'true'

  try {
    const payload = await getPayload({ config })

    // Check if courses already exist
    const existingCourses = await payload.find({
      collection: 'courses',
      limit: 1,
    })

    console.log(`📊 Found ${existingCourses.totalDocs} existing courses`)

    if (existingCourses.totalDocs > 0 && !force) {
      return Response.json({
        success: true,
        message: 'Database already has courses, skipping seed. Add ?force=true to reseed.',
        coursesCount: existingCourses.totalDocs,
      })
    }

    // If forcing, delete existing courses first
    if (force && existingCourses.totalDocs > 0) {
      console.log('🗑️ Force mode: deleting existing courses...')
      await payload.delete({
        collection: 'courses',
        where: {},
      })
    }

    console.log('📦 Running seed...')

    // ============================================
    // 1. INSTRUCTORS
    // ============================================
    console.log('👨‍🏫 Creating/updating Instructors...')

    const instructorsData = [
      {
        name: 'אוניל סחר',
        slug: 'oniel-sahar',
        title: 'מייסד ומנכ"ל משותף',
        shortBio:
          'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים ועשרות סניפים בפריסה ארצית.',
        externalImageUrl: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
        specialties: [{ specialty: 'ניהול עסקי' }, { specialty: 'אסטרטגיה דיגיטלית' }, { specialty: 'AI לעסקים' }],
        order: 1,
        featured: true,
      },
      {
        name: 'שחר דדיה, עו"ד',
        slug: 'shahar-dadia',
        title: 'מייסד ומנכ"ל משותף',
        shortBio:
          'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים נרחבים בארץ ובעולם.',
        externalImageUrl: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
        specialties: [{ specialty: 'אוטומציה עסקית' }, { specialty: 'סוכני AI' }, { specialty: 'משפט וטכנולוגיה' }],
        order: 2,
        featured: true,
      },
      {
        name: 'כפיר קורן',
        slug: 'kfir-koren',
        title: 'מתכנת ומפתח מערכות',
        shortBio:
          'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית.',
        externalImageUrl:
          'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
        specialties: [{ specialty: 'פיתוח AI' }, { specialty: 'אוטומציה' }, { specialty: 'מערכות חכמות' }],
        order: 3,
        featured: true,
      },
    ]

    const createdInstructors: number[] = []
    for (const instructor of instructorsData) {
      // Check if instructor exists
      const existing = await payload.find({
        collection: 'instructors',
        where: { slug: { equals: instructor.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        createdInstructors.push(existing.docs[0].id as number)
        console.log(`  ⏭️ Instructor exists: ${instructor.name}`)
      } else {
        const created = await payload.create({
          collection: 'instructors',
          data: instructor,
        })
        createdInstructors.push(created.id as number)
        console.log(`  ✅ Created instructor: ${instructor.name}`)
      }
    }

    // ============================================
    // 2. TESTIMONIALS
    // ============================================
    console.log('💬 Creating/updating Testimonials...')

    const testimonialsData = [
      {
        name: 'להב דור',
        role: 'בוגר הכשרה',
        content:
          'תודה רבה לכל החבר\'ה המדהימים על שבוע מעניין ומאתגר. תודה מיוחדת לאוניל, שחר וכפיר על הובלה דינמית, הקניית כלים וערכים לעתיד ושיתוף הידע.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
      {
        name: 'בני מוזס',
        role: 'בוגר הכשרה',
        content:
          'הדבר שהכי עוזר לי בלמידה בקורס הוא התמיכה האישית מהמרצים, ההסברים הברורים והיכולת להתנסות במערכת תוך כדי הלמידה.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/5_iudgl3.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
      {
        name: 'חגית הלמר הרמן',
        role: 'מנהלת המרכז לפיתוח קריירה, אוניברסיטת חיפה',
        content:
          'החוויה שלנו בעבודה עם צוות Focus הייתה מדהימה. ההכשרה הועברה בצורה מקצועית וברורה, והסטודנטים קיבלו מענה מיידי ומקיף לכל הצרכים.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/3_d351xk.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
      {
        name: 'רימא חלאילה',
        role: 'בוגרת הכשרה',
        content:
          'השיעור הראשון היום היה ממש מעניין! פיתחתי סוכן קטן שייעץ בנושא כושר ותזונה וחייבת לכתוב לכם שזה באמת היה מגניב.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/1_d3qx5v.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
      {
        name: 'סאוסן פרעוני',
        role: 'בוגרת הכשרה',
        content:
          'הייתה חוויה נעימה מאוד, נהניתי מהשילוב בין התיאוריה לפרקטיקה ומהאווירה החיובית של הקבוצה.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/6_mngwf3.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
      {
        name: 'אריס חנא',
        role: 'בוגרת הכשרה',
        content:
          'תודה רבה לכם ולכל הקבוצה! באמת אתם מסבירים מהלב, בסבלנות ובצורה שממש נותנת ביטחון ללמוד.',
        externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_ytkcuf.jpg',
        rating: 5,
        featured: true,
        status: 'approved' as const,
      },
    ]

    const createdTestimonials: number[] = []
    for (const testimonial of testimonialsData) {
      // Check if testimonial exists by name
      const existing = await payload.find({
        collection: 'testimonials',
        where: { name: { equals: testimonial.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        createdTestimonials.push(existing.docs[0].id as number)
        console.log(`  ⏭️ Testimonial exists: ${testimonial.name}`)
      } else {
        const created = await payload.create({
          collection: 'testimonials',
          data: testimonial,
        })
        createdTestimonials.push(created.id as number)
        console.log(`  ✅ Created testimonial: ${testimonial.name}`)
      }
    }

    // ============================================
    // 3. COURSES - Complete Data
    // ============================================
    console.log('📚 Creating Courses with complete data...')

    // AI Ready Course - Complete with all data
    const aiReadyCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'AI Ready',
        slug: 'ai-ready-course',
        subtitle: 'הכשרה יישומית לכלי AI מתקדמים למנהלים',
        excerpt: '8 מפגשים מעשיים שיעניקו לך את הכלים ליצור אוטומציות AI, צ\'טבוטים, דפי נחיתה ועוד',
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
        order: 1,
        nextCohortDate: '27.02.2026',
        instructors: createdInstructors,
        testimonials: createdTestimonials,

        // Cohorts - Structured schedule/pricing data
        cohorts: [
          {
            startDate: '2026-02-27',
            endDate: '2026-04-17',
            format: 'in-person' as const,
            dayOfWeek: 'friday' as const,
            startTime: '09:00',
            endTime: '12:00',
            location: 'הרצליה פיתוח - Nolton House',
            price: 4900,
            originalPrice: 5900,
            priceNote: 'מחיר early bird',
            maxStudents: 20,
            availableSeats: 15,
            registrationOpen: true,
          },
          {
            startDate: '2026-02-27',
            endDate: '2026-04-17',
            format: 'online' as const,
            dayOfWeek: 'friday' as const,
            startTime: '09:00',
            endTime: '12:00',
            location: 'Zoom',
            price: 2490,
            originalPrice: 3900,
            priceNote: 'מחיר השקה',
            maxStudents: 50,
            availableSeats: 35,
            registrationOpen: true,
          },
        ],

        // Trust Badges
        trustBadges: [
          { icon: '🎓', text: '8 מפגשים' },
          { icon: '👥', text: 'קבוצות קטנות' },
          { icon: '💻', text: 'פרונטלי + זום' },
          { icon: '📜', text: 'תעודה' },
        ],

        // Pricing Tracks
        pricingTracks: [
          {
            name: 'מסלול פרונטלי',
            schedule: 'הרצליה פיתוח | ימי שישי | 9:00-12:00',
            price: 4900,
            originalPrice: 5900,
            priceNote: 'מחיר early bird',
            features: [
              { text: '8 מפגשים פרונטליים בני 3 שעות' },
              { text: 'גישה מלאה למערכת הלמידה' },
              { text: 'חומרי לימוד דיגיטליים' },
              { text: 'תמיכה בוואטסאפ' },
            ],
          },
          {
            name: 'מסלול Zoom',
            schedule: 'אונליין | ימי שישי | 9:00-12:00',
            price: 2490,
            originalPrice: 3900,
            priceNote: 'מחיר השקה',
            features: [
              { text: '8 מפגשים בזום בני 2 שעות' },
              { text: 'הקלטות של כל המפגשים' },
              { text: 'גישה למערכת הלמידה' },
              { text: 'תמיכה בוואטסאפ' },
            ],
          },
        ],

        // Why Now Cards
        whyNow: [
          {
            icon: '🚀',
            title: 'שוק העבודה משתנה',
            description: 'יותר ויותר חברות דורשות ידע ב-AI. מי שלא ידע - נשאר מאחור.',
          },
          {
            icon: '💡',
            title: 'הזדמנות להתקדם',
            description: 'מי שמבין AI יכול להגדיל פרודוקטיביות פי 10 ולהוביל בארגון.',
          },
          {
            icon: '⚡',
            title: 'טכנולוגיה זמינה',
            description: 'הכלים פה, זמינים לכולם. רק צריך לדעת איך להשתמש.',
          },
          {
            icon: '🎯',
            title: 'תיק עבודות מעשי',
            description: 'תצא עם פרויקטים אמיתיים שאפשר להציג למעסיקים.',
          },
        ],

        // Syllabus - 8 Meetings
        syllabus: [
          {
            number: 1,
            title: 'היכרות ויסודות AI',
            description: 'מבוא מעמיק לעולם הבינה המלאכותית והכלים המרכזיים',
            topics: [
              { text: 'מהי בינה מלאכותית ואיך היא משנה את עולם העבודה' },
              { text: 'היכרות עם ChatGPT, Claude, Perplexity' },
              { text: 'עקרונות בסיסיים לעבודה עם AI' },
            ],
            tools: [
              { name: 'ChatGPT' },
              { name: 'Claude' },
              { name: 'Perplexity' },
            ],
            icon: '🎯',
          },
          {
            number: 2,
            title: 'ניהול פרויקטים והגדלת יעילות',
            description: 'כלי AI לניהול פרויקטים, משימות וצוותים',
            topics: [
              { text: 'ניהול משימות ופרויקטים עם AI' },
              { text: 'אוטומציה של תהליכי עבודה' },
              { text: 'שיפור פרודוקטיביות יומית' },
            ],
            tools: [
              { name: 'Notion AI' },
              { name: 'ClickUp' },
            ],
            icon: '📋',
          },
          {
            number: 3,
            title: 'יצירת תוכן ועיצוב',
            description: 'כלי AI ליצירת תמונות, וידאו ותוכן שיווקי',
            topics: [
              { text: 'יצירת תמונות עם Midjourney ו-DALL-E' },
              { text: 'עריכת וידאו עם AI' },
              { text: 'כתיבת תוכן שיווקי' },
            ],
            tools: [
              { name: 'Midjourney' },
              { name: 'DALL-E' },
              { name: 'Canva AI' },
            ],
            icon: '🎨',
          },
          {
            number: 4,
            title: 'אוטומציות ואינטגרציות',
            description: 'בניית אוטומציות ללא קוד עם Make ו-n8n',
            topics: [
              { text: 'מבוא לאוטומציות עסקיות' },
              { text: 'חיבור בין מערכות' },
              { text: 'בניית תהליכים אוטומטיים' },
            ],
            tools: [
              { name: 'Make' },
              { name: 'n8n' },
              { name: 'Zapier' },
            ],
            icon: '⚡',
          },
          {
            number: 5,
            title: 'בניית GPTs וסוכנים',
            description: 'יצירת סוכני AI מותאמים אישית',
            topics: [
              { text: 'בניית GPT מותאם אישית' },
              { text: 'הגדרת הוראות ומאפיינים' },
              { text: 'שילוב ידע ומסמכים' },
            ],
            tools: [
              { name: 'GPTs Builder' },
              { name: 'Claude Projects' },
            ],
            icon: '🤖',
          },
          {
            number: 6,
            title: 'ניתוח נתונים ודשבורדים',
            description: 'שימוש ב-AI לניתוח נתונים ובניית דשבורדים',
            topics: [
              { text: 'ניתוח נתונים עם AI' },
              { text: 'יצירת דשבורדים אינטראקטיביים' },
              { text: 'הצגת מידע ויזואלית' },
            ],
            tools: [
              { name: 'ChatGPT Data Analysis' },
              { name: 'Lovable' },
            ],
            icon: '📊',
          },
          {
            number: 7,
            title: 'דפי נחיתה ואתרים',
            description: 'בניית דפי נחיתה ואתרים עם AI',
            topics: [
              { text: 'בניית דף נחיתה בשעה' },
              { text: 'עיצוב ו-UX עם AI' },
              { text: 'אופטימיזציה להמרות' },
            ],
            tools: [
              { name: 'v0.dev' },
              { name: 'Lovable' },
              { name: 'Framer' },
            ],
            icon: '🌐',
          },
          {
            number: 8,
            title: 'פרויקט גמר',
            description: 'יישום כל הנלמד בפרויקט אמיתי',
            topics: [
              { text: 'תכנון ואפיון פרויקט' },
              { text: 'פיתוח ובניה' },
              { text: 'הצגה ומשוב' },
            ],
            tools: [
              { name: 'פרויקט אמיתי' },
              { name: 'ליווי צמוד' },
            ],
            icon: '🎓',
          },
        ],

        // FAQ
        faq: [
          {
            question: 'למי מתאים הקורס?',
            answer: createRichText('לבעלי עסקים, יזמים, מנהלים, ואנשי מקצוע שרוצים להטמיע AI בעבודה היומית. לא נדרש ניסיון טכני קודם.'),
          },
          {
            question: 'האם צריך ניסיון קודם בתכנות?',
            answer: createRichText('לא! הקורס מיועד לאנשים ללא רקע טכני. כל הכלים שנלמד הם No-Code ונגישים לכולם.'),
          },
          {
            question: 'מה ההבדל בין המסלולים?',
            answer: createRichText('המסלול הפרונטלי כולל מפגשים פנים אל פנים בהרצליה פיתוח עם אינטראקציה ישירה. מסלול הזום מאפשר למידה מהבית עם הקלטות של כל המפגשים.'),
          },
          {
            question: 'האם יש תעודה בסוף?',
            answer: createRichText('כן! בסיום הקורס תקבלו תעודת Focus AI Academy המעידה על השלמת ההכשרה.'),
          },
        ],

        // Highlights
        highlights: [
          { icon: 'Users', text: 'קבוצות קטנות - יחס אישי' },
          { icon: 'Zap', text: 'פרקטיקה מהיום הראשון' },
          { icon: 'Award', text: 'פרויקט גמר אמיתי' },
          { icon: 'Heart', text: 'קהילת בוגרים פעילה' },
          { icon: 'GraduationCap', text: 'תעודה מקצועית' },
        ],
      },
    })
    console.log(`  ✅ Created: AI Ready (complete)`)

    // Bot-Camp Course
    const botCampCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Bot-Camp',
        slug: 'bot-camp',
        subtitle: 'הכשרת מפתחי אוטומציות וסוכני AI',
        excerpt: 'הכשרה מקיפה בת 12 שבועות שתהפוך אתכם למומחי אוטומציה ובניית סוכני AI',
        type: 'frontal' as const,
        duration: '12 שבועות',
        schedule: 'ימי שני 17:00-21:00',
        location: 'אריה שנקר 14, הרצליה פיתוח (Nolton House)',
        hasZoom: true,
        maxStudents: 18,
        instructorRatio: '3 מרצים על 18 תלמידים',
        certificate: 'תעודה מקצועית בליווי אקדמי של היחידה ללימודי חוץ באוניברסיטת חיפה',
        status: 'published' as const,
        featured: true,
        order: 2,
        instructors: createdInstructors,
        testimonials: createdTestimonials,

        // Cohorts - Bot-Camp schedule
        cohorts: [
          {
            startDate: '2026-03-02',
            endDate: '2026-05-25',
            format: 'hybrid' as const,
            dayOfWeek: 'monday' as const,
            startTime: '17:00',
            endTime: '21:00',
            location: 'הרצליה פיתוח - Nolton House + Zoom',
            price: 12900,
            originalPrice: 14900,
            priceNote: 'מחיר early bird',
            maxStudents: 18,
            availableSeats: 12,
            registrationOpen: true,
          },
        ],

        highlights: [
          { icon: 'Users', text: 'יחס חניכה צמוד - 3 מרצים על 18 תלמידים' },
          { icon: 'Zap', text: 'פרקטיקה מהיום הראשון' },
          { icon: 'Award', text: 'פרויקט גמר אמיתי' },
          { icon: 'Heart', text: 'קהילת בוגרים פעילה' },
          { icon: 'GraduationCap', text: 'תעודה בליווי אקדמי' },
        ],

        syllabus: [
          {
            number: 1,
            title: 'יסודות הבינה המלאכותית (שבועות 1-2)',
            description: 'מבוא מקיף לעולם ה-AI, היכרות עם מודלי שפה גדולים ויכולות הכלים המובילים.',
            topics: [{ text: 'מהי בינה מלאכותית' }, { text: 'מודלי שפה גדולים' }, { text: 'ChatGPT ו-Claude' }],
            tools: [{ name: 'ChatGPT' }, { name: 'Claude' }],
          },
          {
            number: 2,
            title: 'הנדסת פרומפטים (שבועות 3-4)',
            description: 'למידה מעמיקה של עקרונות חשיבה ובניית בקשות מדויקות למודלי AI.',
            topics: [{ text: 'עקרונות כתיבת פרומפטים' }, { text: 'טכניקות מתקדמות' }, { text: 'בניית GPTs' }],
            tools: [{ name: 'GPTs Builder' }, { name: 'Prompt Engineering' }],
          },
          {
            number: 3,
            title: 'אוטומציות עם Make ו-n8n (שבועות 5-6)',
            description: 'בניית אוטומציות מורכבות עם פלטפורמות No-Code מובילות.',
            topics: [{ text: 'ממשק וסביבת עבודה' }, { text: 'בניית תרחישים' }, { text: 'אינטגרציות' }],
            tools: [{ name: 'Make' }, { name: 'n8n' }],
          },
          {
            number: 4,
            title: 'בניית בוטים וסוכני AI (שבועות 7-8)',
            description: 'בניית סוכנים חכמים המיועדים לכל מטרה אישית או מקצועית.',
            topics: [{ text: 'ארכיטקטורת סוכנים' }, { text: 'כלים וזיכרון' }, { text: 'RAG' }],
            tools: [{ name: 'AI Agents' }, { name: 'RAG' }],
          },
          {
            number: 5,
            title: 'אינטגרציות מתקדמות (שבועות 9-10)',
            description: 'חיבור מערכות חיצוניות והטמעת AI בתהליכים עסקיים.',
            topics: [{ text: 'APIs' }, { text: 'Webhooks' }, { text: 'WhatsApp ו-Manychat' }],
            tools: [{ name: 'APIs' }, { name: 'WhatsApp' }, { name: 'Manychat' }],
          },
          {
            number: 6,
            title: 'פרויקט גמר (שבועות 11-12)',
            description: 'יישום כל היכולות שנרכשו בפרויקט אמיתי מהעסק או הארגון שלכם.',
            topics: [{ text: 'תכנון ואפיון' }, { text: 'פיתוח' }, { text: 'הצגה ומשוב' }],
            tools: [{ name: 'פרויקט אמיתי' }, { name: 'ליווי צמוד' }],
          },
        ],

        faq: [
          {
            question: 'למי מתאים הקורס?',
            answer: createRichText('לבעלי עסקים, יזמים, אנשי שיווק, ומי שרוצה להיכנס לעולם האוטומציות וה-AI'),
          },
          {
            question: 'האם צריך ניסיון קודם?',
            answer: createRichText('לא נדרש ניסיון בתכנות. נדרשת הבנה בסיסית של עבודה עם מחשב'),
          },
          {
            question: 'האם יש אפשרות זום?',
            answer: createRichText('כן, כל השיעורים משודרים גם בזום לייב ומוקלטים'),
          },
        ],
      },
    })
    console.log(`  ✅ Created: Bot-Camp`)

    // Workshops Course
    const workshopsCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'סדנאות AI לארגונים',
        slug: 'workshops',
        subtitle: 'סדנאות מותאמות אישית לצוותים וארגונים',
        excerpt: 'סדנאות מעשיות להטמעת AI בארגון שלכם - מאפיון ועד הטמעה',
        type: 'workshop' as const,
        duration: 'מותאם אישית',
        status: 'published' as const,
        featured: true,
        order: 3,
        instructors: createdInstructors,

        highlights: [
          { icon: 'Building', text: 'מותאם לארגון שלכם' },
          { icon: 'Users', text: 'לצוותים בכל גודל' },
          { icon: 'Target', text: 'יעדים מדידים' },
        ],
      },
    })
    console.log(`  ✅ Created: Workshops`)

    // Coaching Course
    const coachingCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'ליווי אישי 1:1',
        slug: 'coaching',
        subtitle: 'מנטורינג אישי עם המייסדים',
        excerpt: 'ליווי צמוד ואישי להטמעת AI בעסק שלכם',
        type: 'coaching' as const,
        duration: 'גמיש',
        status: 'published' as const,
        featured: true,
        order: 4,
        instructors: createdInstructors.slice(0, 2), // Only founders

        highlights: [
          { icon: 'User', text: 'ליווי אישי' },
          { icon: 'Clock', text: 'גמישות מלאה' },
          { icon: 'Rocket', text: 'תוצאות מהירות' },
        ],
      },
    })
    console.log(`  ✅ Created: Coaching`)

    console.log('🎉 Seed completed!')

    return Response.json({
      success: true,
      message: 'Seed completed successfully',
      created: {
        instructors: createdInstructors.length,
        testimonials: createdTestimonials.length,
        courses: 4,
      },
    })
  } catch (error) {
    console.error('❌ Seed error:', error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
