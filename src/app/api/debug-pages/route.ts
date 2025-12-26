import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Debug endpoint to check AI Ready data
 *
 * NOTE: AI Ready data is now in Course collection (Single Source of Truth!)
 * This endpoint shows both the Course data and any remaining Pages global data
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Check the Course collection (Single Source of Truth!)
    const { docs: courses } = await payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: 'ai-ready-course',
        },
      },
      depth: 1,
    })

    const course = courses[0]

    // Also check Pages global for comparison
    const pagesGlobal = await payload.findGlobal({
      slug: 'pages',
      depth: 1,
    })

    const aiReadyData = pagesGlobal?.aiReady

    return NextResponse.json({
      success: true,
      // Course data (Single Source of Truth!)
      course: {
        found: !!course,
        id: course?.id,
        title: course?.title,
        syllabusCount: course?.syllabus?.length || 0,
        whyNowCount: course?.whyNow?.length || 0,
        trustBadgesCount: course?.trustBadges?.length || 0,
        pricingTracksCount: course?.pricingTracks?.length || 0,
        nextCohortDate: course?.nextCohortDate,
        sampleMeeting: course?.syllabus?.[0],
        sampleWhyNow: course?.whyNow?.[0],
      },
      // Pages global (for comparison - should be minimal)
      pages: {
        aiReadyKeys: aiReadyData ? Object.keys(aiReadyData) : [],
        heroTitle: aiReadyData?.hero?.title,
        note: 'Syllabus and WhyNow moved to Course collection',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
