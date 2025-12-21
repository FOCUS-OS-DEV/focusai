'use client'

import { useEffect, useRef, useState } from 'react'

export default function Story() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)',
      }}
    >
      {/* Background elements */}
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[300px] h-[300px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            הסיפור של <span className="gradient-text">Focus AI</span>
          </h2>
        </div>

        {/* Story Content */}
        <div className="space-y-8">
          {/* Founders */}
          <div
            className={`p-6 md:p-8 rounded-2xl bg-white/80 border border-purple-100 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              החברה הוקמה על־ידי{' '}
              <span className="text-purple-600 font-semibold">שחר דדיה</span> ו
              <span className="text-purple-600 font-semibold">אוניל סחר</span>, מומחים לעולמות
              האוטומציה, החדשנות והעסקים, אשר חיברו בין ניסיון ניהולי עשיר בתחום הקמעונאות, השיווק
              והייעוץ הארגוני - לבין מומחיות טכנולוגית בפיתוח פתרונות AI מתקדמים.
            </p>
          </div>

          {/* The Bridge */}
          <div
            className={`p-6 md:p-8 rounded-2xl bg-white/80 border border-purple-100 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              לאחר שנים של ניהול ועבודה עם ארגונים גדולים, הבנו שחייבים לבנות{' '}
              <span className="text-gray-900 font-medium">גשר אמיתי</span> בין עולמות הניהול
              והאסטרטגיה לבין עולמות הפיתוח והטכנולוגיה.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Focus AI מפעילה מערך הכשרה אקדמית והדרכה רחב עבור ארגונים, מוסדות חינוך וגופים
              ציבוריים, הכולל תכניות לימודי תעודה יוקרתיות בשיתוף מוסדות מובילים כמו{' '}
              <span className="text-gray-900 font-medium">אוניברסיטת חיפה</span> ו
              <span className="text-gray-900 font-medium">הטכניון</span>, וכן סדנאות AI פנים־ארגוניות
              מותאמות אישית לצרכי כל חברה - משלב האבחון ועד לשילוב כלים חכמים בשגרת העבודה.
            </p>
          </div>

          {/* Learn from practitioners */}
          <div
            className={`p-6 md:p-8 rounded-2xl relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              ללמוד ממי שעושים את זה בעצמם!
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              לצד מערך ההכשרות, Focus AI מפעילה{' '}
              <span className="text-purple-600 font-medium">חטיבת אינטגרציה</span> שמפתחת פתרונות AI
              מותאמים אישית לחברות וארגונים ממגוון תעשיות.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              אנחנו מפתחים אוטומציות חכמות, סוכני AI, צ&apos;אטבוטים מתקדמים ומערכות שלמות שמשנות את
              הדרך שבה עסקים עובדים.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              הידע שלנו מגיע מהשטח! מפרויקטים ואתגרים אמיתיים ופתרונות שעובדים. חלק ממקרי הבוחן
              שיוצגו בהכשרה הם מלקוחות אמיתיים שלנו.
            </p>
          </div>

          {/* Vision */}
          <div
            className={`text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-lg font-bold text-purple-600 mb-4">החזון שלנו</h3>
            <p className="text-gray-900 text-xl md:text-2xl leading-relaxed font-medium">
              להנגיש את מהפכת הבינה המלאכותית לכל אדם ולכל עסק בישראל – ולהוביל שינוי עמוק בדרך שבה
              אנשים עובדים, יוצרים ומתקדמים בעולם הדיגיטלי החדש.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
