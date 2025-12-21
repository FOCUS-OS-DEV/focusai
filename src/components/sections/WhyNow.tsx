'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'פער משמעותי בשוק העבודה',
    desc: 'ארגונים מחפשים עובדים שיודעים לעבוד עם AI. מי שלא מתעדכן - נשאר מאחור.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    title: 'ROI מהשבוע הראשון',
    desc: 'שימוש נכון בכלי AI מניב חיסכון משמעותי בשעות עבודה ודיוק גבוה יותר במשימות.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      </svg>
    ),
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'אימוץ מהיר בארגונים',
    desc: 'ארגונים בכל הגדלים מטמיעים AI. מי שמוביל את השינוי - מקבל יתרון בקריירה.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    title: 'העתיד כבר כאן',
    desc: 'הביקוש למיומנויות AI רק ימשיך לצמוח. להתחיל עכשיו זה להיות בזמן, לא מוקדם.',
  },
]

const WhyNow = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="why-now"
      className="py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #faf8ff 0%, #f3e8ff 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            למה <span className="gradient-text">עכשיו</span> זה הזמן?
          </h2>
          <p className="text-gray-600 text-lg">
            AI כבר כאן, והוא משנה את חוקי המשחק. השאלה היא אם תהיו חלק מהשינוי או תרוצו אחריו.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl flex gap-5 items-start bg-white/80 border border-purple-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-12 h-12 ${reason.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 ${reason.iconColor}`}>
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyNow
