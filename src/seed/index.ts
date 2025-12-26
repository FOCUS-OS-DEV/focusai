import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { instructorsData, testimonialsData, partnersData, galleryImages } from './mediaData'

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
  // 1. INSTRUCTORS (מרצים) - Using data from mediaData.ts
  // ============================================
  console.log('👨‍🏫 Creating Instructors...')

  const createdInstructors: Record<string, number> = {}
  for (const instructor of instructorsData) {
    const created = await payload.create({
      collection: 'instructors',
      data: {
        name: instructor.name,
        slug: instructor.slug,
        title: instructor.title,
        shortBio: instructor.shortBio,
        externalImageUrl: instructor.externalImageUrl,
        specialties: instructor.specialties.map((s) => ({ specialty: s })),
        order: instructor.order,
        featured: instructor.featured,
      },
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
  // 3. TESTIMONIALS (המלצות) - Using data from mediaData.ts with real photos
  // ============================================
  console.log('\n💬 Creating Testimonials...')

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
      nextCohortDate: '27.02.2026',
      trustBadges: [
        { icon: '🎓', text: '8 מפגשים' },
        { icon: '👥', text: 'קבוצות קטנות' },
        { icon: '💻', text: 'פרונטלי + זום' },
        { icon: '📜', text: 'תעודה' },
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
          description: 'מבוא מקיף לעולם ה-AI, היכרות עם מודלי שפה גדולים ויכולות הכלים המובילים. למידה מעמיקה של עקרונות חשיבה ובניית בקשות מדויקות.',
          topics: [{ text: 'מודלי שפה' }, { text: 'Prompt Engineering' }],
          tools: [{ name: 'ChatGPT' }, { name: 'Claude' }],
        },
        {
          number: 2,
          title: 'מחקר חכם ובניית סוכני AI',
          description: 'בניית סוכנים חכמים המיועדים לכל מטרה אישית או מקצועית. ביצוע מחקר ואיסוף מידע לבניית בסיס ידע איכותי.',
          topics: [{ text: 'GPTs Builder' }, { text: 'AI Agents' }],
          tools: [{ name: 'GPTs Builder' }, { name: 'Perplexity' }],
        },
        {
          number: 3,
          title: 'סיכום פגישות, עיבוד מסמכים ויצירת מצגות',
          description: 'למידה מעמיקה של כלים לניתוח מסמכים, תמלול וסיכום פגישות, עיבוד תוכן מורכב ובניית תובנות.',
          topics: [{ text: 'ניתוח מסמכים' }, { text: 'מצגות' }],
          tools: [{ name: 'GenSpark' }, { name: 'NotebookLM' }, { name: 'Google AI Studio' }],
        },
        {
          number: 4,
          title: 'יצירת תמונות וסרטונים בכלים חדשניים',
          description: 'יצירת תמונות ווידאו מקצועיים באמצעות כלי AI מתקדמים. כתיבת פרומפטים יצירתיים, עריכת תמונות קיימות.',
          topics: [{ text: 'Image Generation' }, { text: 'Video AI' }],
          tools: [{ name: 'DALL-E' }, { name: 'Midjourney' }, { name: 'Kling AI' }],
        },
        {
          number: 5,
          title: 'בניית דשבורדים חכמים',
          description: 'בניית דשבורדים אינטראקטיביים לצרכים ניהוליים ועסקיים. הגדרת ויזואליזציה של נתונים, מעקב אחר KPIs.',
          topics: [{ text: 'Dashboards' }, { text: 'Data Visualization' }],
          tools: [{ name: 'Lovable' }, { name: 'Data Tools' }],
        },
        {
          number: 6,
          title: 'אפיון עסקי, איסוף מידע ויצירת דשבורדים',
          description: 'שיטות לאיסוף מידע איכותי ומיפוי תהליכים בארגון, זיהוי נקודות כאב וצווארי בקבוק.',
          topics: [{ text: 'Business Analysis' }, { text: 'Process Mapping' }],
          tools: [{ name: 'BPMN' }, { name: 'RACI' }],
        },
        {
          number: 7,
          title: 'דפי נחיתה, מיילים מעוצבים ואוטומציה',
          description: 'יסודות הפיתוח לבניית דפי נחיתה ומיילים שיווקיים מעוצבים. שימוש נכון בכותרות, טקסטים ואוטומציות.',
          topics: [{ text: 'Landing Pages' }, { text: 'Automation' }],
          tools: [{ name: 'n8n' }, { name: 'Email Tools' }],
        },
        {
          number: 8,
          title: 'יישום מעשי ופרויקט אישי',
          description: 'התכלית של כל ההכשרה! יישום כל היכולות שנרכשו בפרויקט אמיתי מהארגון או מהעסק שלכם.',
          topics: [{ text: 'פרויקט גמר' }, { text: 'יישום' }],
          tools: [{ name: 'פרויקט אמיתי' }, { name: 'ליווי צמוד' }],
        },
      ],
      whyNow: [
        {
          icon: '📉',
          title: 'פער משמעותי בשוק העבודה',
          description: 'ארגונים מפטרים עובדים שלא יודעים לעבוד עם AI ומחפשים מועמדים שמבינים איך ליישם את הכלים האלה בפועל.',
        },
        {
          icon: '📈',
          title: 'ROI מהשבוע הראשון',
          description: 'שימוש נכון בכלי AI מניב תוצאות כבר מהשבוע הראשון - חיסכון משמעותי בשעות עבודה, דיוק גבוה יותר במשימות.',
        },
        {
          icon: '🏢',
          title: 'אימוץ מהיר בארגונים',
          description: 'ארגונים בכל הגדלים מטמיעים כלי AI לשיפור יעילות ותקשורת. מי שיודע להוביל את השינוי הזה - מקבל יתרון משמעותי.',
        },
        {
          icon: '🚀',
          title: 'העתיד כבר כאן',
          description: 'הביקוש למיומנויות AI רק ימשיך לצמוח בשנים הקרובות. להתחיל עכשיו זה לא "להיות מוקדם" - זה להיות בזמן.',
        },
      ],
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
  // 8. PARTNERS (שותפים) - Using data from mediaData.ts with real logos
  // ============================================
  console.log('\n🤝 Creating Partners...')

  for (const partner of partnersData) {
    await payload.create({
      collection: 'partners',
      data: partner,
    })
    console.log(`  ✅ Created partner: ${partner.name}`)
  }

  // NOTE: AI Ready syllabus, whyNow, trustBadges, pricingTracks are now seeded
  // directly in the AI Ready course above (Single Source of Truth!)

  console.log('\n🎉 Seed completed successfully!')
  console.log('\nSummary:')
  console.log(`  - ${instructorsData.length} Instructors (מרצים) with photos`)
  console.log('  - 5 Categories (קטגוריות)')
  console.log(`  - ${testimonialsData.length} Testimonials (המלצות) with photos`)
  console.log('  - 8 Blog Posts (מאמרים)')
  console.log('  - 4 Courses (מסלולים) - includes AI Ready with full syllabus & whyNow')
  console.log(`  - ${partnersData.length} Partners (שותפים) with logos`)
  console.log('  - SiteSettings Global')
  console.log('  - Navigation Global')
  console.log('  - Homepage Global')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
