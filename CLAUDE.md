# Focus AI CMS - הנחיות קבועות

@AGENTS.md

## כלל קריטי - עדכון CLAUDE.md

בכל פעם שאתה מבצע פעולה שמשנה משהו משמעותי בפרויקט, אתה חייב לעדכן את CLAUDE.md.

**הכלל הפשוט:**
אם עשית משהו שהיית צריך לדעת לפני שעשית אותו - תעדכן את CLAUDE.md כדי שתדע את זה בפעם הבאה.

**דוגמאות (אבל לא רק):**
- שינויים במבנה הפרויקט
- Collections ושדות
- דפים ו-routes
- אינטגרציות
- תלויות חשובות
- הגדרות build/deploy
- environment variables
- כל דבר שאם לא תדע אותו - תשבור משהו

**למה זה חשוב:**
- CLAUDE.md הוא הזיכרון שלך בין שיחות
- אם המידע לא עדכני - אתה עלול לשבור דברים קיימים

**כלל אצבע:**
אם אתה מסתפק אם לעדכן - עדכן.
עדיף יותר מידי מידע מאשר לשבור משהו בגלל חוסר מידע.

---

## תהליך עבודה חובה

**לפני כל משימה - קרא:**
1. `CLAUDE.md` - הבן את הפרויקט והכללים
2. `CHANGELOG.md` - מה השתנה לאחרונה?
3. הקבצים הרלוונטיים למשימה

**תהליך: READ → ANALYZE → PLAN → IMPLEMENT**

```
1. READ    - קרא את הקבצים המעורבים
2. ANALYZE - מי משתמש בזה? מה ההשלכות?
3. PLAN    - אילו קבצים ישתנו? למה?
4. IMPLEMENT - בצע + בדוק build
5. UPDATE  - עדכן CLAUDE.md + CHANGELOG.md
```

**Checklist לפני שינוי בקובץ:**
- [ ] קראתי את הקובץ
- [ ] הבנתי מי קורא לו / משתמש בו
- [ ] חיפשתי דפוסים דומים בפרויקט
- [ ] תכננתי את כל הקבצים המושפעים
- [ ] הפתרון עקבי עם הסטייל הקיים

**איסורים מוחלטים:**
- לעולם לא לשנות קוד בלי לקרוא אותו קודם
- לעולם לא להניח שאני מכיר את המבנה
- לעולם לא לשנות פונקציה בלי להבין מי קורא לה
- לעולם לא לדלג על חיפוש דפוסים דומים

---

## פקודות חשובות
- Build: npm run build
- Types: npm run generate:types
- Importmap: npm run generate:importmap
- TypeCheck: npx tsc --noEmit

## לפני כל push
1. npm run generate:types
2. npm run generate:importmap
3. npx tsc --noEmit
4. npm run build
5. רק אם הכל עובר - git push

## כללי ברזל
- קרא קבצים לפני שינוי
- לא DROP TABLE לעולם
- שינויי סכמה בזהירות - Collection אחד בכל פעם
- שדות חדשים לא יהיו required (ישברו משתמשים קיימים)
- אחרי push - לעקוב ב-Railway Logs

## אם יש שגיאת סכמה
המשתמש צריך לעשות Redeploy ב-Railway

## קבצי Startup (קריטי!)
```
start.sh       ← רץ בכל deploy
init-db.cjs    ← מריץ את init-db.sql
init-db.sql    ← רק UUID extension!
```

**אסור ב-init-db.sql:**
- CREATE TABLE עם סכמה ספציפית (Payload מטפל בזה עם push: true)
- DROP TABLE
- כל דבר שמתנגש עם הסכמה של Payload

**מותר ב-init-db.sql:**
- `CREATE EXTENSION IF NOT EXISTS`
- פקודות idempotent בלבד

**למה?** Payload עם `push: true` מסנכרן את הסכמה אוטומטית. אם init-db.sql מנסה ליצור טבלאות עם סכמה אחרת - יהיו התנגשויות.

---

## דפים עם Payload API (קריטי!)

כל דף שמשתמש ב-`getPayload()` חייב להיות **dynamic** ולא static!

```typescript
// ב-page.tsx שקורא ל-Payload API:
export const dynamic = 'force-dynamic'
```

**למה?**
- `getPayload()` דורש `PAYLOAD_SECRET`
- ב-build time אין גישה ל-environment variables
- בלי `force-dynamic` - Next.js מנסה לבנות את הדף סטטית ונכשל

**השגיאה שתראה אם תשכח:**
```
Error: missing secret key. A secret key is needed to secure Payload.
```

**דפים שצריכים את זה:**
- `src/app/(frontend)/page.tsx` - דף הבית
- `src/app/(frontend)/courses/[slug]/page.tsx` - דף קורס בודד
- כל דף עתידי שקורא ל-`getPayload()`

---

## תהליך עבודה עם GitHub

**לפני כל עבודה:**
1. `gh issue create` - פתח Issue עם תיאור ושלבי פעולה
2. `git checkout -b <type>/<description>` - פתח Branch

**סוגי Branch:**
- `feat/` - פיצ'ר חדש
- `fix/` - תיקון באג
- `refactor/` - שיפור קוד
- `chore/` - תחזוקה

**לפני Commit:**
1. בקש אישור מהמשתמש
2. הרץ `npm run build` כ-QA

**Commit Message Format:**
```
<type>: <description>

Fixes #<issue-number>
```

**אחרי Commit:**
1. `git push -u origin <branch>`
2. `gh pr create --title "..." --body "Fixes #..."`
3. QA על ה-PR
4. `gh pr merge --merge --delete-branch`

**Templates קיימים:**
- `.github/ISSUE_TEMPLATE/feature.yml` - בקשת פיצ'ר
- `.github/ISSUE_TEMPLATE/bug.yml` - דיווח באג
- `.github/pull_request_template.md` - תבנית PR

**קובץ:** `CONTRIBUTING.md` - מדריך תהליך העבודה המלא

---

## Collections (17)

### Core
| Collection | Slug | תיאור |
|------------|------|--------|
| Users | `users` | משתמשים (admin/instructor/student) |
| Media | `media` | קבצי מדיה עם image sizes |

### Academy
| Collection | Slug | תיאור |
|------------|------|--------|
| Courses | `courses` | מסלולים (frontal/digital/workshop/coaching) |
| Cohorts | `cohorts` | מחזורים לכל מסלול |
| Lessons | `lessons` | שיעורים עם וידאו וחומרים |
| Enrollments | `enrollments` | הרשמות תלמידים למחזורים |
| Progress | `progress` | התקדמות צפייה בשיעורים |
| Attendance | `attendance` | נוכחות במפגשים |
| Assignments | `assignments` | עבודות ותרגילים |
| Submissions | `submissions` | הגשות תלמידים |
| Certificates | `certificates` | תעודות סיום |

### Content
| Collection | Slug | תיאור |
|------------|------|--------|
| Posts | `posts` | מאמרים בבלוג |
| Categories | `categories` | קטגוריות לבלוג |
| Testimonials | `testimonials` | המלצות בוגרים |
| Instructors | `instructors` | פרופילי מרצים |

### Leads
| Collection | Slug | תיאור |
|------------|------|--------|
| Contacts | `contacts` | לידים מטפסים |
| Partners | `partners` | שותפים אקדמיים/תאגידיים |

## Globals (4)

| Global | Slug | תיאור |
|--------|------|--------|
| SiteSettings | `site-settings` | הגדרות אתר, קשר, רשתות |
| Navigation | `navigation` | תפריט ראשי |
| Homepage | `homepage` | תוכן דף הבית (hero, about, stats, sections) |
| Pages | `pages` | תוכן דפים (about, courses, blog, thankYou, aiReady, courseSingle) |

## מבנה Homepage Global
```
hero: { title, titleHighlight, subtitle, image, primaryCta, secondaryCta }
globalStats: { graduates, courses, companies, satisfaction }
whyUs[]
about: { title, subtitle, content, image, features[], cta }
sections: { programs, testimonials, team, partners }
newsletter: { title, description, buttonText, webhookUrl }
bottomCta: { title, subtitle, showForm, showWhatsapp, primaryButton, secondaryButton }
```

## מבנה Pages Global
```
about: { hero, mission, values[], team, cta }
courses: { hero }
blog: { hero, filters, emptyState, cta, postCta }
thankYou: { icon, title, subtitle, description, whatNext, buttons[] }
aiReady: { hero, trustBadges[], audience, benefits, pricing, testimonials, about, team, cta, form }
courseSingle: { buttons, sections, alerts, cta }
commonCta: { whatsappNumber, whatsappText }
```

## מבנה Courses (שדות עיקריים)
```
title, slug, subtitle, excerpt, description
type: frontal | digital | workshop | coaching
duration, schedule, location, hasZoom
maxStudents, instructorRatio
certificate, certificateDescription
highlights[], syllabus[], faq[], gallery[]
instructors → Instructors
testimonials → Testimonials
ctaText, ctaType, ctaLink
status: draft | published
order, featured
seo: { metaTitle, metaDescription, ogImage }
```

## קשרים בין Collections
```
Cohorts → Courses (מחזור שייך למסלול)
Lessons → Cohorts (שיעור שייך למחזור)
Enrollments → Users + Cohorts (תלמיד רשום למחזור)
Progress → Users + Lessons (התקדמות תלמיד בשיעור)
Attendance → Users + Lessons + Cohorts (נוכחות)
Assignments → Cohorts (עבודה למחזור)
Submissions → Users + Assignments (הגשת תלמיד)
Certificates → Users + Courses + Cohorts (תעודה)
Posts → Categories + Users (מאמר לקטגוריה)
Courses → Instructors + Testimonials
```

## Frontend Routes

| Route | קובץ | תיאור | Dynamic Content |
|-------|------|--------|-----------------|
| `/` | `page.tsx` | דף הבית | homepage global + sections |
| `/about` | `about/page.tsx` | דף אודות | pages.about |
| `/courses` | `courses/page.tsx` | רשימת קורסים | pages.courses |
| `/courses/[slug]` | `courses/[slug]/page.tsx` | דף קורס בודד | pages.courseSingle |
| `/blog` | `blog/page.tsx` | רשימת מאמרים | pages.blog |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | מאמר בודד | pages.blog.postCta |
| `/ai-ready` | `ai-ready/page.tsx` | דף נחיתה AI Ready | pages.aiReady |
| `/thank-you` | `thank-you/page.tsx` | דף תודה | pages.thankYou |

---

## Cloudinary Storage

Media collection משתמש ב-Cloudinary לאחסון תמונות.

**Plugin:** `payload-cloudinary` (community plugin)

**הגדרות נדרשות ב-.env:**
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**תיקיית אחסון:** `focusai-academy/`

**לאחר deploy:** הוסף את המשתנים ב-Railway Variables.

---

## Caching & Performance

### Caching Strategy:
- **getSharedContent()** משתמש ב-`unstable_cache` עם TTL של שעה
- כל הגלובלים נטענים במקביל עם `Promise.allSettled`
- Cache tags: `globals`, `homepage`, `pages`, `site-settings`

### Revalidation:
כל הדפים יש להם `export const revalidate = 3600`:
- `/` (homepage)
- `/about`
- `/courses` + `/courses/[slug]`
- `/blog` + `/blog/[slug]`
- `/ai-ready`
- `/thank-you`

### Error Handling:
| קובץ | תפקיד |
|------|--------|
| `src/app/(frontend)/not-found.tsx` | דף 404 |
| `src/app/error.tsx` | Error boundary ראשי |
| `src/app/(frontend)/error.tsx` | Error boundary ל-frontend |
| `src/app/loading.tsx` | Loading state ראשי |
| `src/app/(frontend)/loading.tsx` | Loading state ל-frontend |

### Performance Utilities:
```typescript
import { logPerformance, measureAsync, createTimer } from '@/lib/performance'

// Option 1: Manual timing
const start = performance.now()
await someOperation()
logPerformance('someOperation', start)

// Option 2: Async wrapper
const data = await measureAsync('fetchData', () => fetchData())

// Option 3: Timer object
const timer = createTimer('myOperation')
timer.start()
doSomething()
timer.end()
```

---

## SEO Implementation

### Sitemap & Robots:
```
src/app/sitemap.ts     ← Sitemap דינמי
src/app/robots.ts      ← robots.txt
```

**Sitemap כולל:**
- דפים סטטיים: /, /about, /courses, /blog, /ai-ready
- דפי קורסים: /courses/[slug] (מ-Payload)
- דפי מאמרים: /blog/[slug] (מ-Payload)

### Schema.org Components:
```
src/lib/schema/
├── index.ts                 ← Export file
├── OrganizationSchema.tsx   ← EducationalOrganization
├── CourseSchema.tsx         ← Course schema
└── ArticleSchema.tsx        ← Article schema
```

**שימוש:**
```typescript
import { OrganizationSchema, CourseSchema, ArticleSchema } from '@/lib/schema'

// Layout - OrganizationSchema
<OrganizationSchema />

// Course page
<CourseSchema course={course} />

// Blog post
<ArticleSchema post={post} />
```

### Metadata Pattern:
```typescript
// Static metadata (layout.tsx)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: '...', template: '%s | Focus AI Academy' },
  // ...
}

// Dynamic metadata (generateMetadata)
export async function generateMetadata({ params }): Promise<Metadata> {
  // Fetch data and return metadata
  return {
    title: course.title,
    openGraph: { ... },
    twitter: { ... },
    alternates: { canonical: `${BASE_URL}/courses/${slug}` },
  }
}
```

### משתני סביבה:
```
NEXT_PUBLIC_SITE_URL=https://focusai.co.il
```

---

## מוצרי Focus AI
| מסלול | סוג | משך |
|-------|-----|-----|
| Bot-Camp | frontal | 12 שבועות, שני 17-21 |
| AI Ready | frontal | 8 מפגשים, שישי 9-12 |
| סדנאות לארגונים | workshop | מותאם אישית |
| ליווי אישי 1:1 | coaching | גמיש |
| קורסים דיגיטליים | digital | עצמאי (בקרוב) |

מיקום: אריה שנקר 14, הרצליה פיתוח (Nolton House)
