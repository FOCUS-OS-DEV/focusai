import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const pagesGlobal = await payload.findGlobal({
      slug: 'pages',
      depth: 1,
    })

    // Extract just the aiReady section for easier viewing
    const aiReadyData = pagesGlobal?.aiReady

    return NextResponse.json({
      success: true,
      hasData: !!pagesGlobal,
      aiReadyKeys: aiReadyData ? Object.keys(aiReadyData) : [],
      syllabusCount: aiReadyData?.syllabus?.meetings?.length || 0,
      whyNowCount: aiReadyData?.whyNow?.cards?.length || 0,
      trustBadgesCount: aiReadyData?.trustBadges?.length || 0,
      // Show a sample of the data
      sampleMeeting: aiReadyData?.syllabus?.meetings?.[0],
      sampleWhyNow: aiReadyData?.whyNow?.cards?.[0],
      heroTitle: aiReadyData?.hero?.title,
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
