import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Course, Instructor, Testimonial, Media } from '@/payload-types'

// Force dynamic rendering - page uses Payload which requires runtime secrets
export const dynamic = 'force-dynamic'

// Color themes for different course types
const courseTypeThemes: Record<string, { gradient: string; glow: string; bg: string }> = {
  frontal: {
    gradient: 'from-purple-500 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.4)',
    bg: 'bg-purple-50',
  },
  digital: {
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59, 130, 246, 0.4)',
    bg: 'bg-blue-50',
  },
  workshop: {
    gradient: 'from-orange-500 to-amber-400',
    glow: 'rgba(249, 115, 22, 0.4)',
    bg: 'bg-orange-50',
  },
  coaching: {
    gradient: 'from-green-500 to-emerald-400',
    glow: 'rgba(34, 197, 94, 0.4)',
    bg: 'bg-green-50',
  },
}

const typeLabels: Record<string, string> = {
  frontal: 'מסלול פרונטלי',
  digital: 'קורס דיגיטלי',
  workshop: 'סדנה לארגונים',
  coaching: 'ליווי אישי',
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
    depth: 2, // Get relationships
  })

  if (!coursesResult.docs.length) {
    notFound()
  }

  const course = coursesResult.docs[0] as Course
  const theme = courseTypeThemes[course.type] || courseTypeThemes.frontal

  // Extract relationships
  const instructors = (course.instructors as Instructor[]) || []
  const testimonials = (course.testimonials as Testimonial[]) || []
  const featuredImage = course.featuredImage as Media | null

  // WhatsApp link
  const whatsappNumber = '972539466408'
  const whatsappMessage = encodeURIComponent(`היי! אני מעוניין/ת לקבל פרטים על ${course.title}`)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {featuredImage?.url ? (
            <img
              src={featuredImage.url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${theme.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${theme.gradient} mb-6`}>
              {typeLabels[course.type]}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              {course.title}
            </h1>

            {/* Subtitle */}
            {course.subtitle && (
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                {course.subtitle}
              </p>
            )}

            {/* Excerpt */}
            {course.excerpt && (
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                {course.excerpt}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg bg-gradient-to-r ${theme.gradient} shadow-lg hover:shadow-xl transition-all hover:scale-105`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {course.ctaText || 'השארת פרטים'}
              </a>
              <a
                href="#syllabus"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                צפייה בסילבוס
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Info Bar */}
      <section className={`py-8 ${theme.bg}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {course.duration && (
              <div className="text-center p-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-500">משך</div>
                <div className="font-bold text-gray-900">{course.duration}</div>
              </div>
            )}
            {course.schedule && (
              <div className="text-center p-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-500">לוח זמנים</div>
                <div className="font-bold text-gray-900">{course.schedule}</div>
              </div>
            )}
            {course.maxStudents && (
              <div className="text-center p-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-500">מקומות</div>
                <div className="font-bold text-gray-900">עד {course.maxStudents} משתתפים</div>
              </div>
            )}
            {course.location && (
              <div className="text-center p-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-500">מיקום</div>
                <div className="font-bold text-gray-900 text-sm">{course.location}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      {course.highlights && course.highlights.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
              מה תלמדו במסלול?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${theme.bg} border border-gray-100 hover:shadow-lg transition-shadow`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Syllabus Section */}
      {course.syllabus && course.syllabus.length > 0 && (
        <section id="syllabus" className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-4">
              סילבוס המסלול
            </h2>
            <p className="text-gray-600 text-center mb-12">
              {course.syllabus.length} מפגשים מעשיים
            </p>
            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold">{item.weekNumber || index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      {item.topics && item.topics.length > 0 && (
                        <ul className="space-y-1">
                          {item.topics.map((topicItem, topicIndex) => (
                            <li key={topicIndex} className="flex items-center gap-2 text-gray-600">
                              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
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
          </div>
        </section>
      )}

      {/* Instructors Section */}
      {instructors.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
              המרצים שלנו
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => {
                const instructorImage = instructor.image as Media | null
                return (
                  <div
                    key={instructor.id}
                    className="text-center group"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-100 group-hover:border-purple-300 transition-colors">
                      {instructorImage?.url ? (
                        <img
                          src={instructorImage.url}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                          <span className="text-3xl text-white font-bold">
                            {instructor.name?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                    {instructor.title && (
                      <p className={`text-sm bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-medium`}>
                        {instructor.title}
                      </p>
                    )}
                    {instructor.shortBio && (
                      <p className="text-gray-600 text-sm mt-2">{instructor.shortBio}</p>
                    )}
                    {instructor.linkedin && (
                      <a
                        href={instructor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
              מה אומרים הבוגרים?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => {
                const testimonialImage = testimonial.image as Media | null
                return (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-100">
                        {testimonialImage?.url ? (
                          <img
                            src={testimonialImage.url}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                            <span className="text-white font-bold">
                              {testimonial.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        {testimonial.role && (
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-3">
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
                    <p className="text-gray-700 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {course.faq && course.faq.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
              שאלות נפוצות
            </h2>
            <div className="space-y-4">
              {course.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition-colors list-none">
                    <h3 className="font-bold text-gray-900 pr-4">{item.question}</h3>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>ראה את התשובה המלאה בעמוד הקורס</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificate Section */}
      {course.certificate && (
        <section className={`py-16 lg:py-24 ${theme.bg}`}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {course.certificate}
            </h2>
            {course.certificateDescription && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {course.certificateDescription}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            מוכנים להצטרף?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            הצטרפו למאות הבוגרים שלנו ותתחילו ליישם AI בעבודה כבר היום
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
        </div>
      </section>
    </main>
  )
}
