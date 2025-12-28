'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Types for CMS data
interface SyllabusItem {
  number: number
  title: string
  description: string
  tools: string[]
  highlight?: boolean
}

interface WhyNowCard {
  title: string
  description: string
  color?: string
}

interface CohortItem {
  startDate: string
  endDate?: string | null
  format: 'in-person' | 'online' | 'hybrid'
  dayOfWeek: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
  startTime: string
  endTime: string
  location?: string | null
  price: number
  originalPrice?: number | null
  priceNote?: string | null
  maxStudents?: number | null
  availableSeats?: number | null
  registrationOpen?: boolean | null
}

interface AIReadyClientProps {
  syllabusData?: SyllabusItem[]
  whyNowData?: WhyNowCard[]
  cohortsData?: CohortItem[]
}

// Hebrew translations for cohorts
const DAYS_HE: Record<string, string> = {
  sunday: 'ראשון',
  monday: 'שני',
  tuesday: 'שלישי',
  wednesday: 'רביעי',
  thursday: 'חמישי',
  friday: 'שישי',
  saturday: 'שבת',
}

const FORMAT_HE: Record<string, string> = {
  'in-person': 'פרונטלי',
  'online': 'אונליין',
  'hybrid': 'היברידי',
}

// n8n Webhook URL
const WEBHOOK_URL = 'https://focus2025.app.n8n.cloud/webhook/73743602-8af3-42d1-90fe-503bd60bf68e'

// Testimonials data
const testimonials = [
  {
    name: 'להב דור',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
    text: 'תודה רבה לכל החבר\'ה המדהימים על שבוע מעניין ומאתגר. תודה מיוחדת לאוניל, שחר וכפיר על הובלה דינמית, הקניית כלים וערכים לעתיד ושיתוף הידע. אני המלצתי כבר לכמה חברים על הקורס.',
  },
  {
    name: 'בני מוזס',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/5_iudgl3.jpg',
    text: 'הדבר שהכי עוזר לי בלמידה בקורס הוא התמיכה האישית מהמרצים, ההסברים הברורים והיכולת להתנסות במערכת תוך כדי הלמידה.',
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
    text: 'השיעור הראשון היום היה ממש מעניין! פיתחתי סוכן קטן שייעץ בנושא כושר ותזונה וחייבת לכתוב לכם שזה באמת היה מגניב עבורי.',
  },
  {
    name: 'סאוסן פרעוני',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/6_mngwf3.jpg',
    text: 'הייתה חוויה נעימה מאוד, נהניתי מהשילוב בין התיאוריה לפרקטיקה ומהאווירה החיובית של הקבוצה.',
  },
  {
    name: 'אריס חנא',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_ytkcuf.jpg',
    text: 'תודה רבה לכם ולכל הקבוצה! באמת אתם מסבירים מהלב, בסבלנות ובצורה שממש נותנת ביטחון ללמוד.',
  },
]

// Team data
const team = [
  {
    name: 'אוניל סחר',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    bio: 'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים ועשרות סניפים בפריסה ארצית.',
  },
  {
    name: 'שחר דדיה, עו"ד',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    bio: 'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים נרחבים בארץ ובעולם.',
  },
  {
    name: 'כפיר קורן',
    role: 'מתכנת ומפתח מערכות',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    bio: 'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית.',
  },
]

// Audience cards
const audienceCards = [
  { title: 'מנהלים ו-C-Level', description: 'שרוצים להוביל טרנספורמציה דיגיטלית ולקבל החלטות אסטרטגיות מבוססות חדשנות.' },
  { title: 'ראשי צוותים', description: 'שמעוניינים לייעל את עבודת הצוות, לשפר תהליכים ולהטמיע כלי AI בשגרות היומיומיות.' },
  { title: 'יזמים ובעלי עסקים', description: 'שרוצים לחסוך שעות עבודה, לייעל תהליכים ולהקדים את המתחרים עם כלים חדשניים.' },
  { title: 'אנשי מקצוע שרוצים להתפתח', description: 'שמחפשים להרחיב את סט הכלים שלהם ולהישאר רלוונטיים בשוק העבודה המשתנה.' },
  { title: 'סקרנים טכנולוגיים', description: 'שרוצים להבין לעומק מה AI יכול לעשות בשבילם - גם ללא רקע טכני קודם.' },
  { title: 'מובילי חדשנות', description: 'שרוצים להפוך ל"כוכבים" בארגון שלהם ולהוביל את המהפכה הטכנולוגית מבפנים.' },
  { title: 'אנשי שיווק ופרסום', description: 'מנהלי סוכנויות, מנהלי סושיאל ואנשי קריאייטיב שרוצים לייצר תוכן מהר יותר ובאיכות גבוהה.' },
  { title: 'סטודנטים וחיילים משוחררים', description: 'שרוצים להיכנס לשוק העבודה עם יתרון משמעותי ושליטה בכלי ה-AI המתקדמים.' },
]

// Default Syllabus data (fallback)
const defaultSyllabus: SyllabusItem[] = [
  {
    number: 1,
    title: 'מבוא לבינה מלאכותית והנדסת פרומפטים',
    description: 'מבוא מקיף לעולם ה-AI, היכרות עם מודלי שפה גדולים ויכולות הכלים המובילים. למידה מעמיקה של עקרונות חשיבה ובניית בקשות מדויקות.',
    tools: ['ChatGPT', 'Claude', 'Prompt Engineering'],
  },
  {
    number: 2,
    title: 'מחקר חכם ובניית סוכני AI',
    description: 'בניית סוכנים חכמים המיועדים לכל מטרה אישית או מקצועית. ביצוע מחקר ואיסוף מידע לבניית בסיס ידע איכותי. כל משתתף יבנה סוכן AI פעיל!',
    tools: ['GPTs Builder', 'Perplexity', 'AI Agents'],
  },
  {
    number: 3,
    title: 'סיכום פגישות, עיבוד מסמכים ויצירת מצגות',
    description: 'למידה מעמיקה של כלים לניתוח מסמכים, תמלול וסיכום פגישות, עיבוד תוכן מורכב ובניית תובנות. יצירת מצגות מקצועיות.',
    tools: ['GenSpark', 'NotebookLM', 'Google AI Studio'],
  },
  {
    number: 4,
    title: 'יצירת תמונות וסרטונים בכלים חדשניים',
    description: 'יצירת תמונות ווידאו מקצועיים באמצעות כלי AI מתקדמים. כתיבת פרומפטים יצירתיים, עריכת תמונות קיימות, והפקת סרטונים קצרים.',
    tools: ['DALL-E', 'Midjourney', 'Kling AI'],
  },
  {
    number: 5,
    title: 'בניית דשבורדים חכמים',
    description: 'בניית דשבורדים אינטראקטיביים לצרכים ניהוליים ועסקיים. הגדרת ויזואליזציה של נתונים, מעקב אחר KPIs, והפקת תובנות מהירות.',
    tools: ['Lovable', 'Dashboards', 'Data Visualization'],
  },
  {
    number: 6,
    title: 'אפיון עסקי, איסוף מידע ויצירת דשבורדים',
    description: 'שיטות לאיסוף מידע איכותי ומיפוי תהליכים בארגון, זיהוי נקודות כאב, צווארי בקבוק ואבדן יעילות.',
    tools: ['BPMN', 'RACI', 'Dashboards'],
  },
  {
    number: 7,
    title: 'דפי נחיתה, מיילים מעוצבים ואוטומציה',
    description: 'יסודות הפיתוח לבניית דפי נחיתה ומיילים שיווקיים מעוצבים. שימוש נכון בכותרות, טקסטים, תמונות, כפתורי פעולה ואוטומציות.',
    tools: ['n8n', 'Landing Pages', 'Automation'],
  },
  {
    number: 8,
    title: 'יישום מעשי ופרויקט אישי',
    description: 'התכלית של כל ההכשרה! יישום כל היכולות שנרכשו בפרויקט אמיתי מהארגון או מהעסק שלכם. בניית פתרון מבוסס AI, ליווי צמוד ומשוב.',
    tools: ['פרויקט אמיתי', 'ליווי צמוד'],
    highlight: true,
  },
]

// Gallery images
const galleryImages = [
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513070/WhatsApp_Image_2025-11-30_at_16.29.03_n0casb.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513071/WhatsApp_Image_2025-11-30_at_16.29.04_1_qfl4j2.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513069/WhatsApp_Image_2025-11-30_at_16.29.03_1_ttrimh.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513600/Generated_Image_November_28_2025_-_10_13PM_s4lv23.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513069/WhatsApp_Image_2025-11-30_at_16.29.04_f6lckc.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675923/IMG_8298_vhl1gz.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675925/IMG_9174_zl2imh.jpg',
  'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675925/IMG_8910_oqlk56.jpg',
]

// Client logos
const clientLogos = [
  'https://focusai.co.il/wp-content/uploads/2025/11/32-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/33-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/34-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/37-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/36-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/33-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/29-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/28-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/27-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/25-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/635434-150x150.png',
]

// Default Why Now cards (fallback)
const defaultWhyNowCards: WhyNowCard[] = [
  {
    title: 'פער משמעותי בשוק העבודה',
    description: 'ארגונים מפטרים עובדים שלא יודעים לעבוד עם AI ומחפשים מועמדים שמבינים איך ליישם את הכלים האלה בפועל.',
    color: 'red',
  },
  {
    title: 'ROI מהשבוע הראשון',
    description: 'שימוש נכון בכלי AI מניב תוצאות כבר מהשבוע הראשון - חיסכון משמעותי בשעות עבודה, דיוק גבוה יותר במשימות.',
    color: 'green',
  },
  {
    title: 'אימוץ מהיר בארגונים',
    description: 'ארגונים בכל הגדלים מטמיעים כלי AI לשיפור יעילות ותקשורת. מי שיודע להוביל את השינוי הזה - מקבל יתרון משמעותי.',
    color: 'blue',
  },
  {
    title: 'העתיד כבר כאן',
    description: 'הביקוש למיומנויות AI רק ימשיך לצמוח בשנים הקרובות. להתחיל עכשיו זה לא "להיות מוקדם" - זה להיות בזמן.',
    color: 'purple',
  },
]

// Default Cohorts (fallback)
const defaultCohorts: CohortItem[] = [
  {
    startDate: '2026-02-27',
    format: 'in-person',
    dayOfWeek: 'friday',
    startTime: '09:00',
    endTime: '12:00',
    location: 'הרצליה פיתוח - Nolton House',
    price: 4900,
    originalPrice: 7900,
    priceNote: 'מחיר השקה מוקדם',
    maxStudents: 20,
    availableSeats: 15,
    registrationOpen: true,
  },
  {
    startDate: '2026-02-27',
    format: 'online',
    dayOfWeek: 'friday',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Zoom',
    price: 2490,
    originalPrice: 3900,
    priceNote: 'מחיר השקה מוקדם',
    registrationOpen: true,
  },
]

// Form submission helper
async function submitToWebhook(data: Record<string, string>) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  formData.append('source', 'ai-ready-landing-page')
  formData.append('timestamp', new Date().toISOString())

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })

    // Fire Meta Pixel Lead event
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (action: string, event: string) => void }).fbq) {
      (window as unknown as { fbq: (action: string, event: string) => void }).fbq('track', 'Lead')
    }

    return true
  } catch {
    return false
  }
}

// Contact Form Component
function ContactForm({ formType, compact = false }: { formType: 'short-form' | 'full-form', compact?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    track: '',
    company: '',
    role: '',
    message: '',
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) return

    setIsSubmitting(true)

    const trackSelect = document.querySelector(`select[name="track"]`) as HTMLSelectElement
    const trackText = trackSelect?.options[trackSelect.selectedIndex]?.text || formData.track

    await submitToWebhook({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      role: formData.role,
      message: formData.message,
      consent: formData.consent ? 'yes' : 'no',
      track: trackText,
      formType,
    })

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-[#a855f7]/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">הצעד הראשון נעשה!</h3>
        <p className="text-gray-600 text-center text-lg mb-2">קיבלנו את הפרטים שלך בהצלחה</p>
        <p className="text-[#a855f7] font-medium text-center mb-5">נציג מהצוות שלנו יחזור אליך בקרוב</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        <div>
          <label className="text-sm font-medium text-gray-600">שם מלא <span className="text-[#ec4899]">*</span></label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
            placeholder="ישראל ישראלי"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">טלפון <span className="text-[#ec4899]">*</span></label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
            placeholder="050-0000000"
          />
        </div>
      </div>

      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        <div>
          <label className="text-sm font-medium text-gray-600">אימייל <span className="text-[#ec4899]">*</span></label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
            placeholder="name@email.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">מסלול מועדף</label>
          <select
            name="track"
            value={formData.track}
            onChange={(e) => setFormData({ ...formData, track: e.target.value })}
            className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
          >
            <option value="">בחרו מסלול</option>
            <option value="frontal">פרונטלי - הרצליה פיתוח</option>
            <option value="zoom">Zoom - אונליין</option>
            <option value="undecided">עדיין לא החלטתי</option>
          </select>
        </div>
      </div>

      {!compact && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">שם העסק / חברה</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">תפקיד</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
                placeholder="לדוגמה: מנהל שיווק"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">הערות נוספות</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900 resize-none"
              placeholder="נשמח לשמוע עוד קצת עלייך"
            />
          </div>
        </>
      )}

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 w-5 h-5 rounded border-2 border-purple-200 text-[#a855f7]"
        />
        <span className="text-sm text-gray-600 leading-relaxed">
          קראתי ואני מאשר/ת את{' '}
          <a href="https://focusai.co.il/privacy-policy/" target="_blank" className="text-[#a855f7] underline">
            מדיניות הפרטיות
          </a>{' '}
          ואת{' '}
          <a href="https://focusai.co.il/תנאי-שימוש/" target="_blank" className="text-[#a855f7] underline">
            תנאי השימוש
          </a>{' '}
          <span className="text-[#ec4899]">*</span>
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative overflow-hidden w-full px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70"
      >
        <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
        <span className="relative">{isSubmitting ? 'שולח...' : 'שלחו פרטים'}</span>
      </button>
    </form>
  )
}

// Rotating Text Component
function RotatingHeadline() {
  const [textIndex, setTextIndex] = useState(0)
  const texts = [
    { line1: 'ARE YOU', line2: 'AI READY?', dir: 'ltr' },
    { line1: 'הכשרה לשימוש', line2: 'בכלי AI', dir: 'rtl' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [texts.length])

  const current = texts[textIndex]

  return (
    <h1
      className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6 text-gray-900 leading-tight transition-all duration-500"
      dir={current.dir}
    >
      <span className="block">{current.line1}</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
        {current.line2}
      </span>
    </h1>
  )
}

export default function AIReadyClient({ syllabusData, whyNowData, cohortsData }: AIReadyClientProps) {
  // Use provided data or fallback to defaults
  const syllabus = syllabusData && syllabusData.length > 0 ? syllabusData : defaultSyllabus
  const whyNowCards = whyNowData && whyNowData.length > 0 ? whyNowData : defaultWhyNowCards
  const cohorts = cohortsData && cohortsData.length > 0 ? cohortsData : defaultCohorts

  // Get the next cohort for the badge
  const nextCohort = cohorts[0]
  const nextCohortDateFormatted = nextCohort
    ? new Date(nextCohort.startDate).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '27.02.2026'

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4">
        <nav className="mx-auto max-w-7xl">
          <div className="backdrop-blur-xl bg-white/70 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(168,85,247,0.08)]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://focusai.co.il/wp-content/uploads/2025/10/cropped-focus-ai-logo-e1729850518699.png"
                alt="Focus AI"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#syllabus" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">סילבוס</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">מחירים</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">המלצות</a>
              <a href="#team" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">צוות</a>
            </div>
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg hover:shadow-[0_8px_25px_rgba(168,85,247,0.4)] transition-all duration-300"
            >
              הרשמה
            </a>
          </div>
        </nav>
      </header>

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-purple-50 via-white to-pink-50">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-72 h-72 bg-[#a855f7]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#ec4899]/15 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <RotatingHeadline />

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 md:mb-10 leading-relaxed px-4">
                8 מפגשים מעשיים שייקחו אותך מ&quot;מה זה בכלל AI?&quot; ל&quot;אני בונה דפי נחיתה, מצגות, דשבורדים, סוכני AI, ועוד... בעצמי!&quot;
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 max-w-3xl">
                {[
                  { number: '8', label: 'מפגשים' },
                  { number: '30', label: 'שעות אקדמיות' },
                  { number: '100%', label: 'מעשי' },
                  { number: '∞', label: 'אפשרויות' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a855f7] to-[#ec4899] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 px-4 sm:px-0 mb-10">
                <a
                  href="#contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                  <span className="relative">אני רוצה ללמוד לעשות את זה</span>
                </a>
                <a
                  href="#syllabus"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full border-2 border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7] hover:text-white transition-all duration-300"
                >
                  מה בדיוק לומדים?
                </a>
              </div>

              {/* Next Cohort Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-sm font-bold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-gray-700">
                  המחזור הקרוב נפתח ב-<span className="text-gray-900 font-bold">{nextCohortDateFormatted}</span> | {nextCohort?.location || 'הרצליה פיתוח'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section id="why-now" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                למה <span className="text-[#a855f7]">עכשיו</span> זה הזמן?
              </h2>
              <p className="text-gray-600 text-lg">
                AI כבר כאן, והוא משנה את חוקי המשחק. השאלה היא אם תהיו חלק מהשינוי או תרוצו אחריו.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {whyNowCards.map((card, index) => (
                <article
                  key={index}
                  className="bg-white/80 p-6 rounded-2xl border border-purple-100 hover:border-[#a855f7]/40 transition-all duration-300 flex gap-5 items-start"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      card.color === 'red' ? 'bg-red-500/20 text-red-400' :
                      card.color === 'green' ? 'bg-green-500/20 text-green-400' :
                      card.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-[#a855f7]/20 text-[#a855f7]'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus Section */}
        <section id="syllabus" className="py-20 lg:py-32 bg-gradient-to-b from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                סילבוס במיקוד <span className="text-[#a855f7]">יישומי ופרקטי</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                8 מפגשים שייקחו אותכם מהבסיס לשליטה מלאה בכלי AI המתקדמים ביותר
              </p>

              {/* Tools Tags */}
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-4">
                {['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'NotebookLM', 'n8n', 'Lovable', 'Kling AI'].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-purple-50/50 border border-purple-100 text-sm text-gray-600 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-[#a855f7] font-bold text-lg">וכל הכלים המתקדמים ביותר בעולם</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {syllabus.map((item) => (
                <article
                  key={item.number}
                  className={`group relative p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl overflow-hidden ${
                    item.highlight
                      ? 'bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/10 border-[#a855f7]/30 hover:border-[#ec4899]/50'
                      : 'bg-white/80 border-purple-50 hover:border-[#a855f7]/40'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#a855f7]/10 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                          item.highlight
                            ? 'bg-gradient-to-br from-[#ec4899] to-[#a855f7] shadow-pink-900/30'
                            : 'bg-gradient-to-br from-[#a855f7] to-[#ec4899] shadow-purple-300/30'
                        }`}
                      >
                        <span className="text-white font-bold">{item.number}</span>
                      </div>
                      <div>
                        <span className={`text-xs font-bold ${item.highlight ? 'text-[#ec4899]' : 'text-[#a855f7]'}`}>
                          מפגש {item.number}{item.highlight ? ' - גמר' : ''}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#ec4899] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.highlight
                              ? 'bg-white/20 text-gray-900'
                              : 'bg-purple-100 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section id="audience" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                למי ההכשרה <span className="text-[#a855f7]">מתאימה?</span>
              </h2>
              <p className="text-gray-600 text-lg">
                ההכשרה מיועדת לכל רמה טכנולוגית - מאנשים שמעולם לא נגעו ב-AI ועד משתמשים מנוסים שרוצים לשלוט בכלים המתקדמים ביותר.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceCards.map((card, index) => (
                <article
                  key={index}
                  className="group relative p-6 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-[#a855f7]/50 transition-all duration-300 hover:-translate-y-2 hover:bg-purple-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-300/30 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 lg:py-32 bg-gradient-to-b from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                מה <span className="text-[#a855f7]">מקבלים</span> בהכשרה?
              </h2>
              <p className="text-gray-600 text-lg">לא רק ידע תיאורטי - אלא כלים מעשיים, ליווי צמוד ותוצאות אמיתיות</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { number: '8', label: 'מפגשים מעשיים' },
                { number: '30', label: 'שעות אקדמיות' },
                { number: '10+', label: 'כלי AI מתקדמים' },
                { number: '100%', label: 'מעשי ויישומי' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 rounded-2xl p-6 border border-purple-100 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-300/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a855f7] to-[#ec4899] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Benefits list */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 rounded-3xl p-8 md:p-10 border border-purple-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'גישה מלאה להקלטות המפגשים',
                    'חומרי לימוד ותרגול מקיפים',
                    'ליווי צמוד של צוות המרצים',
                    'גישה לקהילת בוגרים מקצועית',
                    'תעודה מקצועית בסיום ההכשרה',
                    'פרויקט גמר אישי עם משוב',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                מסלולי <span className="text-[#a855f7]">הכשרה</span>
              </h2>
              <p className="text-gray-600 text-lg">בחרו את המסלול שמתאים לכם - פרונטלי בהרצליה פיתוח או אונליין ב-Zoom</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {cohorts.map((cohort, index) => {
                const isRecommended = index === 0 || cohort.format === 'in-person'
                const formatLabel = FORMAT_HE[cohort.format] || cohort.format
                const dayLabel = DAYS_HE[cohort.dayOfWeek] || cohort.dayOfWeek
                const cohortStartDate = new Date(cohort.startDate).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })

                const features = cohort.format === 'in-person'
                  ? ['8 מפגשים פרונטליים', 'ליווי צמוד של צוות המרצים', 'אפשרות להצטרף גם ב-Zoom', 'גישה להקלטות המפגשים', 'קהילת בוגרים מקצועית', 'תעודה מטעם Focus AI']
                  : ['8 מפגשים ב-Zoom', 'גישה מלאה להקלטות', 'חומרי לימוד מלאים', 'קהילת בוגרים מקצועית', 'תעודה מטעם Focus AI', 'גמישות מכל מקום']

                return (
                  <article
                    key={index}
                    className={`relative rounded-3xl p-8 border overflow-hidden flex flex-col ${
                      isRecommended
                        ? 'bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/10 border-[#a855f7]/30'
                        : 'bg-purple-50/50 border-purple-100 hover:border-[#a855f7]/40'
                    } transition-all duration-300`}
                  >
                    {isRecommended && (
                      <>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a855f7]/20 blur-[60px] rounded-full pointer-events-none" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 bg-[#a855f7] text-white text-xs font-bold px-3 py-1 rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <polygon points="10 1 12.5 7.5 19 8 14 13 15.5 19.5 10 16 4.5 19.5 6 13 1 8 7.5 7.5" />
                            </svg>
                            מומלץ
                          </span>
                        </div>
                      </>
                    )}

                    <div className="relative z-10 pt-6 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">מסלול {formatLabel}</h3>
                        <p className="text-gray-600 text-sm">{cohort.location || 'אונליין'} | ימי {dayLabel} | {cohort.startTime}-{cohort.endTime}</p>
                        <p className="text-[#a855f7] text-xs mt-1">התחלה: {cohortStartDate}</p>
                      </div>

                      <div className="text-center mb-6">
                        {cohort.originalPrice && (
                          <div className="text-gray-600 text-sm line-through mb-1">{cohort.originalPrice.toLocaleString()} ₪</div>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl font-black text-gray-900">{cohort.price.toLocaleString()}</span>
                          <span className="text-xl text-gray-600">₪</span>
                        </div>
                        {cohort.priceNote && (
                          <p className="text-[#a855f7] text-sm font-bold mt-2">{cohort.priceNote}</p>
                        )}
                        {cohort.availableSeats && (
                          <p className="text-orange-500 text-xs mt-2 font-medium">נותרו {cohort.availableSeats} מקומות</p>
                        )}
                      </div>

                      <div className="space-y-3 mb-8">
                        {features.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-600 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className={`mt-auto w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 ${
                          isRecommended
                            ? 'group relative overflow-hidden bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)]'
                            : 'border-2 border-[#a855f7] text-gray-900 hover:bg-[#a855f7]/10'
                        }`}
                      >
                        {isRecommended && (
                          <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                        )}
                        <span className="relative">הרשמה למסלול {formatLabel}</span>
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Next Cohort */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-gray-700 font-medium">
                  המחזור הקרוב נפתח ב-<span className="text-gray-900 font-bold">{nextCohortDateFormatted}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 mb-6">
                <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm font-bold text-[#a855f7]">מה אומרים עלינו</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                הסטודנטים שלנו{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">מספרים</span>
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 rounded-2xl p-6 border border-purple-100 hover:border-[#a855f7]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)]"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#a855f7]/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-6 left-6 text-[#a855f7]/20">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#a855f7]/30 shadow-lg">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-[#a855f7]">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">&ldquo;{testimonial.text}&rdquo;</p>
                  </div>

                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl md:text-4xl font-black mb-4">
                רגעים מההכשרות <span className="text-[#a855f7]">שלנו</span>
              </h2>
              <p className="text-gray-600">הצצה לאווירה, לאנשים ולחוויה</p>
            </header>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((img, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-48 mx-2 rounded-2xl overflow-hidden">
                  <Image src={img} alt="תמונה מההכשרה" width={256} height={192} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-purple-100 pb-16">
              {[
                { number: '2,000+', label: 'משתתפים שהוכשרו' },
                { number: '50+', label: 'ארגונים וחברות' },
                { number: '98%', label: 'שביעות רצון' },
                { number: '100+', label: 'הכשרות בוצעו' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a855f7] to-[#ec4899] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <header className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                הסיפור של <span className="text-[#a855f7]">Focus AI</span>
              </h2>
            </header>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 rounded-3xl p-8 md:p-12 border border-purple-100">
                <div className="text-gray-600 leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    החברה הוקמה על־ידי <strong className="text-gray-900">שחר דדיה</strong> ו
                    <strong className="text-gray-900">אוניל סחר</strong>, מומחים לעולמות האוטומציה, החדשנות והעסקים, אשר
                    חיברו בין ניסיון ניהולי עשיר בתחום הקמעונאות, השיווק והייעוץ הארגוני - לבין מומחיות טכנולוגית בפיתוח
                    פתרונות AI מתקדמים.
                  </p>

                  <p>
                    Focus AI מפעילה מערך הכשרה אקדמית והדרכה רחב עבור ארגונים, מוסדות חינוך וגופים ציבוריים, הכולל תכניות
                    לימודי תעודה יוקרתיות בשיתוף מוסדות מובילים כמו{' '}
                    <strong className="text-[#a855f7]">אוניברסיטת חיפה</strong> ו
                    <strong className="text-[#a855f7]">הטכניון</strong>.
                  </p>

                  <p className="text-gray-900 font-medium">
                    החזון שלנו: להנגיש את מהפכת הבינה המלאכותית לכל אדם ולכל עסק בישראל – ולהוביל שינוי עמוק בדרך שבה
                    אנשים עובדים, יוצרים ומתקדמים בעולם הדיגיטלי החדש.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                צוות <span className="text-[#a855f7]">המרצים</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">המומחים שילוו אתכם לאורך ההכשרה</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <article
                  key={index}
                  className="group bg-purple-50/50 rounded-3xl p-8 border border-purple-100 hover:border-[#a855f7]/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-5">
                      <div className="absolute inset-0 bg-[#a855f7] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full border-4 border-purple-100 relative z-10"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] border border-purple-200 font-semibold mb-4">
                      {member.role}
                    </span>
                    <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Carousel */}
        <section className="py-16 lg:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <header className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl md:text-5xl font-black">
                הלקוחות שלנו כבר
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">
                  AI Ready
                </span>
                , ואתם?
              </h2>
            </header>
          </div>

          <div
            className="w-full overflow-hidden py-8"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-28 h-28 mx-3 rounded-2xl bg-white/55 p-3 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Image src={logo} alt="לקוח" width={100} height={100} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-2xl mx-auto">
              <header className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  מוכנים להפוך ל<span className="text-[#a855f7]">AI Ready?</span>
                </h2>
                <p className="text-gray-600 text-lg">עוד צעד קטן ואתם בפנים, בואו נדבר!</p>
              </header>

              <div className="bg-white/80 rounded-3xl p-8 md:p-10 border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <ContactForm formType="full-form" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-purple-50 to-white border-t border-purple-100 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/focus.creative.ai"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 bg-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Focus-AI/61577639435714/"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 bg-white hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://did.li/Focus-community"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 bg-white hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <p className="text-gray-600 text-sm">&copy; 2025 Focus AI. כל הזכויות שמורות.</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-gray-600">
              <a href="mailto:info@focusai.co.il" className="hover:text-[#a855f7] transition-colors">
                info@focusai.co.il
              </a>
              <span className="hidden md:inline text-purple-200">|</span>
              <a href="https://focusai.co.il/תנאי-שימוש/" className="hover:text-[#a855f7] transition-colors">
                תנאי שימוש
              </a>
              <span className="hidden md:inline text-purple-200">|</span>
              <a href="https://focusai.co.il/privacy-policy/" className="hover:text-[#a855f7] transition-colors">
                מדיניות פרטיות
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/972539466408"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)]"
        aria-label="פנייה מהירה בוואצאפ"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  )
}
