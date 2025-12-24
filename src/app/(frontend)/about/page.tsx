import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Instructor, Media } from '@/payload-types'
import { getSharedContent, formatStat } from '@/lib/getSharedContent'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'אודות | Focus AI Academy',
  description: 'למדו על Focus AI Academy - האקדמיה המובילה ללימודי בינה מלאכותית בישראל. צוות מומחים, קורסים מעשיים וליווי אישי.',
  openGraph: {
    title: 'אודות Focus AI Academy',
    description: 'האקדמיה המובילה ללימודי AI בישראל',
  },
}

// Default values
const defaultValues = [
  {
    icon: '🎯',
    title: 'מעשיות',
    description: 'כל קורס מבוסס על פרויקטים אמיתיים ומקרי בוחן מהשטח. אתם לומדים דברים שתוכלו ליישם מיד בעסק או בקריירה.',
  },
  {
    icon: '💡',
    title: 'חדשנות',
    description: 'אנחנו תמיד בחזית הטכנולוגיה, מעדכנים את התכנים ומתאימים אותם לכלים והטרנדים החדשים ביותר בעולם ה-AI.',
  },
  {
    icon: '🤝',
    title: 'תמיכה אישית',
    description: 'קבוצות קטנות, ליווי צמוד, ותמיכה גם אחרי הקורס. אנחנו כאן בשבילכם לאורך כל הדרך.',
  },
  {
    icon: '🚀',
    title: 'תוצאות',
    description: 'המטרה שלנו היא לא רק ללמד - אלא לוודא שאתם מצליחים ליישם את הידע ולהשיג תוצאות עסקיות אמיתיות.',
  },
]

const defaultMissionParagraphs = [
  'ב-Focus AI Academy, אנחנו מאמינים שהבינה המלאכותית היא לא רק עתיד - היא ההווה. המטרה שלנו היא להנגיש את הידע והכלים הכי מתקדמים בתחום ה-AI לכל אחד ואחת שרוצים להוביל את המהפכה הדיגיטלית.',
  'אנחנו מציעים קורסים מעשיים, מותאמים אישית ומבוססי פרויקטים אמיתיים, שמאפשרים לכם ליישם את הידע מיד בעסק או בקריירה שלכם.',
]

// Fallback instructors data
const fallbackInstructors = [
  {
    name: 'אוניל סחר',
    title: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    shortBio: 'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים. מומחה לפיתוח עסקי ואוטומציה.',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'שחר דדיה, עו"ד',
    title: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    shortBio: 'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים. מתמחה באפיון והטמעת מערכי אוטומציה וסוכני AI.',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'כפיר קורן',
    title: 'מתכנת ומפתח מערכות',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    shortBio: 'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית והאוטומציה.',
    linkedin: 'https://linkedin.com',
  },
]

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const { pages, stats, contact } = await getSharedContent()

  // Get about page content from Pages global
  const aboutContent = pages?.about

  let instructors: Instructor[] = []

  try {
    const result = await payload.find({
      collection: 'instructors',
      depth: 1,
      sort: 'order',
    })
    instructors = result.docs
  } catch (error) {
    console.error('Error fetching instructors:', error)
  }

  // Use fetched instructors or fallback
  const displayInstructors = instructors.length > 0 ? instructors : null

  // Get values from CMS or use defaults
  const values = aboutContent?.values && aboutContent.values.length > 0
    ? aboutContent.values
    : defaultValues

  // Get mission paragraphs
  const missionParagraphs = aboutContent?.mission?.paragraphs && aboutContent.mission.paragraphs.length > 0
    ? aboutContent.mission.paragraphs.map(p => p.text)
    : defaultMissionParagraphs

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)' }}>
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#a855f7]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#ec4899]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            {aboutContent?.hero?.title || 'אנחנו'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
              {aboutContent?.hero?.titleHighlight || 'Focus AI Academy'}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutContent?.hero?.subtitle || 'האקדמיה המובילה בישראל ללימודי בינה מלאכותית ואוטומציה עסקית. אנחנו מכשירים את הדור הבא של מובילי המהפכה הדיגיטלית.'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Mission text */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-6">
                {aboutContent?.mission?.badge || 'המשימה שלנו'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {aboutContent?.mission?.title || 'להפוך את הבינה המלאכותית'}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
                  {' '}{aboutContent?.mission?.titleHighlight || 'לנגישה לכולם'}
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                {missionParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl mb-3">🎓</div>
                    <div className="text-2xl font-bold text-gray-900">{formatStat(stats.graduates)}</div>
                    <div className="text-gray-600 text-sm">{stats.graduates.label}</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl mb-3">🏢</div>
                    <div className="text-2xl font-bold text-gray-900">{formatStat(stats.companies)}</div>
                    <div className="text-gray-600 text-sm">{stats.companies.label}</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-2xl font-bold text-gray-900">{formatStat(stats.courses)}</div>
                    <div className="text-gray-600 text-sm">{stats.courses.label}</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl mb-3">⭐</div>
                    <div className="text-2xl font-bold text-gray-900">{formatStat(stats.satisfaction)}</div>
                    <div className="text-gray-600 text-sm">{stats.satisfaction.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/80 text-purple-700 mb-4">
              הערכים שלנו
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              מה מנחה אותנו
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-3xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-4">
              {aboutContent?.team?.badge || 'הצוות שלנו'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {aboutContent?.team?.title || 'הכירו את המומחים'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {aboutContent?.team?.subtitle || 'צוות מומחים מהשורה הראשונה בתחום הבינה המלאכותית והאוטומציה, עם ניסיון מוכח בהטמעת פתרונות AI בחברות מובילות'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayInstructors ? (
              displayInstructors.map((instructor, index) => {
                const image = instructor.image as Media | null
                const imageUrl = image?.url

                return (
                  <div
                    key={instructor.id || index}
                    className="text-center p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-pink-50 border border-purple-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold">
                          {instructor.name?.[0] || '?'}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                    {instructor.title && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100 mb-4">
                        {instructor.title}
                      </span>
                    )}
                    {instructor.shortBio && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {instructor.shortBio}
                      </p>
                    )}

                    {/* LinkedIn */}
                    {instructor.linkedin && (
                      <a
                        href={instructor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                )
              })
            ) : (
              // Fallback instructors
              fallbackInstructors.map((instructor, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-pink-50 border border-purple-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100 mb-4">
                    {instructor.title}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {instructor.shortBio}
                  </p>

                  {/* LinkedIn */}
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatStat(stats.graduates)}
              </div>
              <div className="text-white/80 font-medium">
                {stats.graduates.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatStat(stats.courses)}
              </div>
              <div className="text-white/80 font-medium">
                {stats.courses.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatStat(stats.companies)}
              </div>
              <div className="text-white/80 font-medium">
                {stats.companies.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatStat(stats.satisfaction)}
              </div>
              <div className="text-white/80 font-medium">
                {stats.satisfaction.label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)] text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {aboutContent?.cta?.title || 'מוכנים להצטרף?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              {aboutContent?.cta?.subtitle || 'בואו נדבר על איך Focus AI Academy יכולה לעזור לכם להוביל את המהפכה הדיגיטלית'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={aboutContent?.cta?.primaryButton?.link || '/courses'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-300/30 bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] transition-all"
              >
                <span>{aboutContent?.cta?.primaryButton?.text || 'הקורסים שלנו'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <a
                href={aboutContent?.cta?.secondaryButton?.link || `https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-[#25D366] text-white shadow-lg shadow-green-300/30 hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>{aboutContent?.cta?.secondaryButton?.text || 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
