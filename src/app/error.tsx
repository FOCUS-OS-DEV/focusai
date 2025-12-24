'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl">
      <div className="text-center px-4 py-16 max-w-lg">
        {/* Icon */}
        <div className="mb-6">
          <span className="text-6xl">⚠️</span>
          <div className="text-4xl md:text-5xl font-black text-red-500 mt-4">
            משהו השתבש
          </div>
        </div>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 text-lg">
          אירעה שגיאה בלתי צפויה. אנחנו עובדים על זה!
        </p>

        {/* Debug info - only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-right">
            <code className="text-sm text-red-600 break-all">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold hover:shadow-lg transition-all"
          >
            נסה שוב
          </button>

          <Link
            href="/"
            className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-full font-bold hover:bg-purple-50 transition-all"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </main>
  )
}
