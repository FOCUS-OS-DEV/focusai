const programs = [
  {
    id: 1,
    number: '01',
    title: 'Bot-Camp',
    subtitle: 'הכשרת מפתחי אוטומציות וסוכני AI',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513070/WhatsApp_Image_2025-11-30_at_16.29.03_n0casb.jpg',
    description: '12 מפגשים שייקחו אותך מאפס למפתח סוכני AI מוסמך - גם בלי רקע טכנולוגי. תעודה מקצועית בליווי אקדמי של אוניברסיטת חיפה.',
    highlight: { text: 'מקומות אחרונים', type: 'green' },
    bonus: { text: '💰 החזר מלא של ההשקעה תוך ~30 יום מסיום ההכשרה', bg: 'bg-green-50', border: 'border-green-200', textColor: 'text-green-800' },
    tags: ['12 מפגשים', '48 שעות', 'ללא ידע בקוד', 'תעודה'],
    price: '8,500 ₪',
    priceNote: '+ מע"מ',
    link: 'https://focusai.co.il/bot-camp/',
    linkText: 'לפרטים והרשמה',
  },
  {
    id: 2,
    number: '02',
    title: 'AI READY',
    subtitle: 'ARE YOU AI READY?',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513071/WhatsApp_Image_2025-11-30_at_16.29.04_1_qfl4j2.jpg',
    description: '8 מפגשים שייקחו אותך משימוש בסיסי לשליטה מלאה בכלי AI: ChatGPT, Claude, Gemini, Perplexity, NotebookLM ועוד.',
    highlight: { text: 'מחיר השקה', type: 'pink' },
    bonus: { text: '⚡ ROI מהשבוע הראשון - חיסכון משמעותי בשעות עבודה', bg: 'bg-blue-50', border: 'border-blue-200', textColor: 'text-blue-800' },
    tags: ['8 מפגשים', '24 שעות', 'פרונטלי/Zoom', 'קהילת בוגרים'],
    price: '3,900 ₪',
    originalPrice: '6,900 ₪',
    link: 'https://focusai.co.il/ai-ready/',
    linkText: 'לפרטים והרשמה',
  },
  {
    id: 3,
    number: '03',
    title: 'ליווי אישי',
    subtitle: 'יישום מיידי של AI בעסק שלך',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764514113/WhatsApp_Image_2025-11-30_at_16.48.19_u0a1xi.jpg',
    description: 'פגישות 1:1 עם המייסדים - נבנה ביחד פתרונות AI ואוטומציות שתתחיל להשתמש בהם כבר מהמפגש הראשון.',
    highlight: { text: '1:1 עם המייסדים', type: 'purple' },
    bonus: { text: '👤 למי זה מתאים: מנכ"לים, בעלי עסקים ומנהלים בכירים', bg: 'bg-purple-50', border: 'border-purple-200', textColor: 'text-purple-800' },
    tags: ['מותאם אישית', 'יישום מיידי', 'גמיש'],
    price: '800 ₪',
    pricePrefix: 'החל מ-',
    priceSuffix: 'לשעה',
    link: '#contact',
    linkText: 'לתיאום שיחה',
  },
  {
    id: 4,
    number: '04',
    title: 'סדנאות לארגונים',
    subtitle: 'הפכו את הארגון למעצמת AI',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764514114/WhatsApp_Image_2025-11-30_at_16.48.20_da8cf5.jpg',
    description: 'אפיון מעמיק → תפירת סילבוס → הכשרה מעשית → הטמעה וליווי. כל התהליך מותאם לצרכים הספציפיים של הארגון שלכם.',
    highlight: { text: 'לחברות וארגונים', type: 'white' },
    bonus: { text: '🏢 למי זה: מנהלים, צוותי שיווק, טכנולוגיה, HR, Enterprise', bg: 'bg-pink-50', border: 'border-pink-200', textColor: 'text-pink-800' },
    tags: ['סילבוס מותאם', 'Hands-on', 'ליווי להטמעה'],
    price: 'לפי הצעה',
    pricePrefix: 'מחיר',
    link: 'https://focusai.co.il/ai-workshop/',
    linkText: 'שיחת אפיון חינם',
  },
]

function ProgramCard({ program }: { program: typeof programs[0] }) {
  const isExternal = program.link.startsWith('http')

  const highlightStyles = {
    green: 'bg-white/90 text-gray-800',
    pink: 'bg-pink-500/90 text-white',
    purple: 'bg-purple-500/90 text-white',
    white: 'bg-white/90 text-gray-800',
  }

  return (
    <div className="group bg-white/90 backdrop-blur-xl border border-purple-100 rounded-3xl overflow-hidden shadow-lg shadow-purple-100/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/30">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Highlight Badge */}
        {program.highlight && (
          <div className={`absolute top-4 right-4 flex items-center gap-2 backdrop-blur-sm rounded-full px-3 py-1.5 ${highlightStyles[program.highlight.type as keyof typeof highlightStyles]}`}>
            {program.highlight.type === 'green' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            )}
            <span className="text-xs font-bold">{program.highlight.text}</span>
          </div>
        )}

        {/* Title on Image */}
        <div className="absolute bottom-4 right-4 left-4">
          <span className="text-white/70 text-sm">{program.number}</span>
          <h3 className="text-2xl md:text-3xl font-black text-white">{program.title}</h3>
          <p className="text-white/80 text-sm">{program.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          <strong className="text-gray-900">{program.description.split(' - ')[0]}</strong>
          {program.description.includes(' - ') && ` - ${program.description.split(' - ')[1]}`}
        </p>

        {/* Bonus Box */}
        {program.bonus && (
          <div className={`${program.bonus.bg} border ${program.bonus.border} rounded-xl p-3 mb-4`}>
            <p className={`${program.bonus.textColor} text-sm font-medium`}>{program.bonus.text}</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {program.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs text-gray-600 bg-purple-500/10 border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {program.originalPrice && (
              <span className="text-gray-400 text-sm line-through">{program.originalPrice}</span>
            )}
            {program.pricePrefix && (
              <span className="text-gray-500 text-sm">{program.pricePrefix}</span>
            )}
            <span className="text-2xl font-black text-gray-900 mr-2">{program.price}</span>
            {program.priceNote && (
              <span className="text-gray-400 text-sm">{program.priceNote}</span>
            )}
            {program.priceSuffix && (
              <span className="text-gray-400 text-sm">{program.priceSuffix}</span>
            )}
          </div>
          <a
            href={program.link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="px-6 py-3 rounded-full text-white font-bold text-sm inline-flex items-center gap-2 transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
            }}
          >
            <span>{program.linkText}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Programs() {
  return (
    <section id="programs" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-sm font-semibold mb-4">
            מסלולי ההכשרה
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            בחרו את <span className="gradient-text">המסלול</span> שמתאים לכם
          </h2>
          <p className="text-gray-600 text-lg">
            מהכשרות מקיפות ועד סדנאות ממוקדות - יש לנו פתרון לכל רמה ולכל צורך
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">לא בטוחים מה מתאים לכם?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-purple-600 font-bold hover:underline"
          >
            <span>קבעו שיחת ייעוץ חינם ונעזור לכם לבחור</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
