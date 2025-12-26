import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Migrate AI Ready data from Pages global to Course collection
 *
 * This endpoint:
 * 1. Reads syllabus, whyNow, trustBadges, pricing from Pages.aiReady
 * 2. Updates the AI Ready course with this data
 * 3. Creates the course if it doesn't exist
 *
 * GET /api/migrate-ai-ready
 */
export async function GET() {
  const results: Record<string, unknown> = {}

  try {
    const payload = await getPayload({ config })

    // Step 1: Get data from Pages global
    const pagesGlobal = await payload.findGlobal({
      slug: 'pages',
      depth: 0,
    })

    const aiReadyData = pagesGlobal?.aiReady as {
      syllabus?: {
        meetings?: Array<{
          number: number
          title: string
          description: string
          topics?: Array<{ text?: string }>
          tools?: Array<{ name?: string }>
          icon?: string
        }>
      }
      whyNow?: {
        cards?: Array<{
          icon?: string
          title: string
          description: string
        }>
      }
      trustBadges?: Array<{
        icon?: string
        text: string
      }>
      pricing?: {
        nextCohortDate?: string
        frontalTrack?: {
          title?: string
          schedule?: string
          price?: string
          originalPrice?: string
          priceNote?: string
        }
        zoomTrack?: {
          title?: string
          schedule?: string
          price?: string
          originalPrice?: string
          priceNote?: string
        }
      }
    } | undefined

    if (!aiReadyData) {
      return NextResponse.json({
        success: false,
        message: 'No aiReady data found in Pages global',
      })
    }

    results.pagesData = {
      hasSyllabus: !!aiReadyData.syllabus?.meetings?.length,
      syllabusCount: aiReadyData.syllabus?.meetings?.length || 0,
      hasWhyNow: !!aiReadyData.whyNow?.cards?.length,
      whyNowCount: aiReadyData.whyNow?.cards?.length || 0,
      hasTrustBadges: !!aiReadyData.trustBadges?.length,
      trustBadgesCount: aiReadyData.trustBadges?.length || 0,
      hasPricing: !!aiReadyData.pricing,
    }

    // Step 2: Find or create AI Ready course
    const { docs: courses } = await payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: 'ai-ready-course',
        },
      },
    })

    let course = courses[0]

    if (!course) {
      // Create the course if it doesn't exist
      course = await payload.create({
        collection: 'courses',
        data: {
          title: 'AI Ready',
          slug: 'ai-ready-course',
          subtitle: '8 מפגשים מעשיים לשליטה בכלי AI',
          type: 'frontal',
          duration: '8 מפגשים',
          schedule: 'ימי שישי 9:00-12:00',
          certificate: 'תעודת Focus AI',
          status: 'published',
          featured: true,
          order: 2,
        },
      })
      results.courseCreated = true
    }

    results.courseId = course.id
    results.courseSlug = course.slug

    // Step 3: Prepare data for update
    const updateData: Record<string, unknown> = {}

    // Migrate syllabus
    if (aiReadyData.syllabus?.meetings?.length) {
      updateData.syllabus = aiReadyData.syllabus.meetings.map((meeting) => ({
        number: meeting.number,
        title: meeting.title,
        description: meeting.description,
        topics: meeting.topics?.map((t) => ({ text: t.text })) || [],
        tools: meeting.tools?.map((t) => ({ name: t.name })) || [],
        icon: meeting.icon,
      }))
      results.syllabusMigrated = true
    }

    // Migrate whyNow
    if (aiReadyData.whyNow?.cards?.length) {
      updateData.whyNow = aiReadyData.whyNow.cards.map((card) => ({
        icon: card.icon || '🎯',
        title: card.title,
        description: card.description,
      }))
      results.whyNowMigrated = true
    }

    // Migrate trustBadges
    if (aiReadyData.trustBadges?.length) {
      updateData.trustBadges = aiReadyData.trustBadges.map((badge) => ({
        icon: badge.icon || '🎓',
        text: badge.text,
      }))
      results.trustBadgesMigrated = true
    }

    // Migrate pricing
    if (aiReadyData.pricing) {
      const pricingTracks = []

      if (aiReadyData.pricing.frontalTrack) {
        const frontal = aiReadyData.pricing.frontalTrack
        pricingTracks.push({
          name: frontal.title || 'מסלול פרונטלי',
          schedule: frontal.schedule || 'הרצליה פיתוח | ימי שישי | 9:00-12:00',
          price: parseInt(frontal.price?.replace(/[^\d]/g, '') || '4900'),
          originalPrice: parseInt(frontal.originalPrice?.replace(/[^\d]/g, '') || '7900'),
          priceNote: frontal.priceNote || 'מחיר השקה מוקדם',
        })
      }

      if (aiReadyData.pricing.zoomTrack) {
        const zoom = aiReadyData.pricing.zoomTrack
        pricingTracks.push({
          name: zoom.title || 'מסלול Zoom',
          schedule: zoom.schedule || 'אונליין | ימי שישי | 9:00-12:00',
          price: parseInt(zoom.price?.replace(/[^\d]/g, '') || '2490'),
          originalPrice: parseInt(zoom.originalPrice?.replace(/[^\d]/g, '') || '3900'),
          priceNote: zoom.priceNote || 'מחיר השקה מוקדם',
        })
      }

      if (pricingTracks.length) {
        updateData.pricingTracks = pricingTracks
      }

      if (aiReadyData.pricing.nextCohortDate) {
        updateData.nextCohortDate = aiReadyData.pricing.nextCohortDate
      }

      results.pricingMigrated = true
    }

    // Step 4: Update the course
    if (Object.keys(updateData).length > 0) {
      await payload.update({
        collection: 'courses',
        id: course.id,
        data: updateData,
      })
      results.courseUpdated = true
      results.fieldsUpdated = Object.keys(updateData)
    } else {
      results.courseUpdated = false
      results.message = 'No data to migrate'
    }

    return NextResponse.json({
      success: true,
      message: 'AI Ready data migrated from Pages to Course',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        results,
      },
      { status: 500 }
    )
  }
}
