/**
 * All extracted images from the AI Ready HTML page
 * Organized by category for easy reference
 */

export interface ImageData {
  url: string
  filename: string
  alt: string
  category: 'instructor' | 'testimonial' | 'gallery' | 'partner' | 'logo' | 'hero'
}

// ============ LOGO/BRANDING ============
export const logoImages: ImageData[] = [
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765367021/FOCUSAI_LOGO-02_3_keeam5.png',
    filename: 'focusai-logo.png',
    alt: 'Focus AI Logo',
    category: 'logo',
  },
]

// ============ HERO/OG IMAGES ============
export const heroImages: ImageData[] = [
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/c_crop,g_center,z_1.08/v1765302030/Gemini_Generated_Image_bsjx1jbsjx1jbsjx_phattj.png',
    filename: 'og-image.png',
    alt: 'Focus AI Academy - הכשרות AI',
    category: 'hero',
  },
]

// ============ INSTRUCTOR PHOTOS ============
export const instructorImages: ImageData[] = [
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    filename: 'oniel-sahar.png',
    alt: 'אוניל סחר - מייסד ומנכ"ל משותף',
    category: 'instructor',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    filename: 'shahar-dadia.png',
    alt: 'שחר דדיה - מייסד ומנכ"ל משותף',
    category: 'instructor',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    filename: 'kfir-koren.png',
    alt: 'כפיר קורן - מתכנת ומפתח מערכות',
    category: 'instructor',
  },
]

// ============ TESTIMONIAL PHOTOS ============
export const testimonialImages: ImageData[] = [
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
    filename: 'lahav-dor.jpg',
    alt: 'להב דור - בוגר הכשרה',
    category: 'testimonial',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/5_iudgl3.jpg',
    filename: 'beni-mozes.jpg',
    alt: 'בני מוזס - בוגר הכשרה',
    category: 'testimonial',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/3_d351xk.jpg',
    filename: 'hagit-halmer.jpg',
    alt: 'חגית הלמר הרמן - מנהלת המרכז לפיתוח קריירה',
    category: 'testimonial',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/1_d3qx5v.jpg',
    filename: 'rima-halaila.jpg',
    alt: 'רימא חלאילה - בוגרת הכשרה',
    category: 'testimonial',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/6_mngwf3.jpg',
    filename: 'sausen-farauni.jpg',
    alt: 'סאוסן פרעוני - בוגרת הכשרה',
    category: 'testimonial',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_ytkcuf.jpg',
    filename: 'aris-hana.jpg',
    alt: 'אריס חנא - בוגרת הכשרה',
    category: 'testimonial',
  },
]

// ============ GALLERY IMAGES ============
export const galleryImages: ImageData[] = [
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513070/WhatsApp_Image_2025-11-30_at_16.29.03_n0casb.jpg',
    filename: 'gallery-01.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513071/WhatsApp_Image_2025-11-30_at_16.29.04_1_qfl4j2.jpg',
    filename: 'gallery-02.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513069/WhatsApp_Image_2025-11-30_at_16.29.03_1_ttrimh.jpg',
    filename: 'gallery-03.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513600/Generated_Image_November_28_2025_-_10_13PM_s4lv23.jpg',
    filename: 'gallery-04.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513069/WhatsApp_Image_2025-11-30_at_16.29.04_f6lckc.jpg',
    filename: 'gallery-05.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513656/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%A9%D7%9C%D7%98_%D7%97%D7%95%D7%A6%D7%95%D7%AA_%D7%91%D7%95%D7%98_%D7%A7%D7%90%D7%9E%D7%A4_9-16_idbaxk.jpg',
    filename: 'gallery-06.jpg',
    alt: 'תמונה מההכשרה - בוט קאמפ',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513069/WhatsApp_Image_2025-11-30_at_16.29.04_2_r2dtuu.jpg',
    filename: 'gallery-07.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764513630/IMG_0363_1_hul8x7.jpg',
    filename: 'gallery-08.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764514114/WhatsApp_Image_2025-11-30_at_16.48.20_da8cf5.jpg',
    filename: 'gallery-09.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764519896/WhatsApp_Image_2025-11-30_at_18.24.31_1_osvagi.jpg',
    filename: 'gallery-10.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764519897/WhatsApp_Image_2025-11-30_at_18.24.31_apalzp.jpg',
    filename: 'gallery-11.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675923/IMG_8298_vhl1gz.jpg',
    filename: 'gallery-12.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675925/IMG_9174_zl2imh.jpg',
    filename: 'gallery-13.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675925/IMG_8910_oqlk56.jpg',
    filename: 'gallery-14.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
  {
    url: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1764675922/IMG_0497_orbhra.jpg',
    filename: 'gallery-15.jpg',
    alt: 'תמונה מההכשרה',
    category: 'gallery',
  },
]

// ============ PARTNER/CLIENT LOGOS ============
export const partnerImages: ImageData[] = [
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/32-150x150.png',
    filename: 'partner-01.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/33-150x150.png',
    filename: 'partner-02.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/34-150x150.png',
    filename: 'partner-03.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/37-1-150x150.png',
    filename: 'partner-04.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/36-1-150x150.png',
    filename: 'partner-05.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/33-1-150x150.png',
    filename: 'partner-06.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/29-1-150x150.png',
    filename: 'partner-07.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/28-1-150x150.png',
    filename: 'partner-08.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/27-1-150x150.png',
    filename: 'partner-09.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/25-1-150x150.png',
    filename: 'partner-10.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/635434-150x150.png',
    filename: 'partner-11.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/123546321-150x150.png',
    filename: 'partner-12.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/22456-1-150x150.png',
    filename: 'partner-13.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/38-1-150x150.png',
    filename: 'partner-14.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/35-1-150x150.png',
    filename: 'partner-15.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/31-1-150x150.png',
    filename: 'partner-16.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/30-1-150x150.png',
    filename: 'partner-17.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/26-1-150x150.png',
    filename: 'partner-18.png',
    alt: 'לקוח',
    category: 'partner',
  },
  {
    url: 'https://focusai.co.il/wp-content/uploads/2025/11/unnamed-file-1-150x150.png',
    filename: 'partner-19.png',
    alt: 'לקוח',
    category: 'partner',
  },
]

// ============ ALL IMAGES COMBINED ============
export const allImages: ImageData[] = [
  ...logoImages,
  ...heroImages,
  ...instructorImages,
  ...testimonialImages,
  ...galleryImages,
  ...partnerImages,
]

// ============ INSTRUCTOR DATA WITH IMAGES ============
export const instructorsData = [
  {
    name: 'אוניל סחר',
    slug: 'oniel-sahar',
    title: 'מייסד ומנכ"ל משותף',
    shortBio:
      'יזם וסמנכ"ל תפעול ושיווק לשעבר ברשתות קמעונאיות מובילות, עם ניסיון של למעלה מעשור בניהול מאות עובדים ועשרות סניפים בפריסה ארצית.',
    externalImageUrl: 'https://focusai.co.il/wp-content/uploads/2025/10/תמונה-אוניל.png',
    specialties: ['ניהול עסקי', 'אסטרטגיה דיגיטלית', 'AI לעסקים'],
    order: 1,
    featured: true,
  },
  {
    name: 'שחר דדיה, עו"ד',
    slug: 'shahar-dadia',
    title: 'מייסד ומנכ"ל משותף',
    shortBio:
      'עורך דין, יזם ובעל ניסיון רב בשיווק, ניהול פרויקטים והפקת מהלכים עסקיים נרחבים בארץ ובעולם.',
    externalImageUrl: 'https://focusai.co.il/wp-content/uploads/2025/11/63452051.png',
    specialties: ['אוטומציה עסקית', 'סוכני AI', 'משפט וטכנולוגיה'],
    order: 2,
    featured: true,
  },
  {
    name: 'כפיר קורן',
    slug: 'kfir-koren',
    title: 'מתכנת ומפתח מערכות',
    shortBio:
      'בוגר תואר ראשון במדעי המחשב בהצטיינות דיקן, עם ניסיון עשיר בהובלת פרויקטים בתחומי הבינה המלאכותית.',
    externalImageUrl:
      'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765007114/%D7%9B%D7%A4%D7%99%D7%A8_hipy6q.png',
    specialties: ['פיתוח AI', 'אוטומציה', 'מערכות חכמות'],
    order: 3,
    featured: true,
  },
]

// ============ TESTIMONIALS DATA WITH IMAGES ============
export const testimonialsData = [
  {
    name: 'להב דור',
    role: 'בוגר הכשרה',
    content:
      'תודה רבה לכל החבר\'ה המדהימים על שבוע מעניין ומאתגר. תודה מיוחדת לאוניל, שחר וכפיר על הובלה דינמית, הקניית כלים וערכים לעתיד ושיתוף הידע. אני המלצתי כבר לכמה חברים על הקורס.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/4_qhzbdk.jpg',
    rating: 5,
    featured: true,
    status: 'approved' as const,
  },
  {
    name: 'בני מוזס',
    role: 'בוגר הכשרה',
    content:
      'הדבר שהכי עוזר לי בלמידה בקורס הוא התמיכה האישית מהמרצים, ההסברים הברורים והיכולת להתנסות במערכת תוך כדי הלמידה.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/5_iudgl3.jpg',
    rating: 5,
    featured: true,
    status: 'approved' as const,
  },
  {
    name: 'חגית הלמר הרמן',
    role: 'מנהלת המרכז לפיתוח קריירה, אוניברסיטת חיפה',
    content:
      'החוויה שלנו בעבודה עם צוות Focus הייתה מדהימה. ההכשרה הועברה בצורה מקצועית וברורה, והסטודנטים קיבלו מענה מיידי ומקיף לכל הצרכים שלהם.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/3_d351xk.jpg',
    rating: 5,
    featured: true,
    status: 'approved' as const,
  },
  {
    name: 'רימא חלאילה',
    role: 'בוגרת הכשרה',
    content:
      'השיעור הראשון היום היה ממש מעניין! פיתחתי סוכן קטן שייעץ בנושא כושר ותזונה וחייבת לכתוב לכם שזה באמת היה מגניב עבורי.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177220/1_d3qx5v.jpg',
    rating: 5,
    featured: false,
    status: 'approved' as const,
  },
  {
    name: 'סאוסן פרעוני',
    role: 'בוגרת הכשרה',
    content:
      'הייתה חוויה נעימה מאוד, נהניתי מהשילוב בין התיאוריה לפרקטיקה ומהאווירה החיובית של הקבוצה.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177222/6_mngwf3.jpg',
    rating: 5,
    featured: false,
    status: 'approved' as const,
  },
  {
    name: 'אריס חנא',
    role: 'בוגרת הכשרה',
    content:
      'תודה רבה לכם ולכל הקבוצה! באמת אתם מסבירים מהלב, בסבלנות ובצורה שממש נותנת ביטחון ללמוד.',
    externalImageUrl: 'https://res.cloudinary.com/dfudxxzlj/image/upload/v1765177221/2_ytkcuf.jpg',
    rating: 5,
    featured: false,
    status: 'approved' as const,
  },
]

// ============ PARTNERS DATA WITH LOGOS ============
export const partnersData = partnerImages.map((img, index) => ({
  name: `לקוח ${index + 1}`,
  externalLogoUrl: img.url,
  type: 'corporate' as const,
  featured: true,
  order: index + 1,
}))
