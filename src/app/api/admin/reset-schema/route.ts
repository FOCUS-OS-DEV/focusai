import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verify admin secret
    if (body.secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })

    console.log('Resetting database schema...')

    // Drop and recreate public schema
    await payload.db.drizzle.execute(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `)

    console.log('Schema reset complete')

    return NextResponse.json({
      success: true,
      message: 'Database schema reset. Redeploy to create tables.',
    })
  } catch (error) {
    console.error('Schema reset error:', error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    )
  }
}
