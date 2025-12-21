'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const teamMembers = [
  {
    name: 'אוניל סחר',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    bio: 'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים ועשרות סניפים בפריסה ארצית. מומחה לפיתוח עסקי, אפיון תהליכים ובניית פתרונות אוטומציה ו-AI.',
    highlight: 'מרצה באוניברסיטת חיפה ובטכניון',
  },
  {
    name: 'שחר דדיה, עו"ד',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    bio: 'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים נרחבים בארץ ובעולם. מתמחה באפיון והטמעת מערכי אוטומציה וסוכני AI לעסקים, ומשלב בין ידע משפטי להבנה טכנולוגית עמוקה.',
    highlight: 'מרצה באוניברסיטת חיפה, בטכניון ובמוסדות מובילים נוספים',
  },
  {
    name: 'כפיר קורן',
    role: 'מתכנת ומפתח מערכות',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    bio: 'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית, האוטומציה ופיתוח מערכות חכמות. שירת כמפקד ומדריך בכיר בחיל האוויר.',
    highlight: 'מנחה הכשרות AI ומפתח מערכות לחברות בתעשייה',
  },
]

const Team = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="team"
      className="py-16 sm:py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            צוות המרצים
          </h2>
          <p className="text-gray-600">
            המומחים שילוו אתכם לאורך ההכשרה
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center p-5 sm:p-6 rounded-2xl bg-white border border-purple-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-3 border-purple-200 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100 mb-4">
                {member.role}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{member.bio}</p>
              <p className="text-purple-500 text-xs font-medium">{member.highlight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
