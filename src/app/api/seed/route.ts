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

    // 1. Find or create instructor
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
      // Try to find any user to use as instructor
      const anyUser = await payload.find({
        collection: 'users',
        limit: 1,
      })

      if (anyUser.docs.length > 0) {
        instructorId = anyUser.docs[0].id as number
        console.log('✅ Using existing user as instructor:', anyUser.docs[0].email)
      } else {
        // Create instructor user
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
    }

    // 2. Create Courses (skip globals for now)
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
