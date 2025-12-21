const trainings = [
  {
    id: 1,
    title: 'Bot-Camp',
    subtitle: 'הכשרת מפתחי אוטומציות וסוכני AI',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513070/WhatsApp_Image_2025-11-30_at_16.29.03_n0casb.jpg',
    startDate: '29.12.2025',
    endDate: '23.03.2026',
    sessions: 12,
    day: 'ימי שני',
    hours: '17:00 - 21:00',
    link: 'https://focusai.co.il/bot-camp/',
    badge: 'נפתח בקרוב',
    accentColor: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'AI READY',
    subtitle: 'שליטה בכלי AI מתקדמים',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513071/WhatsApp_Image_2025-11-30_at_16.29.04_1_qfl4j2.jpg',
    startDate: '27.02.2026',
    endDate: '17.04.2026',
    sessions: 8,
    day: 'ימי שישי',
    hours: '09:00 - 12:00',
    link: 'https://focusai.co.il/ai-ready/',
    badge: 'מחזור חדש',
    accentColor: 'from-blue-500 to-cyan-400',
  },
  {
    id: 3,
    title: 'Bot-Camp',
    subtitle: 'הכשרת מפתחי אוטומציות וסוכני AI',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513070/WhatsApp_Image_2025-11-30_at_16.29.03_n0casb.jpg',
    startDate: '06.04.2026',
    endDate: '29.06.2026',
    sessions: 12,
    day: 'ימי שני',
    hours: '17:00 - 21:00',
    link: 'https://focusai.co.il/bot-camp/',
    badge: null,
    accentColor: 'from-purple-500 to-pink-500',
  },
]

function ScheduleCard({ training }: { training: typeof trainings[0] }) {
  return (
    <a
      href={training.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/30 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={training.image}
            alt={training.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {training.badge && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${training.accentColor}`}>
              {training.badge}
            </div>
          )}

          <div className="absolute bottom-3 right-3">
            <h3 className="text-xl font-bold text-white">{training.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className={`text-sm font-medium bg-gradient-to-r ${training.accentColor} bg-clip-text text-transparent mb-4`}>
            {training.subtitle}
          </p>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-800">{training.startDate}</span>
              <span className="text-gray-400">עד</span>
              <span>{training.endDate}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{training.day}</span>
              <span className="text-gray-400">|</span>
              <span>{training.hours}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{training.sessions} מפגשים</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-purple-100">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${training.accentColor} transition-all duration-300 group-hover:shadow-lg`}>
              <span>למידע נוסף והרשמה</span>
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #f3e8ff 0%, #faf8ff 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            לוח <span className="gradient-text">הכשרות</span>
          </h2>
          <p className="text-gray-600 text-lg">
            המחזורים הקרובים שנפתחים להרשמה
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training) => (
            <ScheduleCard key={training.id} training={training} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-3">לא מצאתם מועד שמתאים לכם?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <span>דברו איתנו על מועדים נוספים</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
