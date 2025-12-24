import type { Metadata } from 'next'
import Link from 'next/link'
import { getSharedContent } from '@/lib/getSharedContent'
import Breadcrumbs from '@/components/Breadcrumbs'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'נשמח לשמוע מכם - צרו קשר עם Focus AI Academy לשאלות על קורסים, הרשמה וייעוץ אישי',
  openGraph: {
    title: 'צור קשר | Focus AI Academy',
    description: 'נשמח לשמוע מכם ולענות על כל שאלה',
  },
}

export default async function ContactPage() {
  const { contact } = await getSharedContent()

  const breadcrumbItems = [{ label: 'צור קשר' }]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#a855f7]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#ec4899]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
              צרו קשר
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center">
            נשמח לשמוע מכם ולענות על כל שאלה
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-purple-100/50 border border-purple-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6">שלחו לנו הודעה</h2>

              <form action="/api/contact" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      שם פרטי
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      placeholder="ישראל"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      שם משפחה
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      placeholder="ישראלי"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="israel@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="050-1234567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    נושא הפנייה
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                  >
                    <option value="general">שאלה כללית</option>
                    <option value="courses">מידע על קורסים</option>
                    <option value="registration">הרשמה לקורס</option>
                    <option value="business">שיתוף פעולה עסקי</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                    placeholder="איך נוכל לעזור לכם?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-300/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  }}
                >
                  שליחה
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">פרטי יצירת קשר</h2>
                <p className="text-gray-600">
                  נשמח לענות על כל שאלה ולעזור לכם למצוא את הקורס המתאים ביותר
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">טלפון</div>
                      <div className="font-bold text-gray-900">{contact.phone}</div>
                    </div>
                  </a>
                )}

                {/* Email */}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">אימייל</div>
                      <div className="font-bold text-gray-900">{contact.email}</div>
                    </div>
                  </a>
                )}

                {/* Address */}
                {contact.address && (
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">כתובת</div>
                      <div className="font-bold text-gray-900">{contact.address}</div>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">WhatsApp</div>
                      <div className="font-bold text-green-600">שלחו הודעה</div>
                    </div>
                  </a>
                )}
              </div>

              {/* Business Hours */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  שעות פעילות
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ראשון - חמישי</span>
                    <span className="font-medium text-gray-900">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">שישי</span>
                    <span className="font-medium text-gray-900">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">שבת</span>
                    <span className="font-medium text-gray-500">סגור</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)] text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              מוכנים להתחיל ללמוד?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              גלו את מגוון הקורסים שלנו ובחרו את המסלול המתאים לכם
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-300/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              }}
            >
              <span>לכל הקורסים</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
