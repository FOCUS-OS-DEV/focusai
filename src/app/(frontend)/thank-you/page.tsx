import { getSharedContent } from '@/lib/getSharedContent'
import ThankYouClient from './ThankYouClient'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function ThankYouPage() {
  const { pages, contact, siteSettings } = await getSharedContent()
  const thankYouContent = pages?.thankYou

  // Get social links from site settings
  const socialLinks = siteSettings?.social

  return (
    <ThankYouClient
      content={thankYouContent}
      contact={contact}
      socialLinks={socialLinks}
    />
  )
}
