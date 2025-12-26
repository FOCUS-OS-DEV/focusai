import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Query ALL tables in public schema
    const allTables = await payload.db.drizzle.execute(sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)

    // Query the database directly to check pages tables
    const result = await payload.db.drizzle.execute(sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'pages%'
      ORDER BY table_name;
    `)

    // Also check for aiReady specific tables
    const aiReadyTables = await payload.db.drizzle.execute(sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE '%ai_ready%'
      ORDER BY table_name;
    `)

    return NextResponse.json({
      success: true,
      allTablesCount: allTables.rows.length,
      allTables: allTables.rows.map((r: { table_name: string }) => r.table_name),
      pagesTablesCount: result.rows.length,
      pagesTables: result.rows,
      aiReadyTablesCount: aiReadyTables.rows.length,
      aiReadyTables: aiReadyTables.rows,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
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
