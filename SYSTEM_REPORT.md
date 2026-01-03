# Focus AI Academy - System Report

**תאריך:** 2026-01-02
**גרסה:** 1.0.0
**מיקום פרויקט:** `C:\Projects\focus-ai\focusai\focusai-cms`

---

## 1. Executive Summary

Focus AI Academy היא מערכת LMS (Learning Management System) מבוססת Next.js 15 ו-Payload CMS 3.0. המערכת מספקת תשתית מלאה לניהול קורסים, מחזורים, תלמידים, הרשמות, תוכן שיווקי ובלוג.

**נקודות חוזק:**
- ארכיטקטורה מודרנית עם TypeScript מלא
- CMS עוצמתי עם 17 Collections ו-4 Globals
- תמיכה בעברית ו-RTL מובנית
- אחסון מדיה ב-Cloudinary
- SEO מתקדם עם Schema.org

**אתגרים:**
- חלק מפיצ'רי ה-LMS (כמו צפייה בשיעורים) עדיין בפיתוח
- אין מערכת תשלומים מובנית
- חלק מהדפים חסרים (נגישות, תנאי שימוש)

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  Next.js 15.4.10 + React 19.2.3 + Tailwind CSS 4.1.18           │
├─────────────────────────────────────────────────────────────────┤
│                           PAGES                                  │
│  Public: /, /courses, /blog, /about, /contact, /ai-ready        │
│  Auth: /login, /register                                         │
│  Protected: /dashboard                                           │
│  Admin: /admin/* (Payload)                                       │
├─────────────────────────────────────────────────────────────────┤
│                         API LAYER                                │
│  REST API (Payload) + Custom API Routes + GraphQL               │
├─────────────────────────────────────────────────────────────────┤
│                       PAYLOAD CMS 3.69.0                         │
│  17 Collections + 4 Globals + Access Control + Hooks            │
├─────────────────────────────────────────────────────────────────┤
│                        DATABASE                                  │
│  PostgreSQL (via Railway) + Cloudinary (Media)                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| קטגוריה | טכנולוגיה | גרסה |
|---------|-----------|------|
| Framework | Next.js | 15.4.10 |
| CMS | Payload CMS | 3.69.0 |
| Database | PostgreSQL | Railway |
| Language | TypeScript | 5.9.3 |
| Runtime | React | 19.2.3 |
| Styling | Tailwind CSS | 4.1.18 |
| Animation | Framer Motion | 12.23.26 |
| Rich Text | Lexical Editor | 3.69.0 |
| Media Storage | Cloudinary | payload-cloudinary 2.2.1 |
| Image Processing | Sharp | 0.34.2 |
| Testing | Vitest + Playwright | 3.2.3 / 1.57.0 |

### 2.3 File Structure

```
src/
├── app/
│   ├── (frontend)/                  # דפים ציבוריים (14 דפים)
│   │   ├── page.tsx                 # דף הבית
│   │   ├── layout.tsx               # Layout ראשי עם SEO
│   │   ├── about/page.tsx           # דף אודות
│   │   ├── ai-ready/                # דף נחיתה AI Ready
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── AIReadyClient.tsx
│   │   ├── blog/                    # בלוג
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx         # צור קשר
│   │   ├── courses/                 # קורסים
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── dashboard/page.tsx       # אזור אישי (מוגן)
│   │   ├── login/                   # התחברות
│   │   ├── register/                # הרשמה
│   │   ├── thank-you/               # דף תודה
│   │   ├── error.tsx                # Error boundary
│   │   ├── loading.tsx              # Loading state
│   │   ├── not-found.tsx            # 404
│   │   └── styles.css               # Global styles
│   ├── (payload)/                   # Payload Admin
│   │   ├── admin/[[...segments]]/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── api/                         # Custom API Routes (15 routes)
│   │   ├── admin/                   # Admin utilities
│   │   ├── contact/route.ts         # Contact form
│   │   ├── revalidate/route.ts      # Cache revalidation
│   │   ├── seed/route.ts            # Data seeding
│   │   └── ...
│   ├── sitemap.ts                   # Dynamic sitemap
│   └── robots.ts                    # robots.txt
├── collections/                     # 17 Payload Collections
│   ├── Users.ts                     # משתמשים
│   ├── Media.ts                     # מדיה
│   ├── Courses.ts                   # מסלולים
│   ├── Cohorts.ts                   # מחזורים
│   ├── Lessons.ts                   # שיעורים
│   ├── Enrollments.ts               # הרשמות
│   ├── Progress.ts                  # התקדמות
│   ├── Attendance.ts                # נוכחות
│   ├── Assignments.ts               # עבודות
│   ├── Submissions.ts               # הגשות
│   ├── Certificates.ts              # תעודות
│   ├── Posts.ts                     # מאמרים
│   ├── Categories.ts                # קטגוריות
│   ├── Testimonials.ts              # המלצות
│   ├── Instructors.ts               # מרצים
│   ├── Contacts.ts                  # לידים
│   └── Partners.ts                  # שותפים
├── globals/                         # 4 Payload Globals
│   ├── SiteSettings.ts              # הגדרות אתר
│   ├── Navigation.ts                # תפריטים
│   ├── Homepage.ts                  # דף הבית
│   └── Pages.ts                     # תוכן דפים
├── components/                      # React Components (~20)
│   ├── layout/
│   │   ├── Header.tsx               # הדר (client component)
│   │   └── Footer.tsx               # פוטר (server component)
│   ├── sections/                    # Homepage sections (12)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── BrandsCarousel.tsx
│   │   ├── Contact.tsx
│   │   ├── Integration.tsx
│   │   ├── Programs.tsx
│   │   ├── QuickContact.tsx
│   │   ├── Schedule.tsx
│   │   ├── Story.tsx
│   │   ├── Team.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhyNow.tsx
│   ├── ui/
│   │   └── WhatsAppButton.tsx
│   ├── BlogCard.tsx
│   ├── BlogFilter.tsx
│   ├── Breadcrumbs.tsx
│   ├── CourseCard.tsx
│   ├── CoursesFilter.tsx
│   └── RichText.tsx
├── hooks/                           # Custom React Hooks
│   ├── useScrollProgress.ts
│   └── useSmoothScroll.ts
├── lib/                             # Utilities
│   ├── getImageUrl.ts
│   ├── getSharedContent.ts          # Cached content fetching
│   ├── performance.ts               # Performance utilities
│   └── schema/                      # SEO Schema.org
│       ├── index.ts
│       ├── ArticleSchema.tsx
│       ├── CourseSchema.tsx
│       └── OrganizationSchema.tsx
├── migrations/                      # Database migrations
├── seed/                            # Seed data
├── payload.config.ts                # Main Payload config
└── payload-types.ts                 # Auto-generated types
```

---

## 3. Data Model

### 3.1 Collections (17)

#### Core Collections

##### Users
```typescript
Collection: Users
├── Fields:
│   ├── email (auth)
│   ├── password (auth)
│   ├── name (text)
│   ├── phone (text)
│   ├── avatar (upload → media)
│   ├── role (select: admin/instructor/student)
│   └── enrolledCourses (relationship → courses, hasMany)
├── Auth: true (JWT with saveToJWT for role)
├── Access:
│   ├── create: () => true
│   ├── read: self or admin
│   ├── update: self or admin
│   └── delete: admin only
└── Labels: משתמש / משתמשים
```

##### Media
```typescript
Collection: Media
├── Fields:
│   ├── alt (text)
│   ├── caption (text)
│   ├── category (select: instructor/testimonial/gallery/partner/logo/hero/other)
│   └── externalUrl (text, conditional)
├── Upload:
│   ├── staticDir: 'media'
│   ├── imageSizes: thumbnail(300x300), card(600x400), hero(1200x600)
│   └── mimeTypes: image/*, application/pdf, video/*
├── Access: read: public
└── Storage: Cloudinary (focusai-academy/)
```

#### Academy Collections

##### Courses (מקור האמת היחיד לתוכן קורסים)
```typescript
Collection: Courses
├── Basic Fields:
│   ├── title (text, required)
│   ├── slug (text, unique)
│   ├── subtitle (text)
│   ├── description (richText)
│   ├── excerpt (textarea)
│   ├── featuredImage (upload → media)
│   └── type (select: frontal/digital/workshop/coaching)
├── Course Details:
│   ├── duration (text)
│   ├── schedule (text)
│   ├── location (text, default: "אריה שנקר 14, הרצליה פיתוח")
│   ├── hasZoom (checkbox, default: true)
│   ├── maxStudents (number, default: 18)
│   ├── instructorRatio (text)
│   ├── certificate (text)
│   └── certificateDescription (textarea)
├── Pricing:
│   ├── price (number, for digital)
│   ├── showPrice (checkbox)
│   └── pricingTracks[] (array: name, schedule, price, originalPrice, priceNote, features[])
├── Cohorts (PRIMARY!):
│   └── cohorts[] (array):
│       ├── startDate (date, required)
│       ├── endDate (date)
│       ├── format (select: in-person/online/hybrid)
│       ├── dayOfWeek (select: sunday-saturday)
│       ├── startTime (text, e.g., "18:00")
│       ├── endTime (text, e.g., "21:00")
│       ├── location (text)
│       ├── price (number, required)
│       ├── originalPrice (number)
│       ├── priceNote (text)
│       ├── maxStudents (number)
│       ├── availableSeats (number)
│       └── registrationOpen (checkbox)
├── Content:
│   ├── whyNow[] (array: icon, title, description)
│   ├── trustBadges[] (array: icon, text, maxRows: 6)
│   ├── highlights[] (array: icon, text)
│   ├── syllabus[] (array: number, title, description, topics[], tools[], icon)
│   ├── faq[] (array: question, answer)
│   └── gallery[] (array: image, caption)
├── Relationships:
│   ├── instructors (relationship → instructors, hasMany)
│   └── testimonials (relationship → testimonials, hasMany)
├── CTA:
│   ├── ctaText (text, default: "השארת פרטים")
│   ├── ctaType (select: contact/purchase/link)
│   └── ctaLink (text)
├── Meta:
│   ├── status (select: draft/published)
│   ├── order (number)
│   ├── featured (checkbox)
│   └── seo (group: metaTitle, metaDescription, ogImage)
├── Access:
│   ├── read: published or admin
│   ├── create/update/delete: admin only
└── Labels: מסלול / מסלולים
```

##### Cohorts
```typescript
Collection: Cohorts
├── Fields:
│   ├── title (text, required)
│   ├── slug (text, unique)
│   ├── course (relationship → courses, required)
│   ├── startDate (date, required)
│   ├── endDate (date)
│   ├── schedule (text)
│   ├── location (text)
│   ├── zoomLink (text)
│   ├── whatsappGroup (text)
│   ├── maxStudents (number, default: 18)
│   ├── instructors (relationship → users, hasMany)
│   ├── status (select: upcoming/active/completed)
│   └── registrationOpen (checkbox)
└── Labels: מחזור / מחזורים
```

##### Lessons
```typescript
Collection: Lessons
├── Fields:
│   ├── title (text, required)
│   ├── slug (text)
│   ├── cohort (relationship → cohorts, required)
│   ├── order (number, required)
│   ├── description (richText)
│   ├── date (date)
│   ├── video (group: type, url, file, duration)
│   ├── materials[] (array: title, file)
│   └── status (select: draft/published)
└── Labels: שיעור / שיעורים
```

##### Enrollments
```typescript
Collection: Enrollments
├── Fields:
│   ├── student (relationship → users, required)
│   ├── cohort (relationship → cohorts, required)
│   ├── status (select: pending/active/completed/cancelled)
│   ├── enrolledAt (date)
│   ├── completedAt (date)
│   ├── paymentStatus (select: pending/paid/refunded)
│   └── notes (textarea)
└── Labels: הרשמה / הרשמות
```

##### Progress
```typescript
Collection: Progress
├── Fields:
│   ├── student (relationship → users, required)
│   ├── lesson (relationship → lessons, required)
│   ├── watched (checkbox)
│   ├── watchedAt (date)
│   ├── watchTime (number, seconds)
│   └── completed (checkbox)
└── Labels: התקדמות / התקדמות
```

##### Attendance
```typescript
Collection: Attendance
├── Fields:
│   ├── student (relationship → users, required)
│   ├── lesson (relationship → lessons, required)
│   ├── cohort (relationship → cohorts, required)
│   ├── date (date, required)
│   ├── present (checkbox)
│   ├── joinedAt (date with time)
│   ├── leftAt (date with time)
│   └── notes (text)
└── Labels: נוכחות / נוכחות
```

##### Assignments
```typescript
Collection: Assignments
├── Fields:
│   ├── title (text, required)
│   ├── description (richText)
│   ├── cohort (relationship → cohorts, required)
│   ├── type (select: homework/exam/project)
│   ├── dueDate (date)
│   ├── attachments[] (array: file)
│   ├── maxScore (number, default: 100)
│   └── status (select: draft/published)
└── Labels: עבודה / עבודות
```

##### Submissions
```typescript
Collection: Submissions
├── Fields:
│   ├── student (relationship → users, required)
│   ├── assignment (relationship → assignments, required)
│   ├── files[] (array: file)
│   ├── notes (textarea)
│   ├── submittedAt (date)
│   ├── score (number)
│   ├── feedback (richText)
│   └── status (select: pending/graded/returned)
└── Labels: הגשה / הגשות
```

##### Certificates
```typescript
Collection: Certificates
├── Fields:
│   ├── student (relationship → users, required)
│   ├── course (relationship → courses, required)
│   ├── cohort (relationship → cohorts)
│   ├── certificateNumber (text, unique)
│   ├── issuedAt (date)
│   ├── file (upload → media)
│   └── status (select: pending/issued/revoked)
└── Labels: תעודה / תעודות
```

#### Content Collections

##### Posts
```typescript
Collection: Posts
├── Fields:
│   ├── title (text, required)
│   ├── slug (text, unique, required)
│   ├── excerpt (textarea, maxLength: 200)
│   ├── content (richText, required)
│   ├── featuredImage (upload → media)
│   ├── category (relationship → categories)
│   ├── author (relationship → users)
│   ├── tags[] (array: tag)
│   ├── cta (group: enabled, text, url, style)
│   ├── relatedCourse (relationship → courses)
│   ├── readTime (number)
│   ├── status (select: draft/published)
│   ├── publishedAt (date)
│   └── seo (group: metaTitle, metaDescription)
├── Access: read: published or admin
└── Labels: מאמר / מאמרים
```

##### Categories
```typescript
Collection: Categories
├── Fields:
│   ├── name (text, required)
│   ├── slug (text, unique, required)
│   ├── description (textarea)
│   ├── color (text, HEX)
│   └── order (number)
└── Labels: קטגוריה / קטגוריות
```

##### Testimonials
```typescript
Collection: Testimonials
├── Fields:
│   ├── name (text, required)
│   ├── role (text)
│   ├── image (upload → media)
│   ├── externalImageUrl (text, conditional)
│   ├── content (textarea, required)
│   ├── rating (number, 1-5)
│   ├── course (relationship → courses)
│   ├── videoUrl (text)
│   ├── featured (checkbox)
│   └── status (select: pending/approved)
└── Labels: המלצה / המלצות
```

##### Instructors
```typescript
Collection: Instructors
├── Fields:
│   ├── name (text, required)
│   ├── slug (text, unique)
│   ├── title (text)
│   ├── bio (richText)
│   ├── shortBio (textarea, maxLength: 200)
│   ├── image (upload → media)
│   ├── externalImageUrl (text, conditional)
│   ├── email (email)
│   ├── linkedin (text)
│   ├── specialties[] (array: specialty)
│   ├── order (number)
│   └── featured (checkbox)
└── Labels: מרצה / מרצים
```

#### Leads Collections

##### Contacts
```typescript
Collection: Contacts
├── Fields:
│   ├── name (text, required)
│   ├── email (email, required)
│   ├── phone (text, required)
│   ├── company (text)
│   ├── interest (select: bot-camp/ai-ready/workshop/coaching/digital/general)
│   ├── message (textarea)
│   └── source (text, auto-set)
└── Labels: ליד / לידים
```

##### Partners
```typescript
Collection: Partners
├── Fields:
│   ├── name (text, required)
│   ├── logo (upload → media)
│   ├── externalLogoUrl (text, conditional)
│   ├── website (text)
│   ├── type (select: academic/corporate/media, required)
│   ├── featured (checkbox)
│   └── order (number)
└── Labels: שותף / שותפים
```

### 3.2 Globals (4)

##### SiteSettings
```typescript
Global: SiteSettings (slug: site-settings)
├── Basic:
│   ├── siteName (text, default: "Focus AI Academy")
│   ├── siteDescription (textarea)
│   ├── logo (upload → media)
│   └── favicon (upload → media)
├── Contact:
│   ├── email (email)
│   ├── phone (text)
│   ├── whatsapp (text)
│   └── address (textarea)
├── Social:
│   ├── facebook, instagram, linkedin
│   ├── youtube, tiktok
├── Tracking:
│   ├── metaPixel, tiktokPixel
│   ├── googleAnalytics, fixdigitalClientKey
├── Scripts:
│   ├── headScripts (code)
│   ├── bodyStartScripts (code)
│   └── footerScripts (code)
├── Pixels[] (array: platform, pixelId, enabled, customScript)
└── Access: read: public, update: admin
```

##### Navigation
```typescript
Global: Navigation (slug: navigation)
├── mainMenu[] (array):
│   ├── label (text, localized)
│   ├── url (text)
│   ├── openInNewTab (checkbox)
│   └── children[] (nested array)
├── footerMenu[] (array: label, url, openInNewTab)
├── ctaButton (group: text, url, isVisible)
└── Access: read: public, update: admin
```

##### Homepage
```typescript
Global: Homepage (slug: homepage)
├── hero (group: title, titleHighlight, subtitle, image, primaryCta, secondaryCta)
├── globalStats (group: graduates, courses, companies, satisfaction)
├── stats[] (legacy array)
├── whyUs[] (array: icon, title, description)
├── about (group: title, subtitle, content, image, features[], cta)
├── sections (group: programs, testimonials, team, partners, legacy fields)
├── newsletter (group: title, description, buttonText, webhookUrl)
├── bottomCta (group: title, subtitle, showForm, showWhatsapp, primaryButton, secondaryButton)
└── Access: read: public, update: admin
```

##### Pages
```typescript
Global: Pages (slug: pages)
├── about (group: hero, mission, values[], team, cta)
├── courses (group: hero, emptyState, cta)
├── blog (group: hero, emptyState, cta, postCta)
├── thankYou (group: icon, title, subtitle, description, whatNext, buttons[])
├── aiReady (group: hero, audience, benefits, pricing, testimonials, about, team, cta, form)
│   └── NOTE: syllabus, whyNow, trustBadges, pricingTracks → בתוך Course collection
├── courseSingle (group: buttons, sections, alerts, cta)
├── commonCta (group: whatsappNumber, whatsappText, contactButtonText)
└── Access: read: public, update: admin
```

### 3.3 Relationships Map

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        RELATIONSHIPS DIAGRAM                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Users ←───────────────────────────────────────────────────────┐        │
│     │                                                           │        │
│     ├── enrolledCourses ────────────────────────────> Courses   │        │
│     │                                                    │      │        │
│     │                                                    ├──> Instructors
│     │                                                    └──> Testimonials
│     │                                                                    │
│   Cohorts <── course ─────────────────────────────────> Courses          │
│     │                                                                    │
│     ├──> instructors ────────────────────────────────> Users             │
│     │                                                                    │
│   Lessons <── cohort ─────────────────────────────────> Cohorts          │
│     │                                                                    │
│   Enrollments <── student ────────────────────────────> Users            │
│              <── cohort ──────────────────────────────> Cohorts          │
│                                                                          │
│   Progress <── student ───────────────────────────────> Users            │
│            <── lesson ────────────────────────────────> Lessons          │
│                                                                          │
│   Attendance <── student ─────────────────────────────> Users            │
│              <── lesson ──────────────────────────────> Lessons          │
│              <── cohort ──────────────────────────────> Cohorts          │
│                                                                          │
│   Assignments <── cohort ─────────────────────────────> Cohorts          │
│                                                                          │
│   Submissions <── student ────────────────────────────> Users            │
│               <── assignment ─────────────────────────> Assignments      │
│                                                                          │
│   Certificates <── student ───────────────────────────> Users            │
│                <── course ────────────────────────────> Courses          │
│                <── cohort ────────────────────────────> Cohorts          │
│                                                                          │
│   Posts <── category ─────────────────────────────────> Categories       │
│         <── author ───────────────────────────────────> Users            │
│         <── relatedCourse ────────────────────────────> Courses          │
│                                                                          │
│   Testimonials <── course ────────────────────────────> Courses          │
│                                                                          │
│   Media <── referenced by many collections ──────────────────────────────│
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Frontend Analysis

### 4.1 Routes

| Route | קובץ | סטטוס | Dynamic | תיאור |
|-------|------|-------|---------|--------|
| `/` | `page.tsx` | ✅ עובד | `force-dynamic` | דף הבית |
| `/about` | `about/page.tsx` | ✅ עובד | `force-dynamic` | דף אודות |
| `/courses` | `courses/page.tsx` | ✅ עובד | `force-dynamic` | רשימת קורסים |
| `/courses/[slug]` | `courses/[slug]/page.tsx` | ✅ עובד | `force-dynamic` | דף קורס בודד |
| `/blog` | `blog/page.tsx` | ✅ עובד | `force-dynamic` | רשימת מאמרים |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | ✅ עובד | `force-dynamic` | מאמר בודד |
| `/ai-ready` | `ai-ready/page.tsx` | ✅ עובד | revalidate=60 | דף נחיתה AI Ready |
| `/contact` | `contact/page.tsx` | ✅ עובד | - | צור קשר |
| `/thank-you` | `thank-you/page.tsx` | ✅ עובד | `force-dynamic` | דף תודה |
| `/login` | `login/page.tsx` | ✅ עובד | - | התחברות |
| `/register` | `register/page.tsx` | ✅ עובד | - | הרשמה |
| `/dashboard` | `dashboard/page.tsx` | ✅ עובד | מוגן | אזור אישי |
| `/admin/*` | `(payload)/admin/` | ✅ עובד | - | Payload CMS Admin |
| `/accessibility` | - | ❌ חסר | - | דף נגישות |

### 4.2 Components

#### Layout Components
| Component | קובץ | סוג | תיאור |
|-----------|------|-----|--------|
| Header | `layout/Header.tsx` | Client | ניווט, auth state, scroll progress |
| Footer | `layout/Footer.tsx` | Server | פוטר עם stats, לינקים, social |

#### Section Components (Homepage)
| Component | קובץ | תיאור |
|-----------|------|--------|
| Hero | `sections/Hero.tsx` | כותרת ראשית + CTA |
| About | `sections/About.tsx` | אודות בדף הבית |
| BrandsCarousel | `sections/BrandsCarousel.tsx` | קרוסלת שותפים |
| Contact | `sections/Contact.tsx` | טופס יצירת קשר |
| Integration | `sections/Integration.tsx` | אינטגרציות |
| Programs | `sections/Programs.tsx` | רשימת קורסים |
| QuickContact | `sections/QuickContact.tsx` | פרטי קשר מהירים |
| Schedule | `sections/Schedule.tsx` | לוח זמנים |
| Story | `sections/Story.tsx` | הסיפור שלנו |
| Team | `sections/Team.tsx` | צוות מרצים |
| Testimonials | `sections/Testimonials.tsx` | המלצות |
| WhyNow | `sections/WhyNow.tsx` | למה עכשיו |

#### UI Components
| Component | קובץ | תיאור |
|-----------|------|--------|
| WhatsAppButton | `ui/WhatsAppButton.tsx` | כפתור WhatsApp צף |
| BlogCard | `BlogCard.tsx` | כרטיס מאמר |
| BlogFilter | `BlogFilter.tsx` | פילטרים לבלוג |
| Breadcrumbs | `Breadcrumbs.tsx` | ניווט breadcrumbs |
| CourseCard | `CourseCard.tsx` | כרטיס קורס |
| CoursesFilter | `CoursesFilter.tsx` | פילטרים לקורסים |
| RichText | `RichText.tsx` | עיבוד תוכן עשיר |

### 4.3 Pages Structure

#### Homepage (`/`)
```
Hero
├── title, titleHighlight, subtitle
├── primaryCta, secondaryCta
└── stats (globalStats)

About Section
├── title, subtitle, content
├── features[]
└── cta

BrandsCarousel (Partners)

QuickContact (SiteSettings.contact)

WhyNow (homepage.whyUs[])

Programs (featured Courses)

Schedule

Story

Testimonials (featured Testimonials)

Team (featured Instructors)

Integration

Contact Form

WhatsAppButton
```

---

## 5. Backend Analysis

### 5.1 API Routes

| Route | Method | תיאור |
|-------|--------|--------|
| `/api/contact` | POST | שליחת טופס יצירת קשר |
| `/api/revalidate` | GET/POST | Revalidate cache |
| `/api/seed` | POST | Seed initial data |
| `/api/seed-ai-ready` | POST | Seed AI Ready course |
| `/api/migrate-ai-ready` | POST | Migrate AI Ready data |
| `/api/check-tables` | GET | List database tables |
| `/api/sync-schema` | GET | Test globals access |
| `/api/run-migration` | POST | Create missing tables |
| `/api/debug-pages` | GET | Debug Pages global |
| `/api/update-navigation` | POST | Update navigation |
| `/api/admin/*` | Various | Admin utilities |

### 5.2 Payload Configuration

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: './src' }
  },
  collections: [17 collections],
  globals: [4 globals],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: { outputFile: './src/payload-types.ts' },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    push: true // Auto-sync schema
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      config: { cloud_name, api_key, api_secret },
      collections: { media: true },
      folder: 'focusai-academy'
    })
  ]
})
```

### 5.3 Database Schema

PostgreSQL tables נוצרות אוטומטית על ידי Payload עם `push: true`:

```sql
-- Core Tables
users, media

-- Academy Tables
courses, cohorts, lessons
enrollments, progress, attendance
assignments, submissions, certificates

-- Content Tables
posts, categories
testimonials, instructors

-- Leads Tables
contacts, partners

-- System Tables (Payload internal)
payload_migrations
payload_preferences
_courses_cohorts, _courses_highlights, etc. (array tables)
```

---

## 6. Integrations

### 6.1 Cloudinary

```yaml
Service: Cloudinary
Plugin: payload-cloudinary (v2.2.1)
Cloud Name: dfudxxzlj
Folder: focusai-academy/
Usage:
  - Media collection storage
  - Image optimization
  - Multiple sizes (thumbnail, card, hero)
```

### 6.2 Railway

```yaml
Service: Railway
Components:
  - PostgreSQL Database
  - Next.js Application
Deployment:
  - Auto-deploy from GitHub
  - Environment variables management
  - Container-based deployment
```

### 6.3 External Services

| Service | Usage |
|---------|-------|
| Google Fonts | Heebo font |
| WhatsApp API | Direct messaging |
| Social Links | Facebook, Instagram, TikTok, LinkedIn, YouTube |

---

## 7. Features Status

### 7.1 Implemented ✅

- [x] Multi-collection CMS (17 collections)
- [x] Global content management (4 globals)
- [x] User authentication (JWT)
- [x] Role-based access control (admin/instructor/student)
- [x] Course catalog with filtering
- [x] Blog with categories
- [x] Testimonials display
- [x] Team/Instructors display
- [x] Partners carousel
- [x] Contact form
- [x] WhatsApp integration
- [x] Dynamic sitemap
- [x] Schema.org SEO
- [x] Responsive design (RTL)
- [x] Image optimization (Cloudinary)
- [x] Caching strategy (unstable_cache)
- [x] On-demand revalidation

### 7.2 Partially Implemented 🚧

- [ ] LMS Dashboard - UI exists, limited functionality
- [ ] Course enrollment - Schema ready, no purchase flow
- [ ] Progress tracking - Collection ready, no implementation
- [ ] Attendance tracking - Collection ready, no implementation
- [ ] Assignment submissions - Collection ready, no implementation
- [ ] Certificate generation - Collection ready, no implementation

### 7.3 Not Implemented ❌

- [ ] Payment integration (Stripe/PayPal)
- [ ] Video hosting/streaming
- [ ] Live class integration (Zoom)
- [ ] Notifications system
- [ ] Email automation
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Accessibility page
- [ ] Terms of service page (links to external)

---

## 8. Technical Debt

### 8.1 Known Issues

1. **Schema Sync**: `push: true` only syncs on initial setup. New Globals require manual migration via `/api/run-migration`

2. **Deprecated Fields**:
   - `nextCohortDate` in Courses - should use `cohorts[]` array
   - `stats[]` in Homepage - should use `globalStats`
   - Legacy section titles in Homepage.sections

3. **External Links**: Terms of service and privacy policy link to external WordPress site

### 8.2 Performance Concerns

1. **Dynamic Pages**: All pages use `force-dynamic` due to Payload requiring runtime secrets
2. **No ISR**: Cannot use Incremental Static Regeneration properly
3. **Client Components**: Header is client component (auth check), could impact performance

### 8.3 Security Considerations

1. **Access Control**: Well implemented with RBAC
2. **API Routes**: Admin routes should verify authentication
3. **Environment Variables**: Properly managed
4. **Cloudinary**: API secrets protected server-side

---

## 9. Code Quality Metrics

### 9.1 Statistics

```
Total TypeScript/TSX files: ~100
Total lines of code: ~15,000 (estimated)
Collections: 17
Globals: 4
Frontend Routes: 12
API Routes: 15
Components: ~20
Hooks: 2
```

### 9.2 Code Organization

- ✅ Clear separation: Collections / Globals / Components / Pages
- ✅ TypeScript throughout
- ✅ Auto-generated types from Payload
- ✅ Consistent naming conventions (Hebrew labels, English code)
- ✅ Shared utilities (getSharedContent)
- 🚧 Some inline styles (should extract to CSS classes)

### 9.3 TypeScript Coverage

- ✅ Full TypeScript coverage
- ✅ Strict mode enabled
- ✅ Auto-generated types from Payload
- ✅ Type-safe API calls

---

## 10. Dependencies Analysis

### 10.1 Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.4.10 | React framework |
| react/react-dom | 19.2.3 | UI library |
| payload | 3.69.0 | Headless CMS |
| @payloadcms/db-postgres | 3.69.0 | PostgreSQL adapter |
| @payloadcms/richtext-lexical | 3.69.0 | Rich text editor |
| @payloadcms/next | 3.69.0 | Next.js integration |
| @payloadcms/ui | 3.69.0 | Admin UI |
| payload-cloudinary | 2.2.1 | Cloudinary storage |
| pg | 8.16.3 | PostgreSQL client |
| framer-motion | 12.23.26 | Animations |
| sharp | 0.34.2 | Image processing |
| graphql | 16.8.1 | GraphQL support |
| cross-env | 7.0.3 | Cross-platform env |
| dotenv | 16.4.7 | Environment variables |
| react-intersection-observer | 10.0.0 | Scroll detection |

### 10.2 Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 5.9.3 | Type checking |
| tailwindcss | 4.1.18 | CSS framework |
| @tailwindcss/postcss | 4.1.18 | Tailwind PostCSS |
| postcss | 8.5.6 | CSS processing |
| autoprefixer | 10.4.23 | CSS prefixing |
| eslint | 9.16.0 | Linting |
| eslint-config-next | 15.4.7 | Next.js ESLint |
| vitest | 3.2.3 | Unit testing |
| @playwright/test | 1.57.0 | E2E testing |
| @testing-library/react | 16.3.0 | React testing |
| prettier | 3.4.2 | Code formatting |
| tsx | 4.19.2 | TypeScript execution |

### 10.3 Outdated Packages

All packages appear to be up-to-date as of analysis date.

---

## 11. Recommendations

### 11.1 Critical Issues

1. **Add Authentication to Admin API Routes**
   ```typescript
   // Verify admin role in admin/* routes
   if (!req.user || req.user.role !== 'admin') {
     return Response.json({ error: 'Unauthorized' }, { status: 401 })
   }
   ```

2. **Implement Proper Error Boundaries**
   - Add more specific error messages
   - Log errors to external service

3. **Create Accessibility Page**
   - Required by Israeli law
   - Currently missing

### 11.2 Short-term Improvements

1. **Extract Inline Styles**
   - Move gradient backgrounds to CSS variables
   - Create reusable button styles

2. **Optimize Images**
   - Add blur placeholders
   - Implement lazy loading for below-fold images

3. **Add Loading States**
   - Skeleton loaders for data fetching
   - Better UX during transitions

4. **Complete Dashboard**
   - Show enrolled courses
   - Display progress
   - List upcoming sessions

### 11.3 Long-term Enhancements

1. **Payment Integration**
   - Stripe or local payment gateway
   - Course purchase flow
   - Invoice generation

2. **Video Platform**
   - Video hosting solution
   - Progress tracking
   - Resume playback

3. **Notifications**
   - Email notifications
   - In-app notifications
   - WhatsApp integration

4. **Analytics**
   - User behavior tracking
   - Course completion rates
   - Business metrics dashboard

---

## 12. Missing Functionality

### 12.1 LMS Features

| Feature | Status | Priority |
|---------|--------|----------|
| Video player | ❌ | High |
| Progress tracking | 🚧 Schema only | High |
| Certificate generation | ❌ | Medium |
| Quiz/Assessment | ❌ | Medium |
| Discussion forums | ❌ | Low |
| Live sessions | ❌ | Low |

### 12.2 User Features

| Feature | Status | Priority |
|---------|--------|----------|
| Course purchase | ❌ | High |
| Payment history | ❌ | High |
| Profile settings | 🚧 Basic | Medium |
| Notifications | ❌ | Medium |
| Course reviews | ❌ | Low |

### 12.3 Admin Features

| Feature | Status | Priority |
|---------|--------|----------|
| User management | ✅ | - |
| Content management | ✅ | - |
| Analytics dashboard | ❌ | High |
| Bulk operations | ❌ | Medium |
| Export data | ❌ | Medium |

---

## 13. Scalability Analysis

### 13.1 Current Capacity

- **Users**: Can handle thousands of users with PostgreSQL
- **Media**: Cloudinary handles media scaling
- **Traffic**: Railway auto-scales containers
- **Database**: Connection pooling configured

### 13.2 Bottlenecks

1. **force-dynamic**: No static generation, all requests hit server
2. **Single Region**: Currently deployed in one region
3. **No CDN**: Relying on Cloudinary for media CDN only

### 13.3 Scaling Strategy

1. **Add Edge Caching**: Use Vercel/Cloudflare edge caching
2. **Implement Redis**: For session storage and caching
3. **Database Read Replicas**: For read-heavy operations
4. **Multi-region Deployment**: For global audience

---

## 14. Next Steps

### Phase 1: Stabilization (1-2 weeks)

- [ ] Add accessibility page
- [ ] Fix all TypeScript warnings
- [ ] Complete error handling
- [ ] Add loading states
- [ ] Audit security

### Phase 2: LMS Core (2-4 weeks)

- [ ] Implement video player
- [ ] Add progress tracking
- [ ] Create dashboard content
- [ ] Payment integration research

### Phase 3: Enhancement (4-8 weeks)

- [ ] Payment integration
- [ ] Certificate generation
- [ ] Email notifications
- [ ] Analytics dashboard

### Phase 4: Expansion (2-3 months)

- [ ] Mobile app consideration
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] API for integrations

---

## Appendices

### A. Full File Tree

```
C:\Projects\focus-ai\focusai\focusai-cms\
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── public/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── about/
│   │   │   ├── ai-ready/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── courses/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── thank-you/
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── page.tsx
│   │   │   └── styles.css
│   │   ├── (payload)/
│   │   │   ├── admin/
│   │   │   ├── api/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   ├── contact/
│   │   │   ├── revalidate/
│   │   │   └── ...
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── my-route/
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── collections/
│   │   ├── Assignments.ts
│   │   ├── Attendance.ts
│   │   ├── Categories.ts
│   │   ├── Certificates.ts
│   │   ├── Cohorts.ts
│   │   ├── Contacts.ts
│   │   ├── Courses.ts
│   │   ├── Enrollments.ts
│   │   ├── Instructors.ts
│   │   ├── Lessons.ts
│   │   ├── Media.ts
│   │   ├── Partners.ts
│   │   ├── Posts.ts
│   │   ├── Progress.ts
│   │   ├── Submissions.ts
│   │   ├── Testimonials.ts
│   │   └── Users.ts
│   ├── globals/
│   │   ├── Homepage.ts
│   │   ├── Navigation.ts
│   │   ├── Pages.ts
│   │   └── SiteSettings.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── ui/
│   │   └── *.tsx
│   ├── hooks/
│   ├── lib/
│   │   ├── schema/
│   │   ├── getImageUrl.ts
│   │   ├── getSharedContent.ts
│   │   └── performance.ts
│   ├── migrations/
│   ├── seed/
│   ├── payload.config.ts
│   └── payload-types.ts
├── .env.example
├── AGENTS.md
├── CHANGELOG.md
├── CLAUDE.md
├── CONTRIBUTING.md
├── next.config.mjs
├── package.json
├── tsconfig.json
└── ...
```

### B. Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Payload
PAYLOAD_SECRET=your-secret-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Site
NEXT_PUBLIC_SITE_URL=https://focusai.co.il
```

### C. Scripts Reference

```bash
# Development
npm run dev        # Start dev server
npm run devsafe    # Clean .next and start dev

# Build
npm run build      # Production build

# Types
npm run generate:types     # Generate Payload types
npm run generate:importmap # Generate import map

# Database
npm run migrate    # Run migrations
npm run seed       # Seed data
npm run payload    # Payload CLI

# Testing
npm run test       # Run all tests
npm run test:int   # Integration tests
npm run test:e2e   # E2E tests

# Linting
npm run lint       # ESLint

# Production
npm run start      # Start production server
npm run reset:production  # Reset production DB
npm run seed:production   # Seed production data
```

### D. Useful Links

- **Production**: https://focusai.co.il
- **Admin Panel**: https://focusai.co.il/admin
- **GitHub**: (Private repository)
- **Railway Dashboard**: (Deployment platform)
- **Cloudinary Dashboard**: https://cloudinary.com/console
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**נוצר:** 2026-01-02
**מחבר:** Claude AI System Analysis
**מטרה:** מיפוי מקיף של מערכת Focus AI Academy
