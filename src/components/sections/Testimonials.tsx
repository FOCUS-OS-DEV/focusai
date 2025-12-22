'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { Testimonial as TestimonialType, Media } from '@/payload-types'

// Fallback testimonials for when no data from Payload
const fallbackTestimonials = [
  {
    name: 'להב דור',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
    text: "תודה רבה לכל החבר'ה המדהימים על שבוע מעניין ומאתגר. תודה מיוחדת לאוניל, שחר וכפיר על הובלה דינמית, הקניית כלים וערכים לעתיד ושיתוף הידע. אני המלצתי כבר לכמה חברים על הקורס.",
  },
  {
    name: 'בני מוזס',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_mhxqwk.jpg',
    text: 'הקורס הכי מעשי שעברתי. יצאתי עם כלים אמיתיים שאני משתמש בהם כל יום בעבודה. המרצים מקצועיים ונגישים, והאווירה הייתה מעולה.',
  },
  {
    name: 'חגית הלמר הרמן',
    role: 'מנהלת המרכז לפיתוח קריירה, אוניברסיטת חיפה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/3_d351xk.jpg',
    text: 'החוויה שלנו בעבודה עם צוות Focus הייתה מדהימה. ההכשרה הועברה בצורה מקצועית וברורה, והסטודנטים קיבלו מענה מיידי ומקיף לכל הצרכים שלהם.',
  },
  {
    name: 'רימא חלאילה',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/1_d3qx5v.jpg',
    text: 'השיעור הראשון היום היה ממש מעניין! פיתחתי סוכן קטן שייעץ בנושא כושר ותזונה. החלק המעשי והויזואלי היה משמעותי בחוויה. הייתה זמינות טוטאלית של המרצים.',
  },
  {
    name: 'סאוסן פרעוני',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/5_ybwqej.jpg',
    text: 'קורס מצוין! למדתי איך להשתמש בכלי AI בצורה חכמה ויעילה. המרצים היו סבלניים והסבירו הכל בצורה ברורה. ממליצה בחום!',
  },
  {
    name: 'אריס חנא',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/6_qbvfmz.jpg',
    text: 'הקורס פתח לי את העיניים לעולם חדש של אפשרויות. הגישה המעשית והידיים על המקלדת עזרו לי להבין באמת איך להשתמש בכלים האלה.',
  },
]

interface TestimonialsProps {
  testimonials?: TestimonialType[]
  sectionTitle?: string | null
}

// Convert Payload Testimonial to display format
interface DisplayTestimonial {
  name: string
  role: string
  image: string
  text: string
}

function testimonialToDisplay(t: TestimonialType, index: number): DisplayTestimonial {
  const image = t.image as Media | null
  return {
    name: t.name,
    role: t.role || 'בוגר/ת הכשרה',
    image: image?.url || fallbackTestimonials[index % fallbackTestimonials.length].image,
    text: t.content,
  }
}

const Stars = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
)

const Testimonials = ({ testimonials: payloadTestimonials, sectionTitle }: TestimonialsProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Use testimonials from Payload or fallback
  const displayTestimonials: DisplayTestimonial[] = payloadTestimonials && payloadTestimonials.length > 0
    ? payloadTestimonials.map((t, i) => testimonialToDisplay(t, i))
    : fallbackTestimonials

  return (
    <section
      id="testimonials"
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
            {sectionTitle || <>מה אומרים <span className="gradient-text">הבוגרים</span></>}
          </h2>
          <p className="text-gray-600 text-lg">
            בוגרי ההכשרות שלנו משתפים את החוויה שלהם
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl relative bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-purple-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-200 shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-purple-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Stars */}
              <Stars />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
