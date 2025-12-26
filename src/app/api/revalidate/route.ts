import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * On-demand revalidation endpoint
 *
 * Usage:
 * - GET /api/revalidate - Revalidate all common paths
 * - GET /api/revalidate?path=/ai-ready - Revalidate specific path
 * - GET /api/revalidate?tag=globals - Revalidate by cache tag
 * - GET /api/revalidate?all=true - Revalidate everything
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')
    const all = searchParams.get('all')

    const results: string[] = []

    // Revalidate specific path
    if (path) {
      revalidatePath(path)
      results.push(`Revalidated path: ${path}`)
    }

    // Revalidate by cache tag
    if (tag) {
      revalidateTag(tag)
      results.push(`Revalidated tag: ${tag}`)
    }

    // Revalidate all common paths
    if (all === 'true' || (!path && !tag)) {
      const commonPaths = [
        '/',
        '/ai-ready',
        '/about',
        '/courses',
        '/blog',
        '/thank-you',
      ]

      for (const p of commonPaths) {
        revalidatePath(p)
        results.push(`Revalidated path: ${p}`)
      }

      // Also revalidate cache tags
      const commonTags = ['globals', 'homepage', 'pages', 'site-settings', 'navigation']
      for (const t of commonTags) {
        revalidateTag(t)
        results.push(`Revalidated tag: ${t}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated successfully',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
