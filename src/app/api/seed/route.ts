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

    // Create Courses
    console.log('📝 Creating courses...')
    const courses = [
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
        certificate: 'תעודה מקצועית בליווי אקדמי של היחידה ללימודי חוץ באוניברסיטת חיפה',
        status: 'published' as const,
        featured: true,
        order: 1,
      },
      {
        title: 'AI Ready',
        slug: 'ai-ready-course',
        subtitle: '8 מפגשים מעשיים לשליטה בכלי AI',
        excerpt: 'קורס מעשי לשליטה בכלי AI מתקדמים',
        type: 'frontal' as const,
        duration: '8 מפגשים',
        schedule: 'ימי שישי 9:00-12:00',
        certificate: 'תעודת Focus AI',
        status: 'published' as const,
        featured: true,
        order: 2,
      },
      {
        title: 'סדנאות לארגונים',
        slug: 'workshops',
        subtitle: 'הפכו את הארגון למעצמת AI',
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
        type: 'coaching' as const,
        duration: 'גמיש',
        status: 'published' as const,
        featured: false,
        order: 4,
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
        courses: courses.length,
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
