import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Course, Instructor, Testimonial, Media } from '@/payload-types'

// Force dynamic rendering - page uses Payload which requires runtime secrets
export const dynamic = 'force-dynamic'

// Helper to extract plain text from Lexical rich text
function extractTextFromLexical(richText: unknown): string {
  if (!richText || typeof richText !== 'object') return ''

  const root = (richText as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  const extractFromChildren = (children: unknown[]): string => {
    return children.map(child => {
      if (!child || typeof child !== 'object') return ''
      const node = child as { text?: string; children?: unknown[] }
      if (node.text) return node.text
      if (node.children) return extractFromChildren(node.children)
      return ''
    }).join(' ')
  }

  return extractFromChildren(root.children)
}

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const coursesResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 0,
  })

  if (!coursesResult.docs.length) {
    return { title: 'קורס לא נמצא' }
  }

  const course = coursesResult.docs[0]
  const seoTitle = course.seo?.metaTitle || course.title
  const seoDescription = course.seo?.metaDescription || course.excerpt || ''

  return {
    title: `${seoTitle} | Focus AI Academy`,
    description: seoDescription,
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const coursesResult = await payload.find({
    collection: 'courses',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
  })

  if (!coursesResult.docs.length) {
    notFound()
  }

  const course = coursesResult.docs[0] as Course
  const instructors = (course.instructors as Instructor[]) || []
  const testimonials = (course.testimonials as Testimonial[]) || []
  const featuredImage = course.featuredImage as Media | null

  // WhatsApp link
  const whatsappNumber = '972539466408'
  const whatsappMessage = encodeURIComponent(`היי! אני מעוניין/ת לקבל פרטים על ${course.title}`)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section - Light gradient with feature pills */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #faf8ff 0%, #f3e8ff 50%, #fce7f3 100%)',
        }}
      >
        {/* Background decorative elements */}
        <div
          className="absolute top-20 right-10 w-96 h-96 opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              {/* Partnership badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm mb-6">
                <span className="text-sm text-gray-600">בשיתוף</span>
                <span className="text-sm font-semibold text-purple-700">אוניברסיטת חיפה</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm font-semibold text-purple-700">הטכניון</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>

              {/* Subtitle */}
              {course.subtitle && (
                <p className="text-xl md:text-2xl text-gray-700 mb-4">
                  {course.subtitle}
                </p>
              )}

              {/* Excerpt */}
              {course.excerpt && (
                <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-xl">
                  {course.excerpt}
                </p>
              )}

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {course.duration && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                )}
                {course.schedule && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {course.schedule}
                  </span>
                )}
                {course.certificate && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    תעודה מקצועית
                  </span>
                )}
                {course.hasZoom && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    שידור Zoom
                  </span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {course.ctaText || 'דברו איתנו'}
                </a>
                <a
                  href="#syllabus"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-purple-600 bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  לסילבוס המלא
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {featuredImage?.url ? (
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/50 border-4 border-white">
                    <img
                      src={featuredImage.url}
                      alt={course.title}
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/50 border-4 border-white bg-gradient-to-br from-purple-500 to-pink-500 aspect-[4/3] flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">1,000+</div>
                      <div className="text-sm text-gray-500">בוגרים</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section - 4-card grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              למי מתאימה התוכנית?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              התוכנית מיועדת לכל מי שרוצה להיות חלק ממהפכת ה-AI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👨‍💼', title: 'מנהלים', desc: 'מנהלים שרוצים להוביל טרנספורמציה דיגיטלית בארגון' },
              { icon: '💼', title: 'יזמים', desc: 'יזמים שמחפשים יתרון תחרותי באמצעות AI' },
              { icon: '🎯', title: 'משווקים', desc: 'אנשי שיווק שרוצים לייעל תהליכים ולהגדיל תוצאות' },
              { icon: '🔧', title: 'טכנולוגיסטים', desc: 'אנשי טכנולוגיה שרוצים להרחיב את ארגז הכלים' },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section - Alternating cards */}
      <section
        className="py-16 lg:py-24"
        style={{
          background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)',
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              למה דווקא עכשיו?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              שוק העבודה משתנה במהירות - אלו שישלטו בכלי AI יובילו
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'מהפכת ה-AI כבר כאן',
                desc: 'חברות בכל הגדלים כבר משלבות כלי AI בתהליכי העבודה. מי שלא יתאים את עצמו - יישאר מאחור.',
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: 'ביקוש גואה למומחי AI',
                desc: 'שוק העבודה זועק לאנשים שיודעים להטמיע ולנהל פתרונות AI. ההזדמנות גדולה מאי פעם.',
                icon: (
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                title: 'יתרון תחרותי משמעותי',
                desc: 'הידע שתרכשו יאפשר לכם להוביל, לייעל ולחדש בכל תפקיד ובכל ארגון.',
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 p-8 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      {course.highlights && course.highlights.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                מה תקבלו בהכשרה?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                ההכשרה המקיפה ביותר בתחום - הכל בשביל ההצלחה שלכם
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Syllabus Section - Gradient left border */}
      {course.syllabus && course.syllabus.length > 0 && (
        <section
          id="syllabus"
          className="py-16 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #faf8ff 0%, #f3e8ff 100%)',
          }}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                סילבוס מלא
              </h2>
              <p className="text-gray-600 text-lg">
                {course.syllabus.length} מפגשים מעשיים • ידע שתוכלו ליישם מיד
              </p>
            </div>

            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Gradient left border */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{
                      background: 'linear-gradient(180deg, #a855f7, #ec4899)',
                    }}
                  />

                  <div className="flex items-start gap-4 pr-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-purple-600">{item.weekNumber || index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                      {item.topics && item.topics.length > 0 && (
                        <ul className="space-y-2">
                          {item.topics.map((topicItem, topicIndex) => (
                            <li key={topicIndex} className="flex items-center gap-3 text-gray-600">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                              {topicItem.topic}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download syllabus CTA */}
            <div className="mt-10 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                קבלו סילבוס מפורט בWhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Instructors Section - Rectangular cards */}
      {instructors.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                המרצים שלנו
              </h2>
              <p className="text-gray-600 text-lg">
                מומחים מהשורה הראשונה בתעשייה
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => {
                const instructorImage = instructor.image as Media | null
                return (
                  <div
                    key={instructor.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Rectangular image */}
                    <div className="relative h-56 overflow-hidden">
                      {instructorImage?.url ? (
                        <img
                          src={instructorImage.url}
                          alt={instructor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-5xl text-white font-bold">
                            {instructor.name?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Name overlay */}
                      <div className="absolute bottom-4 right-4 left-4">
                        <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                        {instructor.title && (
                          <p className="text-white/80 text-sm">{instructor.title}</p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {instructor.shortBio && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{instructor.shortBio}</p>
                      )}

                      <div className="flex items-center gap-3">
                        {instructor.linkedin && (
                          <a
                            href={instructor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {instructor.specialties && instructor.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {instructor.specialties.slice(0, 2).map((spec, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600"
                              >
                                {spec.specialty}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Grid with ratings */}
      {testimonials.length > 0 && (
        <section
          className="py-16 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #faf8ff 0%, #f3e8ff 100%)',
          }}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                מה אומרים הבוגרים?
              </h2>
              <p className="text-gray-600 text-lg">
                הצטרפו לאלפי בוגרים מרוצים
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => {
                const testimonialImage = testimonial.image as Media | null
                return (
                  <div
                    key={testimonial.id}
                    className="relative bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Quote icon */}
                    <div className="absolute top-6 left-6 text-purple-100">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>

                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-200'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200">
                        {testimonialImage?.url ? (
                          <img
                            src={testimonialImage.url}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white font-bold">{testimonial.name?.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        {testimonial.role && (
                          <p className="text-sm text-purple-600">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Accordion with gradient background */}
      {course.faq && course.faq.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                שאלות נפוצות
              </h2>
              <p className="text-gray-600 text-lg">
                כל מה שרציתם לדעת על ההכשרה
              </p>
            </div>

            <div className="space-y-4">
              {course.faq.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #faf8ff, #f3e8ff)',
                  }}
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-purple-50 transition-colors list-none">
                    <h3 className="font-bold text-gray-900 pr-4 text-lg">{item.question}</h3>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-purple-600 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {extractTextFromLexical(item.answer) || 'לפרטים נוספים צרו איתנו קשר.'}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificate Section */}
      {course.certificate && (
        <section
          className="py-16 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)',
          }}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-center md:text-right flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                    {course.certificate}
                  </h2>
                  {course.certificateDescription && (
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {course.certificateDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #581c87, #9333ea, #db2777)',
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle, white, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            הצטרפו לאלפי בוגרים שכבר משתמשים ב-AI לשיפור העבודה שלהם
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-purple-900 font-bold text-lg bg-white hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              דברו איתנו בWhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              חזרה לדף הבית
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>תעודה מוכרת</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>1,000+ בוגרים</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>בשיתוף אוניברסיטת חיפה</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
