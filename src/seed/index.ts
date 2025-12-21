import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  console.log('🌱 Checking if seed is needed...')

  const payload = await getPayload({ config })

  // Check if courses already exist
  const existingCourses = await payload.find({
    collection: 'courses',
    limit: 1,
  })

  if (existingCourses.docs.length > 0) {
    console.log('✅ Database already has content, skipping seed.')
    process.exit(0)
  }

  console.log('📦 Database is empty, running seed...')

  // 1. Create or find an instructor user for courses
  let instructorId: number

  const existingInstructor = await payload.find({
    collection: 'users',
    where: {
      role: { equals: 'instructor' },
    },
    limit: 1,
  })

  if (existingInstructor.docs.length > 0) {
    instructorId = existingInstructor.docs[0].id as number
    console.log('✅ Found existing instructor:', existingInstructor.docs[0].email)
  } else {
    // Create instructor
    const instructor = await payload.create({
      collection: 'users',
      data: {
        email: 'instructor@focusai.co.il',
        password: 'instructor123!',
        role: 'instructor',
      },
    })
    instructorId = instructor.id as number
    console.log('✅ Created instructor:', instructor.email)
  }

  // 2. Update SiteSettings Global
  console.log('📝 Updating SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Focus AI Academy',
      contact: {
        email: 'office@focusai.co.il',
        phone: '054-3456789',
        whatsapp: '972543456789',
      },
      social: {
        facebook: 'https://facebook.com/focusai',
        instagram: 'https://instagram.com/focusai',
        linkedin: 'https://linkedin.com/company/focusai',
      },
      seo: {
        defaultTitle: 'Focus AI Academy - מרכז ההכשרות המוביל בישראל',
        titleSuffix: ' | Focus AI',
      },
    },
  })
  console.log('✅ SiteSettings updated')

  // 3. Update Navigation Global
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

  // 4. Create Courses
  console.log('📝 Creating courses...')

  const coursesData = [
    {
      title: 'Bot-Camp',
      slug: 'bot-camp',
      shortDescription: 'הכשרת מפתחי אוטומציות וסוכני AI',
      price: 5900,
      level: 'beginner' as const,
      category: 'development' as const,
      status: 'published' as const,
      featured: true,
      instructor: instructorId,
    },
    {
      title: 'AI Ready',
      slug: 'ai-ready',
      shortDescription: '8 מפגשים מעשיים לשליטה בכלי AI',
      price: 2900,
      level: 'beginner' as const,
      category: 'other' as const,
      status: 'published' as const,
      featured: true,
      instructor: instructorId,
    },
    {
      title: 'ליווי אישי 1:1',
      slug: 'personal-coaching',
      shortDescription: 'ליווי אישי עם המייסדים',
      price: 3500,
      level: 'intermediate' as const,
      category: 'business' as const,
      status: 'published' as const,
      featured: false,
      instructor: instructorId,
    },
    {
      title: 'סדנאות והרצאות AI לארגונים',
      slug: 'workshops',
      shortDescription: 'הפכו את הארגון למעצמת AI',
      price: 0,
      level: 'beginner' as const,
      category: 'other' as const,
      status: 'published' as const,
      featured: false,
      instructor: instructorId,
    },
  ]

  for (const courseData of coursesData) {
    // Check if course already exists
    const existing = await payload.find({
      collection: 'courses',
      where: {
        slug: { equals: courseData.slug },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Update existing course
      await payload.update({
        collection: 'courses',
        id: existing.docs[0].id,
        data: courseData,
      })
      console.log(`  ✅ Updated course: ${courseData.title}`)
    } else {
      // Create new course
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
