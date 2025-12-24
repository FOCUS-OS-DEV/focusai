'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Page, SiteSetting } from '@/payload-types'

// Declare fbq type for TypeScript
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    ttq?: {
      track: (event: string, data?: any) => void
    }
    gtag?: (...args: any[]) => void
  }
}

interface ThankYouClientProps {
  content: Page['thankYou'] | undefined
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
  }
  socialLinks: SiteSetting['social'] | undefined
}

function ThankYouContent({ content, contact, socialLinks }: ThankYouClientProps) {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || ''
  const source = searchParams.get('source') || 'website'

  useEffect(() => {
    // Fire Meta Pixel Lead event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'AI Ready Registration',
        content_category: source,
      })
      console.log('Meta Pixel Lead event fired')
    }

    // Fire TikTok Pixel event
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('SubmitForm')
      console.log('TikTok Pixel SubmitForm event fired')
    }

    // Fire Google Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: source,
      })
      console.log('Google Analytics lead event fired')
    }
  }, [source])

  // Default content values
  const icon = content?.icon || '🎉'
  const title = content?.title || 'תודה רבה'
  const subtitle = content?.subtitle || 'הפרטים שלך התקבלו בהצלחה!'
  const description = content?.description || 'נציג שלנו יצור איתך קשר בהקדם האפשרי (בדרך כלל תוך 24 שעות)'
  const whatNextTitle = content?.whatNext?.title || 'מה עכשיו?'
  const whatNextItems = content?.whatNext?.items && content.whatNext.items.length > 0
    ? content.whatNext.items
    : [
        { icon: '📱', text: 'שלחנו לכם מייל אישור - בדקו את תיבת הדואר' },
        { icon: '👥', text: 'עקבו אחרינו ברשתות לעדכונים שוטפים' },
        { icon: '💬', text: 'הצטרפו לקהילת הווטסאפ שלנו' },
      ]

  // Default buttons
  const buttons = content?.buttons && content.buttons.length > 0
    ? content.buttons
    : [
        { text: 'חזרה לדף הבית', link: '/', style: 'primary' as const },
        { text: 'הקורסים שלנו', link: '/courses', style: 'secondary' as const },
      ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)] text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500/30 to-[#a855f7]/30 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-5xl">{icon}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {name ? `${title} ${name}!` : `${title}!`}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899] mb-6">
            {subtitle}
          </h2>

          {/* Message */}
          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-600">
              {description}
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{whatNextTitle}</h3>
            <div className="space-y-3 text-right">
              {whatNextItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#a855f7]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span>{item.icon || (index + 1)}</span>
                  </div>
                  <span className="text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-4">עקבו אחרינו ברשתות</p>
            <div className="flex justify-center gap-4">
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-100/50 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-100/50 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {socialLinks?.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-100/50 hover:bg-black rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              )}
              {/* WhatsApp Community Link */}
              <a
                href="https://did.li/Focus-community"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-purple-100/50 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, index) => {
              const isPrimary = button.style === 'primary'
              const isWhatsapp = button.style === 'whatsapp'

              const className = isPrimary
                ? 'px-8 py-3 text-base font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300'
                : isWhatsapp
                ? 'px-8 py-3 text-base font-bold rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300'
                : 'px-8 py-3 text-base font-bold rounded-full border-2 border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300'

              return (
                <Link key={index} href={button.link || '/'} className={className}>
                  {button.text}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)]"
        aria-label="פנייה מהירה בוואצאפ"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  )
}

export default function ThankYouClient(props: ThankYouClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a855f7]"></div>
      </div>
    }>
      <ThankYouContent {...props} />
    </Suspense>
  )
}
