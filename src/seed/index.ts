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

  const createdCategories: Record<string, number> = {}
  for (const category of categoriesData) {
    const created = await payload.create({
      collection: 'categories',
      data: category,
    })
    createdCategories[category.slug] = created.id as number
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
    {
      name: 'רונית שמעוני',
      role: 'בוגרת AI Ready, יועצת עסקית',
      content:
        'כיועצת עסקית, ידע ב-AI הפך לחובה. הקורס נתן לי את הכלים לייעץ ללקוחות איך להטמיע AI בעסק שלהם. זה פתח לי שוק חדש לגמרי.',
      rating: 5,
      featured: true,
      status: 'approved' as const,
    },
    {
      name: 'אלון פרידמן',
      role: 'בוגר Bot-Camp, מפתח',
      content:
        'הגעתי עם רקע בתכנות אבל בלי ניסיון ב-AI. הקורס לקח אותי לרמה אחרת לגמרי. היום אני בונה סוכני AI ללקוחות ברחבי העולם.',
      rating: 5,
      featured: false,
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
  // 4. BLOG POSTS (מאמרים)
  // ============================================
  console.log('\n📝 Creating Blog Posts...')

  const postsData = [
    {
      title: 'מדריך מלא ל-ChatGPT בעברית',
      slug: 'chatgpt-guide-hebrew',
      excerpt: 'כל מה שצריך לדעת על ChatGPT - ממתחילים ועד מתקדמים. טיפים, טריקים וטכניקות שיהפכו אתכם למומחים.',
      content: createRichText(
        'ChatGPT הוא מודל שפה מבוסס בינה מלאכותית שפותח על ידי OpenAI. המודל מסוגל לנהל שיחות טבעיות, לכתוב טקסטים, לענות על שאלות ולעזור במגוון רחב של משימות. בשנים האחרונות הפך ל-AI הנפוץ ביותר בעולם, ומשמש מיליוני אנשים מדי יום.'
      ),
      category: createdCategories['guides'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 8,
      tags: [{ tag: 'ChatGPT' }, { tag: 'מדריך' }, { tag: 'למתחילים' }],
      cta: {
        enabled: true,
        text: 'למדו ChatGPT בקורס Bot-Camp',
        url: '/courses/bot-camp',
        style: 'primary' as const,
      },
    },
    {
      title: '10 דרכים לחסוך זמן עם אוטומציה',
      slug: '10-automation-tips',
      excerpt: 'איך אוטומציה יכולה לחסוך לכם שעות עבודה בכל שבוע. טיפים מעשיים ליישום מיידי.',
      content: createRichText(
        'אוטומציה היא אחד הכלים החזקים ביותר להגדלת פרודוקטיביות. בעידן שבו הזמן הוא המשאב היקר ביותר, אוטומציה מאפשרת לכם להתמקד במה שחשוב באמת ולתת למחשב לעשות את העבודה הרפטטיבית. במאמר הזה נסקור 10 דרכים פשוטות להטמיע אוטומציה בעבודה שלכם.'
      ),
      category: createdCategories['tips'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 6,
      tags: [{ tag: 'אוטומציה' }, { tag: 'פרודוקטיביות' }, { tag: 'כלים' }],
    },
    {
      title: 'הבינה המלאכותית של 2024 - מה חדש?',
      slug: 'ai-2024-whats-new',
      excerpt: 'סקירה של החידושים המרגשים ביותר בעולם ה-AI השנה - GPT-4o, Claude 3, ועוד.',
      content: createRichText(
        '2024 הייתה שנת פריצות דרך בעולם הבינה המלאכותית. OpenAI שחררה את GPT-4o עם יכולות קוליות מתקדמות, Anthropic הציגה את Claude 3 Opus, ו-Google שדרגה את Gemini. המודלים הפכו לחכמים יותר, מהירים יותר, וזמינים יותר. בואו נסקור את ההתפתחויות המרכזיות.'
      ),
      category: createdCategories['news'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 5,
      tags: [{ tag: 'חדשות' }, { tag: '2024' }, { tag: 'טרנדים' }],
    },
    {
      title: 'Prompt Engineering - המדריך המלא',
      slug: 'prompt-engineering-guide',
      excerpt: 'למדו איך לכתוב prompts שיביאו לכם את התוצאות הטובות ביותר מ-ChatGPT ומודלי AI אחרים.',
      content: createRichText(
        'Prompt Engineering הוא האומנות והמדע של כתיבת הוראות למודלי AI בצורה שתביא לתוצאות המדויקות והשימושיות ביותר. זה לא רק לכתוב שאלה - זה לתקשר עם המודל בצורה שהוא מבין. עקרונות בסיסיים כוללים: בהירות, הקשר, דוגמאות ומבנה. במאמר הזה נלמד טכניקות מתקדמות כמו Few-Shot Learning, Chain-of-Thought ו-Role Playing.'
      ),
      category: createdCategories['guides'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 10,
      tags: [{ tag: 'Prompt Engineering' }, { tag: 'ChatGPT' }, { tag: 'טיפים' }],
      cta: {
        enabled: true,
        text: 'רוצים ללמוד יותר? הצטרפו ל-Bot-Camp',
        url: '/courses/bot-camp',
        style: 'primary' as const,
      },
    },
    {
      title: 'איך AI משנה את עולם העבודה',
      slug: 'ai-changing-work',
      excerpt: 'המשרות שמשתנות, הכישורים הנדרשים, ואיך להתכונן לעתיד שכבר כאן.',
      content: createRichText(
        'המהפכה כבר כאן. בינה מלאכותית משנה את עולם העבודה בקצב מהיר יותר מכל טכנולוגיה קודמת. חלק מהמשרות מתפתחות, חלקן נעלמות, ונוצרות משרות חדשות שלא היו קיימות לפני שנה. כמעט כל תפקיד מושפע מ-AI - מכתיבת תוכן ועד תכנות, משירות לקוחות ועד ניתוח נתונים. איך מתכוננים? לומדים לעבוד עם כלי AI, מתמקצעים בתחומים שדורשים יצירתיות, מפתחים מיומנויות רכות, ומתעדכנים כל הזמן.'
      ),
      category: createdCategories['news'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 7,
      tags: [{ tag: 'עתיד העבודה' }, { tag: 'קריירה' }, { tag: 'AI' }],
    },
    {
      title: 'סיפור הצלחה: מאפס ל-20K בחודש עם אוטומציות',
      slug: 'success-story-automation-business',
      excerpt: 'איך יוסי עבר מעבודה שכירה לעסק עצמאי מרוויח עם בניית אוטומציות ללקוחות.',
      content: createRichText(
        'יוסי הגיע לקורס Bot-Camp בלי שום ניסיון בתכנות. תוך 12 שבועות הוא למד לבנות אוטומציות מורכבות, ותוך חצי שנה פתח עסק עצמאי שמשרת עשרות לקוחות. "הקורס נתן לי לא רק את הכלים, אלא גם את הביטחון להתחיל," הוא מספר. היום יוסי מרוויח פי 3 ממה שהרוויח כשכיר, עובד מהבית, ומנהל את הזמן שלו. הסיפור שלו הוא דוגמה מצוינת לאיך הכשרה מעשית יכולה לשנות חיים.'
      ),
      category: createdCategories['success-stories'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 5,
      tags: [{ tag: 'סיפור הצלחה' }, { tag: 'בוגרים' }, { tag: 'אוטומציה' }],
    },
    {
      title: '5 כלי AI שכל בעל עסק חייב להכיר',
      slug: '5-ai-tools-for-business',
      excerpt: 'הכלים שיעזרו לכם לחסוך זמן, לשפר תהליכים ולהגדיל מכירות.',
      content: createRichText(
        'בעולם העסקי של היום, שימוש נכון בכלי AI יכול להיות ההבדל בין עסק שפורח לעסק שנשאר מאחור. הנה 5 כלים שכל בעל עסק חייב להכיר: 1. ChatGPT - לכתיבת תוכן, מיילים ומסמכים. 2. Make/Zapier - לאוטומציה של תהליכים. 3. Midjourney - ליצירת תמונות ועיצובים. 4. Notion AI - לניהול פרויקטים ומידע. 5. Otter.ai - לתמלול פגישות ושיחות. כל אחד מהכלים האלה יכול לחסוך לכם שעות בשבוע ולשפר את איכות העבודה.'
      ),
      category: createdCategories['tools'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 6,
      tags: [{ tag: 'כלים' }, { tag: 'עסקים' }, { tag: 'פרודוקטיביות' }],
    },
    {
      title: 'מה ההבדל בין ChatGPT, Claude ו-Gemini?',
      slug: 'chatgpt-vs-claude-vs-gemini',
      excerpt: 'השוואה מקיפה בין שלושת מודלי השפה המובילים - יתרונות, חסרונות ומתי להשתמש בכל אחד.',
      content: createRichText(
        'שלושת מודלי השפה המובילים בשוק הם ChatGPT של OpenAI, Claude של Anthropic, ו-Gemini של Google. לכל אחד יש יתרונות וחסרונות. ChatGPT מצוין לשיחות טבעיות וכתיבה יצירתית. Claude מוצלח במיוחד בניתוח מסמכים ארוכים ובמשימות מורכבות. Gemini משתלב מצוין עם מוצרי Google ומציע יכולות חיפוש מתקדמות. הבחירה הנכונה תלויה במשימה שלכם.'
      ),
      category: createdCategories['guides'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 8,
      tags: [{ tag: 'ChatGPT' }, { tag: 'Claude' }, { tag: 'Gemini' }, { tag: 'השוואה' }],
    },
  ]

  for (const post of postsData) {
    await payload.create({
      collection: 'posts',
      data: post,
    })
    console.log(`  ✅ Created post: ${post.title}`)
  }

  // ============================================
  // 5. COURSES (מסלולים)
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
        primaryCta: {
          text: 'לכל המסלולים',
          link: '/courses',
        },
        secondaryCta: {
          text: 'דברו איתנו',
          link: '/contact',
        },
      },
      globalStats: {
        graduates: { value: 1000, label: 'בוגרים', suffix: '+' },
        courses: { value: 50, label: 'קורסים וסדנאות', suffix: '+' },
        companies: { value: 50, label: 'ארגונים', suffix: '+' },
        satisfaction: { value: 95, label: 'שביעות רצון', suffix: '%' },
      },
      stats: [
        { number: '1000+', label: 'בוגרים' },
        { number: '50+', label: 'ארגונים' },
        { number: '8', label: 'מוסדות אקדמיים' },
        { number: '3', label: 'שנות ניסיון' },
      ],
      whyUs: [
        { icon: '🎓', title: 'ליווי אקדמי', description: 'שותפות עם אוניברסיטת חיפה והטכניון' },
        { icon: '👥', title: 'יחס אישי', description: '3 מרצים על 18 תלמידים' },
        { icon: '💼', title: 'פרקטיקה', description: 'תרגול מעשי מהיום הראשון' },
        { icon: '❤️', title: 'קהילה', description: 'קהילת בוגרים פעילה ותומכת' },
      ],
      sections: {
        programs: {
          title: 'המסלולים שלנו',
          subtitle: 'מגוון הכשרות מעשיות בתחום הבינה המלאכותית',
        },
        testimonials: {
          title: 'מה אומרים עלינו',
          subtitle: 'שמעו מהבוגרים שלנו',
        },
        team: {
          title: 'צוות המרצים',
          subtitle: 'המומחים שילוו אתכם לאורך ההכשרה',
        },
        partners: {
          title: 'שותפויות ולקוחות',
        },
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
        subtitle: 'השאירו פרטים ונחזור אליכם תוך 24 שעות',
        showForm: true,
        showWhatsapp: true,
        primaryButton: {
          text: 'שיחת ייעוץ חינם',
          link: '#contact',
        },
        secondaryButton: {
          text: 'WhatsApp',
          link: 'https://wa.me/972539466408',
        },
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
  console.log('  - 5 Testimonials (המלצות)')
  console.log('  - 8 Blog Posts (מאמרים)')
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
