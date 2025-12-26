import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('🔄 Starting Payload schema sync...')

    // Initialize Payload - this triggers push: true schema sync
    const payload = await getPayload({ config })

    console.log('✅ Payload initialized successfully')
    console.log('✅ Schema synced via push: true')
    console.log('🎯 All tables should now exist')

    // Verify a few key tables exist by trying to find from them
    let pagesCheck = 'unknown'
    try {
      await payload.findGlobal({
        slug: 'pages',
        depth: 0,
      })
      pagesCheck = 'accessible'
      console.log('✅ Pages global accessible')
    } catch (error) {
      pagesCheck = 'failed: ' + (error instanceof Error ? error.message : String(error))
      console.error('❌ Pages global check failed:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Schema sync completed successfully',
      pagesGlobal: pagesCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Schema sync failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
