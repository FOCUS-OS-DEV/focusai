'use client'

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react'

const WEBHOOK_URL = 'https://focus2025.app.n8n.cloud/webhook/06374873-ea8a-4d27-bfa2-453ab2bf03d8'

interface FormData {
  name: string
  phone: string
}

export default function QuickContact() {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      ...formData,
      source: 'academy-landing-quick',
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
      // Facebook Pixel tracking
      const fbq = (window as unknown as { fbq?: (action: string, event: string) => void }).fbq
      if (fbq) fbq('track', 'Lead')
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #faf8ff 0%, #f3e8ff 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.2), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div
          className={`rounded-3xl p-8 md:p-12 relative bg-white/80 border border-purple-200 shadow-xl shadow-purple-100/50 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative corner */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-30"
            style={{
              background:
                'radial-gradient(circle at top right, rgba(168, 85, 247, 0.3), transparent 70%)',
            }}
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="text-center lg:text-right">
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                רוצים לשמוע עוד?
              </h2>
              <p
                className={`text-gray-600 text-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                השאירו פרטים ונחזור אליכם לשיחת ייעוץ קצרה
              </p>
            </div>

            {/* Form */}
            {isSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">תודה!</h3>
                <p className="text-gray-500 text-sm">נחזור אליכם בקרוב</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`space-y-4 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 px-5 py-4 rounded-xl bg-white border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                    placeholder="שם מלא"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-5 py-4 rounded-xl bg-white border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                    placeholder="טלפון"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    'דברו איתי'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
