'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterClient() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('הסיסמאות לא תואמות')
      return
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.errors?.[0]?.message || data.message || 'שגיאה בהרשמה')
      }

      // Auto-login after registration
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (loginRes.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        router.push('/login')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהרשמה')
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
          <h1 className="text-3xl font-black text-gray-900 text-center mb-2">הרשמה</h1>
          <p className="text-gray-600 text-center mb-8">צרו חשבון חדש והתחילו ללמוד</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שם מלא <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="ישראל ישראלי"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אימייל <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">טלפון</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="050-0000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="לפחות 6 תווים"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אימות סיסמה <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none transition-all text-gray-900"
                placeholder="הזינו שוב את הסיסמה"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] transition-all disabled:opacity-70"
            >
              {isLoading ? 'יוצר חשבון...' : 'צור חשבון'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              כבר יש לכם חשבון?{' '}
              <Link href="/login" className="text-[#a855f7] font-semibold hover:underline">
                התחברו
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
