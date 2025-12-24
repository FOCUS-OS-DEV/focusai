import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Ready - הכשרה מקצועית לשימוש בכלי AI | Focus AI',
  description: 'הכשרה ייחודית בת 8 מפגשים להטמעת AI בעבודה היומיומית. למדו את הכלים המתקדמים ביותר מהמומחים המובילים בישראל.',
  keywords: ['AI', 'בינה מלאכותית', 'הכשרה', 'קורס', 'Focus AI', 'ChatGPT', 'אוטומציה'],
}

// Testimonials data
const testimonials = [
  {
    name: 'להב דור',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
    text: 'תודה רבה לכל החבר\'ה המדהימים על שבוע מעניין ומאתגר. תודה מיוחדת לאוניל, שחר וכפיר על הובלה דינמית, הקניית כלים וערכים לעתיד ושיתוף הידע. אני המלצתי כבר לכמה חברים על הקורס ולא רק לגבי החומר הנלמד אלא גם לאופי העברת החומר והתמיכה בסטודנטים לאורך הקורס.',
  },
  {
    name: 'בני מוזס',
    role: 'בוגר הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/5_iudgl3.jpg',
    text: 'הדבר שהכי עוזר לי בלמידה בקורס הוא התמיכה האישית מהמרצים, ההסברים הברורים והיכולת להתנסות במערכת תוך כדי הלמידה. אשתדל ככל יכולתי להניע תהליכים בארגון לטובת הטמעת האוטומציות.',
  },
  {
    name: 'חגית הלמר הרמן',
    role: 'מנהלת המרכז לפיתוח קריירה, אוניברסיטת חיפה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/3_d351xk.jpg',
    text: 'החוויה שלנו בעבודה עם צוות Focus הייתה מדהימה. ההכשרה הועברה בצורה מקצועית וברורה, והסטודנטים קיבלו מענה מיידי ומקיף לכל הצרכים שלהם. התגובות של כלל המשתתפים היו מעל המצופה.',
  },
  {
    name: 'רימא חלאילה',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/1_d3qx5v.jpg',
    text: 'השיעור הראשון היום היה ממש מעניין! פיתחתי סוכן קטן שייעץ בנושא כושר ותזונה וחייבת לכתוב לכם שזה באמת היה מגניב עבורי. החלק המעשי והויזואלי כשחיברנו אותו לממשק היה לי משמעותי בחוויה.',
  },
  {
    name: 'סאוסן פרעוני',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/6_mngwf3.jpg',
    text: 'הייתה חוויה נעימה מאוד, נהניתי מהשילוב בין התיאוריה לפרקטיקה ומהאווירה החיובית של הקבוצה. אני מתכננת לשלב את מה שלמדתי בקורס בפרויקטים באוניברסיטה ובעבודה היומיומית שלי.',
  },
  {
    name: 'אריס חנא',
    role: 'בוגרת הכשרה',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_ytkcuf.jpg',
    text: 'תודה רבה לכם ולכל הקבוצה! באמת אתם מסבירים מהלב, בסבלנות ובצורה שממש נותנת ביטחון ללמוד. מרגישה שאתם לא רק מלמדים אלא גם מלווים ותומכים, וזה עושה את כל ההבדל.',
  },
]

// Team data
const team = [
  {
    name: 'אוניל סחר',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    bio: 'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים ועשרות סניפים בפריסה ארצית. מומחה לפיתוח עסקי, אפיון תהליכים ובניית פתרונות אוטומציה ו-AI.',
  },
  {
    name: 'שחר דדיה, עו"ד',
    role: 'מייסד ומנכ"ל משותף',
    image: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    bio: 'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים נרחבים בארץ ובעולם. מתמחה באפיון והטמעת מערכי אוטומציה וסוכני AI לעסקים.',
  },
  {
    name: 'כפיר קורן',
    role: 'מתכנת ומפתח מערכות',
    image: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    bio: 'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית, האוטומציה ופיתוח מערכות חכמות.',
  },
]

// Audience cards
const audienceCards = [
  { title: 'מנהלים ו-C-Level', description: 'שרוצים להוביל טרנספורמציה דיגיטלית ולקבל החלטות אסטרטגיות מבוססות חדשנות.', icon: 'briefcase' },
  { title: 'ראשי צוותים', description: 'שמעוניינים לייעל את עבודת הצוות, לשפר תהליכים ולהטמיע כלי AI בשגרות היומיומיות.', icon: 'users' },
  { title: 'יזמים ובעלי עסקים', description: 'שרוצים לחסוך שעות עבודה, לייעל תהליכים ולהקדים את המתחרים עם כלים חדשניים.', icon: 'rocket' },
  { title: 'אנשי מקצוע שרוצים להתפתח', description: 'שמחפשים להרחיב את סט הכלים שלהם ולהישאר רלוונטיים בשוק העבודה המשתנה.', icon: 'book' },
  { title: 'סקרנים טכנולוגיים', description: 'שרוצים להבין לעומק מה AI יכול לעשות בשבילם - גם ללא רקע טכני קודם.', icon: 'question' },
  { title: 'מובילי חדשנות', description: 'שרוצים להפוך ל"כוכבים" בארגון שלהם ולהוביל את המהפכה הטכנולוגית מבפנים.', icon: 'lightbulb' },
  { title: 'אנשי שיווק ופרסום', description: 'מנהלי סוכנויות, מנהלי סושיאל ואנשי קריאייטיב שרוצים לייצר תוכן מהר יותר ובאיכות גבוהה.', icon: 'message' },
  { title: 'סטודנטים וחיילים משוחררים', description: 'שרוצים להיכנס לשוק העבודה עם יתרון משמעותי ושליטה בכלי ה-AI המתקדמים.', icon: 'graduation' },
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

function AudienceIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />,
    users: <><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /></>,
    book: <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />,
    question: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></>,
    lightbulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6M10 22h4" /></>,
    message: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
    graduation: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  }
  return (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  )
}

export default function AIReadyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
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
      ` }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4">
        <nav className="mx-auto max-w-7xl">
          <div className="backdrop-blur-xl bg-white/70 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(168,85,247,0.08)]">
            <Link href="/" className="flex items-center gap-2">
              <Image src="https://focusai.co.il/wp-content/uploads/2025/10/cropped-focus-ai-logo-e1729850518699.png" alt="Focus AI" width={100} height={32} className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#syllabus" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">סילבוס</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">מחירים</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">המלצות</a>
              <a href="#team" className="text-sm font-medium text-gray-600 hover:text-[#a855f7] transition-colors">צוות</a>
            </div>
            <a href="#contact" className="px-5 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg hover:shadow-[0_8px_25px_rgba(168,85,247,0.4)] transition-all duration-300">
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text */}
              <div className="text-center lg:text-right">
                {/* AI BUILT badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-sm font-bold text-[#a855f7]">AI BUILT</span>
                </div>

                {/* Headlines */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                  <span className="block">ARE YOU</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">AI READY?</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 lg:mr-0">
                  הכשרה ייחודית בת <strong className="text-[#a855f7]">8 מפגשים</strong> שתלמד אתכם לעבוד עם הכלים המתקדמים ביותר בעולם ה-AI ולהטמיע אותם בעבודה היומיומית שלכם.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100">
                    <span className="text-2xl">🎓</span>
                    <span className="text-sm font-medium text-gray-600">30 שעות אקדמיות</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100">
                    <span className="text-2xl">🏆</span>
                    <span className="text-sm font-medium text-gray-600">תעודת סיום</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100">
                    <span className="text-2xl">💼</span>
                    <span className="text-sm font-medium text-gray-600">100% מעשי</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#contact" className="group relative overflow-hidden px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                    <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                    <span className="relative">הרשמה להכשרה</span>
                  </a>
                  <a href="#syllabus" className="px-8 py-4 text-lg font-bold rounded-full border-2 border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300">
                    לסילבוס המלא
                  </a>
                </div>
              </div>

              {/* Right side - Quick Form */}
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)]">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">רוצים לשמוע עוד?</h2>
                  <p className="text-gray-600">השאירו פרטים ונחזור אליכם תוך 24 שעות</p>
                </div>

                <form className="space-y-4" action="/api/contact" method="POST">
                  <input type="hidden" name="source" value="ai-ready-landing-page" />
                  <input type="hidden" name="formType" value="short-form" />

                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="שם מלא *"
                      required
                      className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="טלפון *"
                      required
                      className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="אימייל *"
                      required
                      className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <select
                      name="track"
                      className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900"
                    >
                      <option value="">מסלול מועדף</option>
                      <option value="frontal">פרונטלי - הרצליה פיתוח</option>
                      <option value="zoom">Zoom - אונליין</option>
                      <option value="undecided">עדיין לא החלטתי</option>
                    </select>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="consent" required className="mt-1 w-5 h-5 rounded border-2 border-purple-200 text-[#a855f7]" />
                    <span className="text-sm text-gray-600">
                      קראתי ואני מאשר/ת את <a href="https://focusai.co.il/privacy-policy/" target="_blank" className="text-[#a855f7] underline">מדיניות הפרטיות</a> ואת <a href="https://focusai.co.il/תנאי-שימוש/" target="_blank" className="text-[#a855f7] underline">תנאי השימוש</a> <span className="text-[#ec4899]">*</span>
                    </span>
                  </div>
                  <button type="submit" className="group relative overflow-hidden w-full px-8 py-3.5 text-base font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                    <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                    <span className="relative">שלחו פרטים</span>
                  </button>
                </form>
              </div>
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
                <article key={index} className="group relative p-6 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-[#a855f7]/50 transition-all duration-300 hover:-translate-y-2 hover:bg-purple-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-300/30 group-hover:scale-110 transition-transform duration-300">
                      <AudienceIcon type={card.icon} />
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
              <p className="text-gray-600 text-lg">
                לא רק ידע תיאורטי - אלא כלים מעשיים, ליווי צמוד ותוצאות אמיתיות
              </p>
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
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a855f7] to-[#ec4899] mb-2">{stat.number}</div>
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
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
              <p className="text-gray-600 text-lg">
                בחרו את המסלול שמתאים לכם - פרונטלי בהרצליה פיתוח או אונליין ב-Zoom
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Frontal Track */}
              <article className="relative bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/10 rounded-3xl p-8 border border-[#a855f7]/30 overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#a855f7]/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#a855f7] text-white text-xs font-bold px-3 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <polygon points="10 1 12.5 7.5 19 8 14 13 15.5 19.5 10 16 4.5 19.5 6 13 1 8 7.5 7.5" />
                    </svg>
                    מומלץ
                  </span>
                </div>

                <div className="relative z-10 pt-6 flex flex-col flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">מסלול פרונטלי</h3>
                    <p className="text-gray-600 text-sm">הרצליה פיתוח | ימי שישי | 9:00-12:00</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-gray-600 text-sm line-through mb-1">7,900 ₪</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-gray-900">4,900</span>
                      <span className="text-xl text-gray-600">₪</span>
                    </div>
                    <p className="text-[#a855f7] text-sm font-bold mt-2">מחיר השקה מוקדם</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {['8 מפגשים פרונטליים', 'ליווי צמוד של צוות המרצים', 'אפשרות להצטרף גם ב-Zoom', 'גישה להקלטות המפגשים', 'קהילת בוגרים מקצועית', 'תעודה מטעם Focus AI'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="mt-auto group relative overflow-hidden w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                    <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                    <span className="relative">הרשמה למסלול פרונטלי</span>
                  </a>
                </div>
              </article>

              {/* Zoom Track */}
              <article className="relative bg-purple-50/50 rounded-3xl p-8 border border-purple-100 hover:border-[#a855f7]/40 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="relative z-10 flex flex-col flex-grow pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">מסלול Zoom</h3>
                    <p className="text-gray-600 text-sm">אונליין | ימי שישי | 9:00-12:00</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-gray-600 text-sm line-through mb-1">3,900 ₪</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-gray-900">2,490</span>
                      <span className="text-xl text-gray-600">₪</span>
                    </div>
                    <p className="text-[#a855f7] text-sm font-bold mt-2">מחיר השקה מוקדם</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {['8 מפגשים ב-Zoom', 'גישה מלאה להקלטות', 'חומרי לימוד מלאים', 'קהילת בוגרים מקצועית', 'תעודה מטעם Focus AI', 'גמישות מכל מקום'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="mt-auto w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full border-2 border-[#a855f7] text-gray-900 hover:bg-[#a855f7]/10 transition-all duration-300 transform hover:-translate-y-1">
                    הרשמה למסלול Zoom
                  </a>
                </div>
              </article>
            </div>

            {/* Next Cohort */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-gray-700 font-medium">המחזור הקרוב נפתח ב-<span className="text-gray-900 font-bold">27.02.2026</span></span>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-bold text-[#a855f7]">מה אומרים עלינו</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                הסטודנטים שלנו <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">מספרים</span>
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group relative bg-white/80 rounded-2xl p-6 border border-purple-100 hover:border-[#a855f7]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)]">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#a855f7]/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-6 left-6 text-[#a855f7]/20">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#a855f7]/30 shadow-lg">
                        <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="w-full h-full object-cover" />
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

          <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
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
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a855f7] to-[#ec4899] mb-2">{stat.number}</div>
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
                    החברה הוקמה על־ידי <strong className="text-gray-900">שחר דדיה</strong> ו<strong className="text-gray-900">אוניל סחר</strong>, מומחים לעולמות האוטומציה, החדשנות והעסקים, אשר חיברו בין ניסיון ניהולי עשיר בתחום הקמעונאות, השיווק והייעוץ הארגוני - לבין מומחיות טכנולוגית בפיתוח פתרונות AI מתקדמים.
                  </p>

                  <p>
                    Focus AI מפעילה מערך הכשרה אקדמית והדרכה רחב עבור ארגונים, מוסדות חינוך וגופים ציבוריים, הכולל תכניות לימודי תעודה יוקרתיות בשיתוף מוסדות מובילים כמו <strong className="text-[#a855f7]">אוניברסיטת חיפה</strong> ו<strong className="text-[#a855f7]">הטכניון</strong>.
                  </p>

                  <p className="text-gray-900 font-medium">
                    החזון שלנו: להנגיש את מהפכת הבינה המלאכותית לכל אדם ולכל עסק בישראל – ולהוביל שינוי עמוק בדרך שבה אנשים עובדים, יוצרים ומתקדמים בעולם הדיגיטלי החדש.
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
                <article key={index} className="group bg-purple-50/50 rounded-3xl p-8 border border-purple-100 hover:border-[#a855f7]/50 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-5">
                      <div className="absolute inset-0 bg-[#a855f7] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <Image src={member.image} alt={member.name} width={128} height={128} className="w-full h-full object-cover rounded-full border-4 border-purple-100 relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] border border-purple-200 font-semibold mb-4">{member.role}</span>
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
                הלקוחות שלנו כבר<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">AI Ready</span>, ואתם?
              </h2>
            </header>
          </div>

          <div className="w-full overflow-hidden py-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-28 h-28 mx-3 rounded-2xl bg-white/55 p-3 flex items-center justify-center hover:scale-105 transition-transform">
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

                <form className="relative z-10 space-y-6" action="/api/contact" method="POST">
                  <input type="hidden" name="source" value="ai-ready-landing-page" />
                  <input type="hidden" name="formType" value="full-form" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">שם מלא <span className="text-[#ec4899]">*</span></label>
                      <input type="text" name="name" required className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900" placeholder="ישראל ישראלי" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">אימייל <span className="text-[#ec4899]">*</span></label>
                      <input type="email" name="email" required className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900" placeholder="name@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">טלפון <span className="text-[#ec4899]">*</span></label>
                      <input type="tel" name="phone" required className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900" placeholder="050-0000000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">שם העסק / חברה</label>
                      <input type="text" name="company" className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">תפקיד</label>
                      <input type="text" name="role" className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900" placeholder="לדוגמה: מנהל שיווק" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">מסלול מועדף</label>
                      <select name="track" className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900">
                        <option value="">בחרו מסלול</option>
                        <option value="frontal">פרונטלי - הרצליה פיתוח</option>
                        <option value="zoom">Zoom - אונליין</option>
                        <option value="undecided">עדיין לא החלטתי</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">הערות נוספות</label>
                    <textarea name="message" rows={3} className="w-full mt-2 px-4 py-3 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/50 outline-none transition-all text-gray-900 resize-none" placeholder="נשמח לשמוע עוד קצת עלייך" />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="consent" required className="mt-1 w-5 h-5 rounded border-2 border-purple-200 text-[#a855f7]" />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      קראתי ואני מאשר/ת את <a href="https://focusai.co.il/privacy-policy/" target="_blank" className="text-[#a855f7] underline">מדיניות הפרטיות</a> ואת <a href="https://focusai.co.il/תנאי-שימוש/" target="_blank" className="text-[#a855f7] underline">תנאי השימוש</a>, ומסכים/ה לקבל מידע שיווקי. <span className="text-[#ec4899]">*</span>
                    </span>
                  </div>

                  <button type="submit" className="group relative overflow-hidden w-full px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                    <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 transition-all duration-700 ease-out group-hover:left-[200%]" />
                    <span className="relative">שלחו פרטים</span>
                  </button>
                </form>
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
              <a href="https://www.instagram.com/focus.creative.ai" target="_blank" rel="noopener" className="w-10 h-10 bg-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Focus-AI/61577639435714/" target="_blank" rel="noopener" className="w-10 h-10 bg-white hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://did.li/Focus-community" target="_blank" rel="noopener" className="w-10 h-10 bg-white hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-100">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <p className="text-gray-600 text-sm">
              &copy; 2025 Focus AI. כל הזכויות שמורות.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-gray-600">
              <a href="mailto:info@focusai.co.il" className="hover:text-[#a855f7] transition-colors">info@focusai.co.il</a>
              <span className="hidden md:inline text-purple-200">|</span>
              <a href="https://focusai.co.il/תנאי-שימוש/" className="hover:text-[#a855f7] transition-colors">תנאי שימוש</a>
              <span className="hidden md:inline text-purple-200">|</span>
              <a href="https://focusai.co.il/privacy-policy/" className="hover:text-[#a855f7] transition-colors">מדיניות פרטיות</a>
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
