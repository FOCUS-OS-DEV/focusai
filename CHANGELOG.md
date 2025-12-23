# Changelog - Focus AI Academy

תיעוד שינויים בפרויקט. כל session עבודה מתועד כאן.

---

## [2025-12-23] - Course Single Page

### קבצים ששונו:
- `src/app/(frontend)/courses/[slug]/page.tsx` - נוצר חדש

### מה נעשה:
יצירת דף דינמי להצגת קורס בודד לפי slug.

**סקשנים בדף:**
- Hero Section עם תמונה/gradient ו-CTA
- Info Bar (משך, לוח זמנים, מקומות, מיקום)
- Highlights - מה תלמדו
- Syllabus - סילבוס מפורט
- Instructors - כרטיסי מרצים
- Testimonials - המלצות בוגרים
- FAQ - שאלות נפוצות
- Certificate - תעודה
- Final CTA - WhatsApp

**תכונות:**
- Dynamic rendering עם `force-dynamic`
- SEO metadata מ-Payload
- Theme colors לפי סוג קורס
- Responsive design
- RTL support

### למה:
זה הדף החשוב ביותר אחרי דף הבית - מציג את כל פרטי הקורס למתעניינים.

---

## [2025-12-23] - Enhanced Workflow & Documentation

### קבצים ששונו:
- `CHANGELOG.md` - נוצר חדש
- `CLAUDE.md` - תהליך עבודה משופר

### מה נעשה:
- יצירת CHANGELOG.md עם היסטוריית הפרויקט
- הוספת תהליך READ → ANALYZE → PLAN → IMPLEMENT
- הוספת checklist לפני שינוי קבצים
- הוספת איסורים מוחלטים

### למה:
שיפור תהליך העבודה עם LLM - מניעת טעויות, שמירת עקביות, זיכרון ארוך טווח.

---

## [2025-12-23] - Cloudinary Storage Integration

### Issue/PR: #9, #10

### קבצים ששונו:
- `src/payload.config.ts` - הוספת cloudinaryStorage plugin
- `package.json` - הוספת payload-cloudinary
- `.env.example` - הוספת Cloudinary variables

### מה נעשה:
הגדרת Cloudinary כ-storage adapter עבור Media collection. תמונות נשמרות בתיקייה `focusai-academy/` ב-Cloudinary.

### למה:
Railway לא שומר קבצים בין deploys. נדרש storage חיצוני לתמונות.

### שיקולים עתידיים:
- לבדוק image optimization settings
- לשקול CDN caching

---

## [2025-12-23] - Dynamic Rendering Fix

### Issue/PR: #8 (part of)

### קבצים ששונו:
- `src/app/(frontend)/page.tsx` - הוספת `export const dynamic = 'force-dynamic'`
- `CLAUDE.md` - תיעוד הכלל החדש

### מה נעשה:
תיקון שגיאת build - דפים שמשתמשים ב-`getPayload()` חייבים להיות dynamic.

### למה:
`getPayload()` דורש `PAYLOAD_SECRET` שלא זמין ב-build time.

### לקח שנלמד:
כל דף עם Payload API צריך `force-dynamic`. עודכן ב-CLAUDE.md.

---

## [2025-12-22] - Homepage Payload Integration

### Issue/PR: #8

### קבצים ששונו:
- `src/app/(frontend)/page.tsx` - המרה ל-async Server Component
- `src/components/sections/Hero.tsx` - הוספת props
- `src/components/sections/Programs.tsx` - הוספת props
- `src/components/sections/Testimonials.tsx` - הוספת props
- `src/components/sections/BrandsCarousel.tsx` - הוספת props
- `src/components/sections/WhyNow.tsx` - הוספת props
- `src/components/sections/Team.tsx` - הוספת props
- `src/components/sections/QuickContact.tsx` - הוספת props
- `src/components/sections/Contact.tsx` - הוספת props
- `src/components/ui/WhatsAppButton.tsx` - הוספת props

### מה נעשה:
חיבור דף הבית ל-Payload API. כל הסקשנים מקבלים נתונים מה-CMS עם fallback data.

### למה:
לאפשר עריכת תוכן דרך Payload Admin.

---

## [2025-12-21] - Seed Initial Content

### Issue/PR: #7

### קבצים ששונו:
- `src/app/api/seed/route.ts` - יצירת seed endpoint

### מה נעשה:
Seed script עם תוכן ראשוני:
- 3 מרצים
- 5 קטגוריות בלוג
- 3 המלצות
- 4 קורסים (Bot-Camp עם סילבוס מלא)
- SiteSettings, Navigation, Homepage globals

### למה:
לבדוק שה-Collections עובדים ולהציג תוכן באתר.

---

## [2025-12-21] - Init DB Fix

### קבצים ששונו:
- `init-db.sql` - הסרת CREATE TABLE statements

### מה נעשה:
הסרת סכמה ספציפית מ-init-db.sql. השארת רק UUID extension.

### למה:
Payload עם `push: true` מנהל את הסכמה. init-db.sql עם טבלאות גרם להתנגשויות.

### לקח שנלמד:
קבצי startup רצים בכל deploy - חייבים להיות idempotent.

---

## [2025-12-20] - Academy Collections Overhaul

### Issue/PR: #6

### קבצים ששונו:
- `src/collections/*.ts` - 17 collections
- `src/globals/*.ts` - 3 globals
- `src/payload.config.ts` - הגדרת collections

### מה נעשה:
בנייה מחדש של כל ה-Collections למערכת LMS מלאה.

### Collections שנוצרו:
Core: Users, Media
Academy: Courses, Cohorts, Lessons, Enrollments, Progress, Attendance, Assignments, Submissions, Certificates
Content: Posts, Categories, Testimonials, Instructors
Leads: Contacts, Partners

### Globals:
SiteSettings, Navigation, Homepage

---

## [2025-12-19] - GitHub Workflow Setup

### Issue/PR: #2

### קבצים ששונו:
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/pull_request_template.md`
- `CONTRIBUTING.md`

### מה נעשה:
הגדרת תהליך עבודה עם GitHub - Issues, Branches, PRs.

---

## [2025-12-18] - Initial Setup

### מה נעשה:
- Payload CMS 3.0 עם Next.js 15
- PostgreSQL adapter
- Railway deployment
- Tailwind CSS v4
- Basic frontend structure

---

## פורמט לרשומות חדשות

```markdown
## [YYYY-MM-DD] - תיאור קצר

### Issue/PR: #XX

### קבצים ששונו:
- `path/to/file.ts` - מה השתנה

### מה נעשה:
הסבר קצר

### למה:
הרציונל

### שיקולים עתידיים: (אופציונלי)
- נושאים לטיפול בהמשך

### לקח שנלמד: (אופציונלי)
- מה למדנו מזה
```
