export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf5ff, #f3e8ff 50%, #fce7f3)',
      }}
    >
      {/* Floating shapes */}
      <div
        className="absolute w-[500px] h-[500px] top-[-100px] right-[-100px] rounded-full opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] bottom-[-50px] left-[-50px] rounded-full opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '1.5s',
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 bg-white/80 backdrop-blur-xl border border-purple-100 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-gray-700">המחזור הקרוב נפתח ב-29.12.2025</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              הפכו את הארגון
              <span className="block gradient-text">למעצמת AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 leading-relaxed lg:mr-0 mx-auto">
              אנחנו מגשרים על הפער בין אנשים לטכנולוגיה, ומטמיעים בינה מלאכותית{' '}
              <strong className="text-gray-900">בצורה חכמה, מעשית ואנושית.</strong>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">50+</div>
                <div className="text-sm text-gray-500">חברות וארגונים</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">100+</div>
                <div className="text-sm text-gray-500">פרויקטי AI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">8</div>
                <div className="text-sm text-gray-500">מוסדות אקדמיה</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#programs"
                className="group px-8 py-4 rounded-full text-white font-bold text-lg inline-flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
                }}
              >
                <span>גלו את התוכניות</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all inline-flex items-center justify-center gap-2"
              >
                <span>שיחת ייעוץ חינם</span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-300/30">
              <img
                src="https://res.cloudinary.com/dfudxxzlj/image/upload/c_crop,g_center,z_1.08/v1765302030/Gemini_Generated_Image_bsjx1jbsjx1jbsjx_phattj.png"
                alt="AI Training"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1138]/60 to-transparent" />
              <div className="absolute bottom-6 right-6 left-6">
                <p className="text-white text-sm mb-2">בשיתוף אקדמי עם</p>
                <div className="flex items-center gap-4">
                  <span className="text-white/80 text-sm font-medium">🎓 אוניברסיטת חיפה</span>
                  <span className="text-white/80 text-sm font-medium">🎓 הטכניון</span>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-xl max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">החזר השקעה</p>
                  <p className="font-bold text-gray-900">תוך 30 יום</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
