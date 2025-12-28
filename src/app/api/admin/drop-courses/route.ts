import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

// This endpoint drops the courses table and all related tables
// so that push: true can recreate them with the correct schema
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.secret !== 'RESET_NOW_PLEASE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })

    console.log('Dropping courses-related tables...')

    await payload.db.drizzle.execute(sql`
      DROP TABLE IF EXISTS courses_pricing_tracks_features CASCADE;
      DROP TABLE IF EXISTS courses_pricing_tracks CASCADE;
      DROP TABLE IF EXISTS courses_cohorts CASCADE;
      DROP TABLE IF EXISTS courses_why_now CASCADE;
      DROP TABLE IF EXISTS courses_trust_badges CASCADE;
      DROP TABLE IF EXISTS courses_highlights CASCADE;
      DROP TABLE IF EXISTS courses_syllabus_topics CASCADE;
      DROP TABLE IF EXISTS courses_syllabus_tools CASCADE;
      DROP TABLE IF EXISTS courses_syllabus CASCADE;
      DROP TABLE IF EXISTS courses_faq CASCADE;
      DROP TABLE IF EXISTS courses_gallery CASCADE;
      DROP TABLE IF EXISTS courses_rels CASCADE;
      DROP TABLE IF EXISTS courses CASCADE;
    `)

    // Check what tables remain
    const tableCount = await payload.db.drizzle.execute(sql`
      SELECT COUNT(*) as count FROM information_schema.tables
      WHERE table_schema = 'public';
    `)

    console.log('Courses tables dropped successfully')

    return NextResponse.json({
      success: true,
      message: 'Courses tables dropped. Push: true will recreate them on next redeploy.',
      remainingTableCount: (tableCount.rows[0] as { count: string }).count,
    })
  } catch (error) {
    console.error('Drop courses error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
