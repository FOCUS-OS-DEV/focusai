const benefits = [
  {
    title: 'למידה מעשית',
    desc: 'תתרגלו על כלים אמיתיים ותצאו עם פרויקט עובד',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'ליווי אקדמי',
    desc: 'בליווי היחידה ללימודי חוץ באוניברסיטת חיפה. התוכנית מועברת גם בטכניון',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: 'קהילת בוגרים',
    desc: 'גישה לקהילה פעילה של אנשי AI ותמיכה מתמשכת',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'מרצים מהשטח',
    desc: 'יזמים ומנהלים שעובדים עם AI כל יום',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            למה Focus AI Academy?
          </h2>
          <p className="text-gray-600 text-lg">
            אנחנו לא עוד קורס אונליין. אנחנו מרכז הכשרות שמביא תוצאות.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl group bg-white/80 hover:bg-white border border-purple-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-500 mb-3 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Phone Mockup placeholder */}
          <div className="order-1 lg:order-2 px-4 sm:px-0">
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px] mx-auto">
              {/* Phone shadow */}
              <div className="absolute inset-4 bg-black/30 rounded-[50px] blur-2xl translate-y-6" />

              {/* Simple Phone Frame */}
              <div className="relative bg-[#1a1a1a] rounded-[50px] p-[3px] shadow-2xl">
                <div className="bg-black rounded-[47px] p-[10px]">
                  <div className="relative bg-[#075E54] rounded-[38px] overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[85px] h-[24px] bg-[#1a1a1a] rounded-full z-30" />

                    {/* WhatsApp Header */}
                    <div className="pt-12 pb-4 px-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
                        <img
                          src="https://res.cloudinary.com/dfudxxzlj/image/upload/v1765367021/FOCUSAI_LOGO-02_3_keeam5.png"
                          alt="Focus AI"
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <p className="text-white font-semibold">Focus AI Academy</p>
                      <p className="text-white/80 text-sm">מקליד...</p>
                    </div>

                    {/* Chat Preview */}
                    <div className="bg-[#ECE5DD] p-4 h-[280px]">
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg rounded-tr-none p-3 max-w-[80%] shadow-sm">
                          <p className="text-sm text-gray-800">היי, איך אני יכול לשלב AI במחלקה שלנו?</p>
                        </div>
                        <div className="bg-[#D9FDD3] rounded-lg rounded-tl-none p-3 max-w-[80%] mr-auto shadow-sm">
                          <p className="text-sm text-gray-800">היי! שאלה מעולה 🙌</p>
                        </div>
                        <div className="bg-[#D9FDD3] rounded-lg rounded-tl-none p-3 max-w-[80%] mr-auto shadow-sm">
                          <p className="text-sm text-gray-800">יש לנו כמה מסלולים שיכולים לעזור...</p>
                        </div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="bg-[#F0F0F0] py-3">
                      <div className="w-32 h-1 bg-black rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
