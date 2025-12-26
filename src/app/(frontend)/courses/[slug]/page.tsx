import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Course, Instructor, Testimonial, Media } from '@/payload-types'
import { getSharedContent } from '@/lib/getSharedContent'
import { CourseSchema } from '@/lib/schema'
import Breadcrumbs from '@/components/Breadcrumbs'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const coursesResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 1,
  })
  if (!coursesResult.docs.length) {
    return { title: 'קורס לא נמצא' }
  }
  const course = coursesResult.docs[0]
  const seoImage = course.seo?.ogImage as Media | null
  const featuredImage = course.featuredImage as Media | null
  const ogImageUrl = seoImage?.url || featuredImage?.url || '/og-image.jpg'

  return {
    title: course.seo?.metaTitle || course.title,
    description: course.seo?.metaDescription || course.excerpt || course.subtitle || '',
    openGraph: {
      title: course.seo?.metaTitle || course.title,
      description: course.seo?.metaDescription || course.excerpt || course.subtitle || '',
      type: 'website',
      url: `${BASE_URL}/courses/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.seo?.metaTitle || course.title,
      description: course.seo?.metaDescription || course.excerpt || course.subtitle || '',
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/courses/${slug}`,
    },
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { pages } = await getSharedContent()

  const coursesResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  if (!coursesResult.docs.length) {
    notFound()
  }

  const course = coursesResult.docs[0] as Course
  const instructors = (course.instructors as Instructor[]) || []
  const testimonials = (course.testimonials as Testimonial[]) || []
  const featuredImage = course.featuredImage as Media | null

  // Get dynamic content from CMS
  const cs = pages?.courseSingle
  const commonCta = pages?.commonCta

  // Section titles from CMS
  const sectionTitles = {
    whoIsItFor: cs?.sections?.whoIsItFor || 'למי זה מתאים?',
    whyNow: cs?.sections?.whyNow || 'למה עכשיו?',
    whatYouGet: cs?.sections?.whatYouGet || 'מה תקבלו בהכשרה?',
    highlights: cs?.sections?.highlights || 'מה תלמדו?',
    syllabus: cs?.sections?.syllabus || 'הסילבוס',
    team: cs?.sections?.team || 'הצוות',
    testimonials: cs?.sections?.testimonials || 'מה אומרים הבוגרים?',
    faq: cs?.sections?.faq || 'שאלות נפוצות',
  }

  // Button texts from CMS
  const buttonTexts = {
    register: cs?.buttons?.register || 'הרשמה לקורס',
    syllabus: cs?.buttons?.syllabus || 'לסילבוס המלא',
    contact: cs?.buttons?.contact || 'דברו איתנו',
    backHome: cs?.buttons?.backHome || 'חזרה לדף הבית',
  }

  // Alert texts from CMS
  const alertTexts = {
    spotsLeft: cs?.alerts?.spotsLeft || 'נותרו מקומות אחרונים למחזור הקרוב',
  }

  // CTA texts from CMS
  const ctaTexts = {
    title: cs?.cta?.title || 'מוכנים להתחיל?',
    subtitle: cs?.cta?.subtitle || 'הצטרפו למאות בוגרים שכבר עובדים עם AI',
  }

  const whatsappNumber = commonCta?.whatsappNumber || '972539466408'
  const whatsappMessage = encodeURIComponent(`היי! אני מעוניין/ת לקבל פרטים על ${course.title}`)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <>
      <CourseSchema course={course} />
      <main className="min-h-screen" dir="rtl" style={{ fontFamily: '"Rubik", system-ui, sans-serif' }}>
        {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}
      >
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(184,108,255,0.3), transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,79,216,0.3), transparent 70%)', filter: 'blur(100px)' }} />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          {/* Breadcrumbs */}
          <div className="flex justify-center mb-6">
            <Breadcrumbs
              items={[
                { label: 'קורסים', href: '/courses' },
                { label: course.title }
              ]}
              className="text-gray-600"
            />
          </div>

          {/* University Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <span className="text-sm font-medium" style={{ color: '#1f1138' }}>בליווי אקדמי של</span>
            <span className="text-sm font-bold" style={{ color: '#8B5CF6' }}>היחידה ללימודי חוץ באוניברסיטת חיפה</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: '#1f1138' }}>
            {course.title}
          </h1>

          {/* Subtitle */}
          {course.subtitle && (
            <p className="text-xl md:text-2xl mb-8 font-semibold" style={{ color: '#1f1138' }}>
              {course.subtitle}
            </p>
          )}

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { text: 'תעודה מקצועית', icon: '🎓' },
              { text: 'תיק עבודות', icon: '💼' },
              { text: 'פרונטלי או Zoom', icon: '🖥️' },
              { text: 'ללא ידע בקוד', icon: '✨' },
              { text: 'יחס חניכה צמוד', icon: '👥' },
              { text: 'הכנה להשמה', icon: '🚀' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: '#1f1138',
                }}
              >
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:-translate-y-1"
              style={{
                background: 'linear-gradient(90deg, #b86cff, #ff4fd8)',
                boxShadow: '0 8px 25px rgba(139,92,246,.3)',
              }}
            >
              {course.ctaText || buttonTexts.register}
            </a>
            <a
              href="#syllabus"
              className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-purple-500 hover:text-white"
              style={{
                border: '2px solid #a16eff',
                color: '#a16eff',
              }}
            >
              {buttonTexts.syllabus}
            </a>
          </div>

          {/* Alert Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full animate-pulse" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold" style={{ color: '#1f1138' }}>{alertTexts.spotsLeft}</span>
          </div>
        </div>
      </section>

      {/* Who Is It For - למי זה מתאים */}
      <section className="py-20 lg:py-28" style={{ background: '#fff' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
            {sectionTitles.whoIsItFor}
          </h2>
          <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
            התוכנית מתאימה למגוון רחב של אנשים
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'הסבת מקצוע',
                icon: '🔄',
                items: ['כיוון קריירה חדש ומבטיח', 'תחום טכנולוגי ללא ידע בקוד', 'מקצוע עם ביקוש גבוה בשוק', 'פוטנציאל השתכרות גבוה'],
              },
              {
                title: 'בעלי עסקים ומנהלים',
                icon: '💼',
                items: ['התמקצעות ארגונית לעובדים', 'האצת תהליכי גדילה (Scale)', 'הפיכת תהליכים לאוטומטיים', 'חסכון בזמן ובמשאבים'],
              },
              {
                title: 'השלמה לאקדמיה',
                icon: '🎓',
                items: ['בוגרי תארים מכלל החוגים', 'לימודי תעודה מקצועיים', 'גישור בין אקדמיה לתעסוקה', 'יתרון תחרותי בקבלה לעבודה'],
              },
              {
                title: 'סוכנויות שיווק ופרסום',
                icon: '📈',
                items: ['הוספת AI לסל המוצרים', 'בידול משמעותי מהמתחרים', 'תהליכים חכמים לקידום וייעול', 'שיפור חווית השירות והמכירה'],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(185,107,254,.22)',
                  boxShadow: '0 6px 22px #f7f0fe',
                }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-black mb-4" style={{ color: '#1f1138' }}>{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#6b7280' }}>
                      <span style={{ color: '#8B5CF6' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now - למה עכשיו */}
      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
            {sectionTitles.whyNow}
          </h2>
          <p className="text-center text-lg mb-16" style={{ color: '#6b7280' }}>
            80% מהאינטראקציות עם לקוחות ינוהלו על ידי סוכני AI בשנת 2027 - Gartner
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #b86cff, #ff4fd8)' }} />

            <div className="space-y-8">
              {[
                { title: 'פער בשוק העבודה', desc: 'הביקוש למפתחי אוטומציות וסוכני AI נמצא בעליה מתמדת, ובעלי עסקים רבים מחפשים מומחים מוסמכים' },
                { title: 'חלון הזדמנויות פתוח', desc: 'השוק בשלב צמיחה והכניסה כעת מעניקה יתרון משמעותי' },
                { title: 'השקעה שמחזירה את עצמה', desc: 'עלות ההשקעה בהכשרה יכולה לחזור אליכם כבר בפרויקט הראשון' },
                { title: 'עובדים איך שנוח לכם', desc: 'ההכשרה מעניקה עצמאות מקצועית אמיתית' },
              ].map((item, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div
                    className="relative p-6 rounded-2xl max-w-md"
                    style={{
                      background: 'rgba(255,255,255,.65)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0,0,0,.05)',
                      boxShadow: '0 6px 22px #f7f0fe',
                    }}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background: 'linear-gradient(90deg, #b86cff, #ff4fd8)', [i % 2 === 0 ? 'left' : 'right']: '-2rem' }} />
                    <h3 className="text-lg font-black mb-2" style={{ color: '#1f1138' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get - מה תקבלו בהכשרה */}
      <section className="py-20 lg:py-28" style={{ background: '#fff' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
            {sectionTitles.whatYouGet}
          </h2>
          <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
            כל מה שצריך להצלחה בתחום
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* During Program */}
            <div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                <span>🎯</span> במהלך התוכנית
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['תיק עבודות', 'הקלטות מפגשים', 'תגבורים (מסלול פרונטלי)', 'מסלול היברידי'].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl text-center" style={{ background: '#f7f0fe', border: '1px solid rgba(185,107,254,.22)' }}>
                    <span className="text-sm font-semibold" style={{ color: '#1f1138' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Completion */}
            <div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2" style={{ color: '#ff4fd8' }}>
                <span>🏆</span> לאחר סיום
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['תעודה מקצועית', 'קהילת בוגרים', 'גישה לפרויקטים אמיתיים', 'אירועים וכנסים'].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl text-center" style={{ background: '#fdf2f8', border: '1px solid rgba(255,79,216,.22)' }}>
                    <span className="text-sm font-semibold" style={{ color: '#1f1138' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights from Payload */}
      {course.highlights && course.highlights.length > 0 && (
        <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
              {sectionTitles.highlights}
            </h2>
            <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
              נושאים מרכזיים בתוכנית
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl transition-all hover:shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,.65)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,.05)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #b86cff, #ff4fd8)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold" style={{ color: '#1f1138' }}>{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Syllabus */}
      {course.syllabus && course.syllabus.length > 0 && (
        <section id="syllabus" className="py-20 lg:py-28" style={{ background: '#fff' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
              {sectionTitles.syllabus}
            </h2>
            <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
              {course.syllabus.length} מפגשים מעשיים
            </p>

            <div className="space-y-4">
              {course.syllabus.map((item, i) => (
                <div
                  key={i}
                  className="relative p-6 rounded-2xl overflow-hidden"
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(185,107,254,.22)',
                    boxShadow: '0 6px 22px #f7f0fe',
                  }}
                >
                  {/* Right gradient border */}
                  <div className="absolute right-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(180deg, #b86cff, #ff4fd8)' }} />

                  <div className="flex items-start gap-4 pr-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(90deg, rgba(184,108,255,.15), rgba(255,79,216,.15))' }}>
                      <span className="text-lg font-black" style={{ color: '#8B5CF6' }}>{item.number || i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#1f1138' }}>{item.title}</h3>
                      {item.description && (
                        <p className="text-sm mb-2" style={{ color: '#6b7280' }}>{item.description}</p>
                      )}
                      {item.topics && item.topics.length > 0 && (
                        <ul className="space-y-1">
                          {item.topics.map((topicItem, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                              <span style={{ color: '#8B5CF6' }}>•</span>
                              {topicItem.text}
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

      {/* Team/Instructors */}
      {instructors.length > 0 && (
        <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
              {sectionTitles.team}
            </h2>
            <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
              המומחים שילוו אתכם
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {instructors.map((instructor) => {
                const instructorImage = instructor.image as Media | null
                return (
                  <div key={instructor.id} className="text-center">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden" style={{ border: '4px solid #fff', boxShadow: '0 10px 40px rgba(139,92,246,.2)' }}>
                      {instructorImage?.url ? (
                        <img src={instructorImage.url} alt={instructor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #b86cff, #ff4fd8)' }}>
                          <span className="text-4xl text-white font-bold">{instructor.name?.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-black mb-1" style={{ color: '#1f1138' }}>{instructor.name}</h3>
                    {instructor.title && (
                      <p className="text-sm font-semibold mb-3" style={{ color: '#8B5CF6' }}>{instructor.title}</p>
                    )}
                    {instructor.shortBio && (
                      <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{instructor.shortBio}</p>
                    )}
                    {instructor.linkedin && (
                      <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: '#0077b5' }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-28" style={{ background: '#fff' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
              {sectionTitles.testimonials}
            </h2>
            <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
              הצטרפו למאות בוגרים מרוצים
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => {
                const testimonialImage = testimonial.image as Media | null
                return (
                  <div
                    key={testimonial.id}
                    className="p-6 rounded-2xl"
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(185,107,254,.22)',
                      boxShadow: '0 6px 22px #f7f0fe',
                    }}
                  >
                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}

                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: '2px solid rgba(185,107,254,.22)' }}>
                        {testimonialImage?.url ? (
                          <img src={testimonialImage.url} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #b86cff, #ff4fd8)' }}>
                            <span className="text-white font-bold">{testimonial.name?.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold" style={{ color: '#1f1138' }}>{testimonial.name}</h4>
                        {testimonial.role && <p className="text-xs" style={{ color: '#8B5CF6' }}>{testimonial.role}</p>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {course.faq && course.faq.length > 0 && (
        <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#1f1138' }}>
              {sectionTitles.faq}
            </h2>
            <p className="text-center text-lg mb-12" style={{ color: '#6b7280' }}>
              יש שאלות? יש לנו תשובות
            </p>

            <div className="space-y-4">
              {course.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,.65)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,.05)',
                  }}
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="font-bold pr-4" style={{ color: '#1f1138' }}>{item.question}</h3>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,92,246,.1)' }}>
                      <svg className="w-4 h-4 group-open:rotate-180 transition-transform" style={{ color: '#8B5CF6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                    {extractTextFromLexical(item.answer) || 'לפרטים נוספים צרו איתנו קשר.'}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #1f1138, #3b1d6e, #581c87)' }}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            {ctaTexts.title}
          </h2>
          <p className="text-white/70 text-lg mb-10">
            {ctaTexts.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1"
              style={{
                background: 'linear-gradient(90deg, #b86cff, #ff4fd8)',
                color: '#fff',
                boxShadow: '0 8px 25px rgba(139,92,246,.4)',
              }}
            >
              {buttonTexts.contact}
            </a>
            <Link
              href="/"
              className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/20"
              style={{
                border: '2px solid rgba(255,255,255,.3)',
                color: '#fff',
              }}
            >
              {buttonTexts.backHome}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span>🎓</span>
              <span>תעודה מקצועית</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>1,000+ בוגרים</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏛️</span>
              <span>בשיתוף אוניברסיטת חיפה</span>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
