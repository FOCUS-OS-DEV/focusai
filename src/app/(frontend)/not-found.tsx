import Link from 'next/link'

export default function FrontendNotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center py-20"
      dir="rtl"
      style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}
    >
      <div className="text-center px-4 max-w-lg">
        {/* Icon and 404 */}
        <div className="mb-8">
          <span className="text-6xl mb-4 block">🔍</span>
          <div
            className="text-8xl md:text-9xl font-black"
            style={{
              background: 'linear-gradient(90deg, #b86cff, #ff4fd8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          הדף לא נמצא
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          לא מצאנו את מה שחיפשת. אולי הדף הועבר או שהקישור שגוי?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:-translate-y-1"
            style={{
              background: 'linear-gradient(90deg, #b86cff, #ff4fd8)',
              boxShadow: '0 8px 25px rgba(139,92,246,.3)',
            }}
          >
            חזרה לדף הבית
          </Link>

          <Link
            href="/courses"
            className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-purple-500 hover:text-white"
            style={{
              border: '2px solid #a16eff',
              color: '#a16eff',
              background: 'white',
            }}
          >
            גלו את הקורסים
          </Link>
        </div>
      </div>
    </main>
  )
}
