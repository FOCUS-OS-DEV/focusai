import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  console.log('🌱 Checking if seed is needed...')

  const payload = await getPayload({ config })

  // Check if courses already exist
  try {
    const existingCourses = await payload.find({
      collection: 'courses',
      limit: 1,
    })

    if (existingCourses.docs.length > 0) {
      console.log('✅ Database already has content, skipping seed.')
      process.exit(0)
    }
  } catch {
    // Table doesn't exist yet - migrations haven't run
    console.log('⏳ Tables not ready yet. Seed will run after migrations on next deploy.')
    process.exit(0)
  }

  console.log('📦 Database is empty, running seed...')

  // 1. Update SiteSettings Global
  console.log('📝 Updating SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Focus AI Academy',
      siteDescription: 'מרכז ההכשרות המוביל בישראל לעולם ה-AI',
      contact: {
        email: 'office@focusai.co.il',
        phone: '054-3456789',
        whatsapp: '972543456789',
        address: 'אריה שנקר 14, הרצליה פיתוח (Nolton House)',
      },
      social: {
        facebook: 'https://facebook.com/focusai',
        instagram: 'https://instagram.com/focusai',
        linkedin: 'https://linkedin.com/company/focusai',
      },
    },
  })
  console.log('✅ SiteSettings updated')

  // 2. Update Navigation Global
  console.log('📝 Updating Navigation...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainMenu: [
        { label: 'המסלולים', url: '#programs' },
        { label: 'לוח הכשרות', url: '#schedule' },
        { label: 'מי אנחנו', url: '#about' },
        { label: 'הצוות', url: '#team' },
      ],
      ctaButton: {
        text: 'צרו קשר',
        url: '#contact',
        isVisible: true,
      },
    },
  })
  console.log('✅ Navigation updated')

  // 3. Update Homepage Global
  console.log('📝 Updating Homepage...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        title: 'Focus AI Academy',
        subtitle: 'מרכז ההכשרות המוביל בישראל לעולם ה-AI',
        primaryCta: 'לכל המסלולים',
        primaryCtaLink: '#courses',
        secondaryCta: 'צרו קשר',
        secondaryCtaLink: '#contact',
      },
      stats: [
        { number: '500+', label: 'בוגרים' },
        { number: '12', label: 'שבועות' },
        { number: '3:18', label: 'יחס מרצים' },
        { number: '100%', label: 'תעסוקה' },
      ],
      sections: {
        coursesTitle: 'המסלולים שלנו',
        blogTitle: 'חדש בבלוג',
        testimonialsTitle: 'מה אומרים עלינו',
        partnersTitle: 'שותפויות ולקוחות',
      },
    },
  })
  console.log('✅ Homepage updated')

  // 4. Create Courses
  console.log('📝 Creating courses...')

  const coursesData = [
    {
      title: 'Bot-Camp',
      slug: 'bot-camp',
      subtitle: 'הכשרת מפתחי אוטומציות וסוכני AI',
      excerpt: '12 שבועות של הכשרה מעשית לפיתוח סוכני AI ואוטומציות',
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
    },
    {
      title: 'AI Ready',
      slug: 'ai-ready',
      subtitle: '8 מפגשים מעשיים לשליטה בכלי AI',
      excerpt: 'קורס מעשי לשליטה בכלי AI מתקדמים',
      type: 'frontal' as const,
      duration: '8 מפגשים',
      schedule: 'ימי שישי 9:00-12:00',
      location: 'אריה שנקר 14, הרצליה פיתוח (Nolton House)',
      hasZoom: true,
      maxStudents: 18,
      certificate: 'תעודת Focus AI',
      status: 'published' as const,
      featured: true,
      order: 2,
    },
    {
      title: 'סדנאות לארגונים',
      slug: 'workshops',
      subtitle: 'הפכו את הארגון למעצמת AI',
      excerpt: 'סדנאות מותאמות אישית לארגונים',
      type: 'workshop' as const,
      duration: 'מותאם אישית',
      status: 'published' as const,
      featured: false,
      order: 3,
    },
    {
      title: 'ליווי אישי 1:1',
      slug: 'personal-coaching',
      subtitle: 'ליווי אישי עם המייסדים',
      excerpt: 'ליווי אישי לאנשי מקצוע ויזמים',
      type: 'coaching' as const,
      duration: 'גמיש',
      status: 'published' as const,
      featured: false,
      order: 4,
    },
  ]

  for (const courseData of coursesData) {
    const existing = await payload.find({
      collection: 'courses',
      where: { slug: { equals: courseData.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'courses',
        id: existing.docs[0].id,
        data: courseData,
      })
      console.log(`  ✅ Updated course: ${courseData.title}`)
    } else {
      await payload.create({
        collection: 'courses',
        data: courseData,
      })
      console.log(`  ✅ Created course: ${courseData.title}`)
    }
  }

  console.log('\n🎉 Seed completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
