'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main
      className="min-h-screen flex items-center justify-center py-20"
      dir="rtl"
      style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}
    >
      <div className="text-center px-4 max-w-lg">
        {/* Icon */}
        <div className="mb-6">
          <span className="text-6xl">😔</span>
          <div
            className="text-3xl md:text-4xl font-black mt-4"
            style={{ color: '#1f1138' }}
          >
            אופס! משהו לא עבד
          </div>
        </div>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 text-lg">
          נתקלנו בבעיה בטעינת הדף. בואו ננסה שוב?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:-translate-y-1"
            style={{
              background: 'linear-gradient(90deg, #b86cff, #ff4fd8)',
              boxShadow: '0 8px 25px rgba(139,92,246,.3)',
            }}
          >
            טען מחדש
          </button>

          <Link
            href="/"
            className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-purple-100"
            style={{
              border: '2px solid #a16eff',
              color: '#a16eff',
              background: 'white',
            }}
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </main>
  )
}
