import React from 'react'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Focus AI Academy - מרכז ההכשרות המוביל בישראל לעולם ה-AI',
  description: 'הכשרות מעשיות שייקחו אתכם מ"מה זה בכלל AI?" לשליטה מלאה בכלים המתקדמים ביותר. Bot-Camp, AI Ready, סדנאות לארגונים.',
  keywords: 'AI, בינה מלאכותית, קורסים, הכשרות, אוטומציה, סוכני AI, Bot-Camp, AI Ready',
  openGraph: {
    title: 'Focus AI Academy',
    description: 'מרכז ההכשרות המוביל בישראל לעולם ה-AI',
    locale: 'he_IL',
    type: 'website',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
