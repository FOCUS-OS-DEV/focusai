import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Update Navigation with AI Ready link
 * GET /api/update-navigation - Adds AI Ready to mainMenu if not present
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Get current navigation
    const navigation = await payload.findGlobal({
      slug: 'navigation',
    })

    const currentMainMenu = (navigation?.mainMenu as Array<{
      label?: string
      url?: string
      openInNewTab?: boolean
      children?: Array<{ label?: string; url?: string; openInNewTab?: boolean }>
    }>) || []

    // Check if AI Ready already exists
    const hasAiReady = currentMainMenu.some(
      (item) => item.url === '/ai-ready' || item.label?.includes('AI Ready')
    )

    if (hasAiReady) {
      return NextResponse.json({
        success: true,
        message: 'AI Ready already exists in navigation',
        currentMenu: currentMainMenu.map((item) => ({ label: item.label, url: item.url })),
      })
    }

    // Add AI Ready after the home item (or at position 1)
    const updatedMainMenu = [
      ...currentMainMenu.slice(0, 1), // Keep first item (usually Home)
      {
        label: 'AI Ready',
        url: '/ai-ready',
        openInNewTab: false,
        children: [],
      },
      ...currentMainMenu.slice(1), // Rest of the items
    ]

    // Update navigation
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        mainMenu: updatedMainMenu,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'AI Ready added to navigation successfully',
      updatedMenu: updatedMainMenu.map((item) => ({ label: item.label, url: item.url })),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Update navigation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
