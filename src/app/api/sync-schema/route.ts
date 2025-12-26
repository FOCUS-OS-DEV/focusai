import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const results: Record<string, string> = {}

  try {
    console.log('🔄 Starting Payload schema sync...')

    // Initialize Payload - this triggers push: true schema sync
    const payload = await getPayload({ config })
    results.payloadInit = 'success'

    console.log('✅ Payload initialized successfully')

    // Check if pages table exists
    const pagesTableCheck = await payload.db.drizzle.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'pages'
      );
    `)
    const pagesTableExists = (pagesTableCheck.rows[0] as { exists: boolean })?.exists
    results.pagesTableExists = String(pagesTableExists)

    if (!pagesTableExists) {
      console.log('❌ Pages table does not exist! Attempting to create...')

      // Force a schema push by calling db.push
      // This is the drizzle-kit push method
      try {
        // Try accessing the global - this might trigger table creation
        await payload.findGlobal({
          slug: 'pages',
          depth: 0,
        })
        results.pagesGlobalAccess = 'success'
      } catch (findError) {
        results.pagesGlobalAccess =
          'failed: ' + (findError instanceof Error ? findError.message : String(findError))

        // The table doesn't exist, we need to manually trigger a schema sync
        // In Payload v3 with postgres, we can try to call the push method
        console.log('Attempting manual table creation...')

        // Create the pages table manually as a last resort
        try {
          await payload.db.drizzle.execute(sql`
            CREATE TABLE IF NOT EXISTS "pages" (
              "id" serial PRIMARY KEY,
              "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
              "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
            );
          `)
          results.manualTableCreation = 'created base pages table'
        } catch (createError) {
          results.manualTableCreation =
            'failed: ' + (createError instanceof Error ? createError.message : String(createError))
        }
      }
    } else {
      results.pagesGlobalAccess = 'table exists'
    }

    // Try to access all globals to trigger any missing table creation
    type GlobalSlug = 'site-settings' | 'navigation' | 'homepage' | 'pages'
    const globals: GlobalSlug[] = ['site-settings', 'navigation', 'homepage', 'pages']
    for (const globalSlug of globals) {
      try {
        await payload.findGlobal({ slug: globalSlug, depth: 0 })
        results[`global_${globalSlug}`] = 'accessible'
      } catch (e) {
        results[`global_${globalSlug}`] =
          'error: ' + (e instanceof Error ? e.message.slice(0, 100) : String(e).slice(0, 100))
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Schema sync attempted',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Schema sync failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: String(error),
        results,
      },
      { status: 500 }
    )
  }
}
