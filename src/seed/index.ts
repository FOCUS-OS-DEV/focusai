import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

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

async function seed() {
  console.log('🌱 Starting seed process...')

  const payload = await getPayload({ config })

  // Check if content already exists
  try {
    const existingInstructors = await payload.find({
      collection: 'instructors',
      limit: 1,
    })

    if (existingInstructors.docs.length > 0) {
      console.log('✅ Database already has content, skipping seed.')
      process.exit(0)
    }
  } catch {
    console.log('⏳ Tables not ready yet. Seed will run after migrations on next deploy.')
    process.exit(0)
  }

  console.log('📦 Database is empty, running seed...\n')

  // ============================================
  // 1. INSTRUCTORS (מרצים)
  // ============================================
  console.log('👨‍🏫 Creating Instructors...')

  const instructorsData = [
    {
      name: 'אונייל סחר',
      slug: 'oneil-sahar',
      title: 'שותף מייסד, Focus AI',
      shortBio: 'מומחה לבינה מלאכותית ואוטומציות עסקיות. מלווה ארגונים בהטמעת AI ומרצה בכיר בתחום.',
      featured: true,
      order: 1,
    },
    {
      name: 'שחר דדיה',
      slug: 'shahar-dadia',
      title: 'שותף מייסד, Focus AI',
      shortBio: 'מפתח ויזם טכנולוגי. מתמחה בפיתוח סוכני AI ומערכות אוטומציה מתקדמות.',
      featured: true,
      order: 2,
    },
    {
      name: 'כפיר',
      slug: 'kfir',
      title: 'מרצה בכיר',
      shortBio: 'מומחה לאוטומציות ובניית בוטים. מלווה תלמידים מהצעד הראשון ועד לפרויקט גמר.',
      featured: true,
      order: 3,
    },
  ]

  const createdInstructors: Record<string, number> = {}
  for (const instructor of instructorsData) {
    const created = await payload.create({
      collection: 'instructors',
      data: instructor,
    })
    createdInstructors[instructor.slug] = created.id as number
    console.log(`  ✅ Created instructor: ${instructor.name}`)
  }

  // ============================================
  // 2. CATEGORIES (קטגוריות לבלוג)
  // ============================================
  console.log('\n📂 Creating Categories...')

  const categoriesData = [
    { name: 'מדריכים', slug: 'guides', color: '#8B5CF6', order: 1 },
    { name: 'חדשות AI', slug: 'news', color: '#EC4899', order: 2 },
    { name: 'טיפים וטריקים', slug: 'tips', color: '#10B981', order: 3 },
    { name: 'כלי AI', slug: 'tools', color: '#F59E0B', order: 4 },
    { name: 'סיפורי הצלחה', slug: 'success-stories', color: '#3B82F6', order: 5 },
  ]

  for (const category of categoriesData) {
    await payload.create({
      collection: 'categories',
      data: category,
    })
    console.log(`  ✅ Created category: ${category.name}`)
  }

  // ============================================
  // 3. TESTIMONIALS (המלצות)
  // ============================================
  console.log('\n💬 Creating Testimonials...')

  const testimonialsData = [
    {
      name: 'יוסי כהן',
      role: 'בוגר Bot-Camp, מנכ״ל סטארטאפ',
      content:
        'הקורס שינה לי את הקריירה. תוך 3 חודשים עברתי מאפס ידע לבניית סוכני AI מורכבים. הצוות מדהים והתמיכה לא נגמרת גם אחרי הקורס.',
      rating: 5,
      featured: true,
      status: 'approved' as const,
    },
    {
      name: 'מיכל לוי',
      role: 'בוגרת AI Ready, מנהלת שיווק',
      content:
        'סוף סוף הבנתי איך להשתמש ב-AI בצורה אמיתית בעבודה. חסכתי שעות עבודה כל יום והפכתי להיות הכוכבת של הצוות.',
      rating: 5,
      featured: true,
      status: 'approved' as const,
    },
    {
      name: 'דני אברהם',
      role: 'בוגר Bot-Camp, פרילנסר',
      content:
        'פתחתי עסק של בניית אוטומציות ללקוחות. תוך חצי שנה אני מרוויח פי 3 ממה שהרווחתי כשכיר. תודה Focus AI!',
      rating: 5,
      featured: true,
      status: 'approved' as const,
    },
  ]

  const createdTestimonials: number[] = []
  for (const testimonial of testimonialsData) {
    const created = await payload.create({
      collection: 'testimonials',
      data: testimonial,
    })
    createdTestimonials.push(created.id as number)
    console.log(`  ✅ Created testimonial: ${testimonial.name}`)
  }

  // ============================================
  // 4. COURSES (מסלולים)
  // ============================================
  console.log('\n📚 Creating Courses...')

  const coursesData = [
    {
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
      order: 1,
      instructors: Object.values(createdInstructors),
      testimonials: createdTestimonials,
      highlights: [
        { icon: 'Users', text: 'יחס חניכה צמוד - 3 מרצים על 18 תלמידים' },
        { icon: 'Zap', text: 'פרקטיקה מהיום הראשון' },
        { icon: 'Award', text: 'פרויקט גמר אמיתי' },
        { icon: 'Heart', text: 'קהילת בוגרים פעילה' },
        { icon: 'GraduationCap', text: 'תעודה בליווי אקדמי' },
      ],
      syllabus: [
        {
          weekNumber: '1-2',
          title: 'יסודות הבינה המלאכותית',
          topics: [{ topic: 'מהי בינה מלאכותית' }, { topic: 'מודלי שפה גדולים' }, { topic: 'ChatGPT ו-Claude' }],
        },
        {
          weekNumber: '3-4',
          title: 'הנדסת פרומפטים',
          topics: [{ topic: 'עקרונות כתיבת פרומפטים' }, { topic: 'טכניקות מתקדמות' }, { topic: 'בניית GPTs' }],
        },
        {
          weekNumber: '5-6',
          title: 'אוטומציות עם Make ו-n8n',
          topics: [{ topic: 'ממשק וסביבת עבודה' }, { topic: 'בניית תרחישים' }, { topic: 'אינטגרציות' }],
        },
        {
          weekNumber: '7-8',
          title: 'בניית בוטים וסוכני AI',
          topics: [{ topic: 'ארכיטקטורת סוכנים' }, { topic: 'כלים וזיכרון' }, { topic: 'RAG' }],
        },
        {
          weekNumber: '9-10',
          title: 'אינטגרציות מתקדמות',
          topics: [{ topic: 'APIs' }, { topic: 'Webhooks' }, { topic: 'WhatsApp ו-Manychat' }],
        },
        {
          weekNumber: '11-12',
          title: 'פרויקט גמר',
          topics: [{ topic: 'תכנון ואפיון' }, { topic: 'פיתוח' }, { topic: 'הצגה ומשוב' }],
        },
      ],
      faq: [
        {
          question: 'למי מתאים הקורס?',
          answer: createRichText(
            'לבעלי עסקים, יזמים, אנשי שיווק, ומי שרוצה להיכנס לעולם האוטומציות וה-AI',
          ),
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
    {
      title: 'AI Ready',
      slug: 'ai-ready',
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
    },
    {
      title: 'סדנאות AI לארגונים',
      slug: 'workshops',
      subtitle: 'סדנאות מותאמות אישית לצוותים וארגונים',
      excerpt: 'סדנאות מעשיות להטמעת AI בארגון שלכם',
      type: 'workshop' as const,
      duration: 'מותאם אישית',
      status: 'published' as const,
      featured: true,
      order: 3,
    },
    {
      title: 'ליווי אישי 1:1',
      slug: 'coaching',
      subtitle: 'מנטורינג אישי עם המייסדים',
      excerpt: 'ליווי צמוד ואישי להטמעת AI בעסק שלכם',
      type: 'coaching' as const,
      duration: 'גמיש',
      status: 'published' as const,
      featured: false,
      order: 4,
    },
  ]

  for (const course of coursesData) {
    await payload.create({
      collection: 'courses',
      data: course,
    })
    console.log(`  ✅ Created course: ${course.title}`)
  }

  // ============================================
  // 5. GLOBALS - Site Settings
  // ============================================
  console.log('\n⚙️ Updating SiteSettings...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Focus AI Academy',
      siteDescription: 'מרכז ההכשרות המוביל בישראל לעולם ה-AI',
      contact: {
        email: 'info@focusai.co.il',
        phone: '03-1234567',
        whatsapp: '972501234567',
        address: 'אריה שנקר 14, הרצליה פיתוח',
      },
      social: {
        facebook: 'https://facebook.com/focusai',
        instagram: 'https://instagram.com/focusai',
        linkedin: 'https://linkedin.com/company/focusai',
        youtube: 'https://youtube.com/@focusai',
      },
    },
  })
  console.log('  ✅ SiteSettings updated')

  // ============================================
  // 6. GLOBALS - Navigation
  // ============================================
  console.log('\n🧭 Updating Navigation...')

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainMenu: [
        { label: 'המסלולים', url: '/courses' },
        { label: 'לוח הכשרות', url: '/schedule' },
        { label: 'מי אנחנו', url: '/about' },
        { label: 'הצוות', url: '/team' },
        { label: 'בלוג', url: '/blog' },
      ],
      footerMenu: [
        { label: 'צור קשר', url: '/contact' },
        { label: 'מדיניות פרטיות', url: '/privacy' },
        { label: 'תנאי שימוש', url: '/terms' },
      ],
    },
  })
  console.log('  ✅ Navigation updated')

  // ============================================
  // 7. GLOBALS - Homepage
  // ============================================
  console.log('\n🏠 Updating Homepage...')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        title: 'Focus AI Academy',
        subtitle:
          'מרכז ההכשרות המוביל בישראל לעולם ה-AI. הכשרות מעשיות שייקחו אתכם משאלת "מה זה בכלל AI?" לשליטה מלאה בכלים - ויכולת ליישם אותם בעבודה כבר מהשבוע הראשון.',
        primaryCta: 'לכל המסלולים',
        primaryCtaLink: '/courses',
        secondaryCta: 'דברו איתנו',
        secondaryCtaLink: '/contact',
      },
      stats: [
        { number: '1000+', label: 'בוגרים' },
        { number: '50+', label: 'ארגונים' },
        { number: '8', label: 'מוסדות אקדמיים' },
        { number: '3', label: 'שנות ניסיון' },
      ],
      whyUs: [
        { icon: 'GraduationCap', title: 'ליווי אקדמי', description: 'שותפות עם אוניברסיטת חיפה והטכניון' },
        { icon: 'Users', title: 'יחס אישי', description: '3 מרצים על 18 תלמידים' },
        { icon: 'Briefcase', title: 'פרקטיקה', description: 'תרגול מעשי מהיום הראשון' },
        { icon: 'Heart', title: 'קהילה', description: 'קהילת בוגרים פעילה ותומכת' },
      ],
      sections: {
        coursesTitle: 'המסלולים שלנו',
        blogTitle: 'חדש בבלוג',
        testimonialsTitle: 'מה אומרים עלינו',
        partnersTitle: 'שותפויות ולקוחות',
      },
      newsletter: {
        title: 'הישארו מעודכנים',
        description: 'קבלו טיפים, מדריכים וחדשות על AI ישירות למייל',
      },
      bottomCta: {
        title: 'מוכנים להתחיל?',
        description: 'השאירו פרטים ונחזור אליכם תוך 24 שעות',
        showForm: true,
        showWhatsapp: true,
      },
    },
  })
  console.log('  ✅ Homepage updated')

  // ============================================
  // NOTE: Partners skipped - requires logo upload
  // ============================================
  console.log('\n⚠️ Note: Partners (שותפים) skipped - requires logo upload.')
  console.log('   Please add partners manually via Admin Panel with their logos.')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\nSummary:')
  console.log('  - 3 Instructors (מרצים)')
  console.log('  - 5 Categories (קטגוריות)')
  console.log('  - 3 Testimonials (המלצות)')
  console.log('  - 4 Courses (מסלולים)')
  console.log('  - SiteSettings Global')
  console.log('  - Navigation Global')
  console.log('  - Homepage Global')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
