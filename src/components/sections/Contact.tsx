'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

const WEBHOOK_URL = 'https://focus2025.app.n8n.cloud/webhook/06374873-ea8a-4d27-bfa2-453ab2bf03d8'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', interest: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      ...formData,
      source: 'academy-landing',
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(data),
      })
      setIsSuccess(true)
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #f3e8ff 0%, #faf8ff 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            רוצים לשמוע עוד?
          </h2>
          <p className="text-gray-600">
            השאירו פרטים ונחזור אליכם לשיחת ייעוץ קצרה - בלי התחייבות
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-4 sm:p-6 md:p-8 bg-white border border-purple-100 shadow-xl shadow-purple-100/30 overflow-hidden">
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">הפרטים התקבלו!</h3>
              <p className="text-gray-500">נחזור אליכם בקרוב</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <label className="block text-sm text-gray-600 mb-1.5 sm:mb-2">שם מלא *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-purple-100 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm sm:text-base"
                    placeholder="השם שלכם"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm text-gray-600 mb-1.5 sm:mb-2">טלפון *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-purple-100 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm sm:text-base"
                    placeholder="050-0000000"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-sm text-gray-600 mb-1.5 sm:mb-2">אימייל *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-purple-100 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm sm:text-base"
                  placeholder="email@example.com"
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm text-gray-600 mb-1.5 sm:mb-2">מה מעניין אתכם?</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-purple-100 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm sm:text-base"
                >
                  <option value="">בחרו אפשרות</option>
                  <option value="botcamp">Bot-Camp</option>
                  <option value="aiready">AI READY</option>
                  <option value="coaching">ליווי אישי</option>
                  <option value="workshop">סדנאות לארגונים</option>
                  <option value="other">עדיין לא בטוח/ה</option>
                </select>
              </div>

              <div className="min-w-0">
                <label className="block text-sm text-gray-600 mb-1.5 sm:mb-2">ספרו לנו עוד</label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-purple-100 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all resize-none text-sm sm:text-base"
                  placeholder="מה הרקע שלכם? מה אתם מחפשים?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 rounded-xl text-white font-bold text-base sm:text-lg disabled:opacity-50 transition-all shadow-lg shadow-purple-300/30 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                }}
              >
                {isSubmitting ? 'שולח...' : 'שלחו ונחזור אליכם'}
              </button>

              <p className="text-center text-xs text-gray-400">
                בלחיצה אתם מאשרים את{' '}
                <a href="https://focusai.co.il/privacy-policy/" className="text-purple-600 underline hover:text-purple-700">
                  מדיניות הפרטיות
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
