import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.secret !== 'RESET_NOW_PLEASE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Initialize Payload which should trigger push: true
    const payload = await getPayload({ config })

    // Get list of tables to verify what exists
    const result = await payload.db.drizzle.execute(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `)

    const tables = result.rows.map((r) => (r as { tablename: string }).tablename)

    // Try to access collections to trigger table creation
    const collectionResults: Record<string, string> = {}
    const collections = [
      'users', 'media', 'courses', 'cohorts', 'lessons',
      'enrollments', 'progress', 'attendance', 'assignments',
      'submissions', 'certificates', 'posts', 'categories',
      'testimonials', 'instructors', 'contacts', 'partners'
    ]

    for (const col of collections) {
      try {
        await payload.find({
          collection: col as 'users',
          limit: 1,
        })
        collectionResults[col] = 'accessible'
      } catch (error) {
        collectionResults[col] = `error: ${String(error).slice(0, 100)}`
      }
    }

    return NextResponse.json({
      success: true,
      tables,
      tableCount: tables.length,
      collectionResults,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
