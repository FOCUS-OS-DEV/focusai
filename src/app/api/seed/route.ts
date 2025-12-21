import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  console.log('🌱 Seed API called')

  try {
    const payload = await getPayload({ config })

    // Check if courses already exist
    const existingCourses = await payload.find({
      collection: 'courses',
      limit: 1,
    })

    console.log(`📊 Found ${existingCourses.totalDocs} existing courses`)

    if (existingCourses.totalDocs > 0) {
      return Response.json({
        success: true,
        message: 'Database already has courses, skipping seed',
        coursesCount: existingCourses.totalDocs,
      })
    }

    console.log('📦 Running seed...')

    // 1. Create instructor
    let instructorId: number

    const existingInstructor = await payload.find({
      collection: 'users',
      where: { role: { equals: 'instructor' } },
      limit: 1,
    })

    if (existingInstructor.docs.length > 0) {
      instructorId = existingInstructor.docs[0].id as number
      console.log('✅ Found instructor:', existingInstructor.docs[0].email)
    } else {
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

    // 2. Update SiteSettings
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

    // 3. Update Navigation
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

    // 4. Create Courses
    console.log('📝 Creating courses...')
    const courses = [
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

    for (const course of courses) {
      await payload.create({
        collection: 'courses',
        data: course,
      })
      console.log(`  ✅ Created: ${course.title}`)
    }

    console.log('🎉 Seed completed!')

    return Response.json({
      success: true,
      message: 'Seed completed successfully',
      created: {
        instructor: 1,
        courses: courses.length,
        globals: ['site-settings', 'navigation'],
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
