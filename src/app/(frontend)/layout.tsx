import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { OrganizationSchema } from '@/lib/schema'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Focus AI Academy - מרכז ההכשרות המוביל בישראל לעולם ה-AI',
    template: '%s | Focus AI Academy',
  },
  description: 'הכשרות מעשיות שייקחו אתכם מ"מה זה בכלל AI?" לשליטה מלאה בכלים המתקדמים ביותר. Bot-Camp, AI Ready, סדנאות לארגונים.',
  keywords: ['AI', 'בינה מלאכותית', 'קורסים', 'הכשרות', 'אוטומציה', 'סוכני AI', 'Bot-Camp', 'AI Ready', 'ChatGPT', 'למידת מכונה'],
  authors: [{ name: 'Focus AI Academy' }],
  creator: 'Focus AI Academy',
  publisher: 'Focus AI Academy',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: BASE_URL,
    siteName: 'Focus AI Academy',
    title: 'Focus AI Academy - מרכז ההכשרות המוביל בישראל לעולם ה-AI',
    description: 'הכשרות מעשיות שייקחו אתכם מ"מה זה בכלל AI?" לשליטה מלאה בכלים המתקדמים ביותר',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Focus AI Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus AI Academy',
    description: 'מרכז ההכשרות המוביל בישראל לעולם ה-AI',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'verification-code',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'he-IL': BASE_URL,
    },
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#faf8ff] text-gray-900 font-heebo">
        <OrganizationSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
