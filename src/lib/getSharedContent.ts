import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Homepage, Page, SiteSetting } from '@/payload-types'

// Default stats in case Payload fails
const defaultStats = {
  graduates: { value: 500, label: 'בוגרים מרוצים', suffix: '+' },
  courses: { value: 50, label: 'קורסים וסדנאות', suffix: '+' },
  companies: { value: 100, label: 'חברות שעבדנו איתן', suffix: '+' },
  satisfaction: { value: 95, label: 'שביעות רצון', suffix: '%' },
}

const defaultContact = {
  email: 'info@focusai.co.il',
  phone: '053-946-6408',
  whatsapp: '972539466408',
  address: 'אריה שנקר 14, הרצליה פיתוח',
}

export interface GlobalStats {
  graduates: { value: number; label: string; suffix: string }
  courses: { value: number; label: string; suffix: string }
  companies: { value: number; label: string; suffix: string }
  satisfaction: { value: number; label: string; suffix: string }
}

export interface SharedContent {
  homepage: Homepage | null
  pages: Page | null
  siteSettings: SiteSetting | null
  stats: GlobalStats
  contact: typeof defaultContact
}

/**
 * Cache the raw globals fetch for 1 hour
 * This significantly reduces DB load
 */
const getCachedGlobals = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    let homepage: Homepage | null = null
    let pages: Page | null = null
    let siteSettings: SiteSetting | null = null

    // Fetch all globals in parallel for better performance
    const results = await Promise.allSettled([
      payload.findGlobal({ slug: 'homepage' }),
      payload.findGlobal({ slug: 'pages' }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    if (results[0].status === 'fulfilled') {
      homepage = results[0].value as Homepage
    } else {
      console.error('Error fetching homepage:', results[0].reason)
    }

    if (results[1].status === 'fulfilled') {
      pages = results[1].value as Page
    } else {
      console.error('Error fetching pages:', results[1].reason)
    }

    if (results[2].status === 'fulfilled') {
      siteSettings = results[2].value as SiteSetting
    } else {
      console.error('Error fetching site-settings:', results[2].reason)
    }

    return { homepage, pages, siteSettings }
  },
  ['shared-content-globals'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['globals', 'homepage', 'pages', 'site-settings'],
  }
)

/**
 * Fetches all shared content from Payload CMS with caching
 * Use this in any page that needs dynamic content
 */
export async function getSharedContent(): Promise<SharedContent> {
  const { homepage, pages, siteSettings } = await getCachedGlobals()

  let stats: GlobalStats = defaultStats
  let contact = defaultContact

  // Extract stats from homepage if available
  if (homepage?.globalStats) {
    stats = {
      graduates: {
        value: homepage.globalStats.graduates?.value ?? defaultStats.graduates.value,
        label: homepage.globalStats.graduates?.label ?? defaultStats.graduates.label,
        suffix: homepage.globalStats.graduates?.suffix ?? defaultStats.graduates.suffix,
      },
      courses: {
        value: homepage.globalStats.courses?.value ?? defaultStats.courses.value,
        label: homepage.globalStats.courses?.label ?? defaultStats.courses.label,
        suffix: homepage.globalStats.courses?.suffix ?? defaultStats.courses.suffix,
      },
      companies: {
        value: homepage.globalStats.companies?.value ?? defaultStats.companies.value,
        label: homepage.globalStats.companies?.label ?? defaultStats.companies.label,
        suffix: homepage.globalStats.companies?.suffix ?? defaultStats.companies.suffix,
      },
      satisfaction: {
        value: homepage.globalStats.satisfaction?.value ?? defaultStats.satisfaction.value,
        label: homepage.globalStats.satisfaction?.label ?? defaultStats.satisfaction.label,
        suffix: homepage.globalStats.satisfaction?.suffix ?? defaultStats.satisfaction.suffix,
      },
    }
  }

  // Extract contact from siteSettings if available
  if (siteSettings?.contact) {
    contact = {
      email: siteSettings.contact.email ?? defaultContact.email,
      phone: siteSettings.contact.phone ?? defaultContact.phone,
      whatsapp: siteSettings.contact.whatsapp ?? defaultContact.whatsapp,
      address: siteSettings.contact.address ?? defaultContact.address,
    }
  }

  return {
    homepage,
    pages,
    siteSettings,
    stats,
    contact,
  }
}

/**
 * Helper to format stat display
 */
export function formatStat(stat: { value: number; label: string; suffix: string }): string {
  return `${stat.value}${stat.suffix}`
}
