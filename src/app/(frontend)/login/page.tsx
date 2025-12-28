'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'שגיאה בהתחברות')
      }

      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהתחברות')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="https://focusai.co.il/wp-content/uploads/2025/10/cropped-focus-ai-logo-e1729850518699.png"
              alt="Focus AI"
              width={150}
              height={48}
              className="h-12 w-auto mx-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.1)]">
          <h1 className="text-3xl font-black text-gray-900 text-center mb-2">התחברות</h1>
          <p className="text-gray-600 text-center mb-8">ברוכים השבים לאזור האישי שלכם</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="הזינו סיסמה"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] transition-all disabled:opacity-70"
            >
              {isLoading ? 'מתחבר...' : 'התחברות'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              אין לכם חשבון?{' '}
              <Link href="/register" className="text-[#a855f7] font-semibold hover:underline">
                הרשמו עכשיו
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-[#a855f7] transition-colors text-sm">
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  )
}
