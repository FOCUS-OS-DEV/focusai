'use client'

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf8ff 0%, #f3e8ff 50%, #fce7f3 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-gray-700">הרשמה למחזור הקרוב פתוחה</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up">
            <span className="gradient-text">Focus AI</span>
            <span className="text-gray-900"> Academy</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed animate-fade-in-up animation-delay-100">
            מרכז ההכשרות המוביל בישראל לעולם ה-AI
          </p>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-150">
            הכשרות מעשיות שייקחו אתכם מ&ldquo;מה זה בכלל AI?&rdquo; לשליטה מלאה בכלים המתקדמים ביותר
            - ויכולת ליישם אותם בעבודה כבר מהשבוע הראשון
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-200">
            <button
              onClick={() => scrollTo('programs')}
              className="group relative px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-98"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                גלו את המסלולים
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 rounded-full font-bold text-lg text-purple-600 border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105 active:scale-98"
            >
              שיחת ייעוץ חינם
            </button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-purple-200 animate-fade-in animation-delay-500">
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold gradient-text">50+</span>
                <span>ארגונים</span>
              </div>
              <div className="w-px h-6 bg-purple-200" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold gradient-text">1,000+</span>
                <span>בוגרים</span>
              </div>
              <div className="w-px h-6 bg-purple-200" />
              <div className="flex items-center gap-2">
                <span>בשיתוף</span>
                <span className="text-gray-700 font-medium">הטכניון</span>
                <span>&amp;</span>
                <span className="text-gray-700 font-medium">אוניברסיטת חיפה</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
