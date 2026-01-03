# Focus AI Academy - סיכום מערכתי

**תאריך:** 2026-01-02 | **גרסה:** 1.0.0

---

## מבט-על

Focus AI Academy היא מערכת LMS מבוססת **Next.js 15** ו-**Payload CMS 3.0** לניהול קורסים בתחום הבינה המלאכותית.

### טכנולוגיות עיקריות

| Stack | Tech |
|-------|------|
| Frontend | Next.js 15.4.10 + React 19 + Tailwind 4 |
| CMS | Payload CMS 3.69.0 |
| Database | PostgreSQL (Railway) |
| Media | Cloudinary |
| Language | TypeScript 5.9.3 |

---

## מבנה הנתונים

### Collections (17)

| קטגוריה | Collections | תיאור |
|---------|-------------|--------|
| **Core** | Users, Media | משתמשים ומדיה |
| **Academy** | Courses, Cohorts, Lessons, Enrollments, Progress, Attendance, Assignments, Submissions, Certificates | תשתית LMS מלאה |
| **Content** | Posts, Categories, Testimonials, Instructors | תוכן שיווקי |
| **Leads** | Contacts, Partners | ניהול לידים |

### Globals (4)

| Global | תיאור |
|--------|--------|
| SiteSettings | הגדרות אתר, קשר, tracking |
| Navigation | תפריטים |
| Homepage | תוכן דף הבית |
| Pages | תוכן דפים (about, courses, blog, aiReady) |

---

## נתיבים

| Route | סטטוס | תיאור |
|-------|-------|--------|
| `/` | ✅ | דף הבית |
| `/courses`, `/courses/[slug]` | ✅ | קורסים |
| `/blog`, `/blog/[slug]` | ✅ | בלוג |
| `/ai-ready` | ✅ | דף נחיתה AI Ready |
| `/about`, `/contact` | ✅ | דפי מידע |
| `/login`, `/register` | ✅ | אימות |
| `/dashboard` | ✅ | אזור אישי (מוגן) |
| `/admin/*` | ✅ | Payload Admin |

---

## סטטוס פיצ'רים

### מה עובד ✅
- CMS מלא (17 Collections + 4 Globals)
- אתר שיווקי מלא עם SEO
- אימות משתמשים עם תפקידים
- ניהול קורסים ותוכן
- בלוג עם קטגוריות
- המלצות ומרצים
- טפסי יצירת קשר
- WhatsApp integration
- Cloudinary לתמונות

### מה חלקי 🚧
- Dashboard תלמידים (UI בלבד)
- מעקב התקדמות (Schema בלבד)
- ניהול מחזורים

### מה חסר ❌
- מערכת תשלומים
- נגן וידאו לשיעורים
- יצירת תעודות
- התראות אימייל
- דף נגישות

---

## ארכיטקטורה

```
┌───────────────────────────────────────┐
│           FRONTEND (Next.js)          │
│  12 Pages + 20 Components + RTL       │
├───────────────────────────────────────┤
│           PAYLOAD CMS 3.69.0          │
│  17 Collections + 4 Globals           │
├───────────────────────────────────────┤
│     PostgreSQL + Cloudinary           │
└───────────────────────────────────────┘
```

### קשרים עיקריים

```
Users ←→ Enrollments ←→ Cohorts ←→ Courses
                            ↓
                        Lessons
                            ↓
              Progress, Attendance, Assignments
                            ↓
                     Submissions
                            ↓
                     Certificates
```

---

## פקודות חשובות

```bash
# פיתוח
npm run dev

# Build
npm run build

# Types
npm run generate:types
npm run generate:importmap

# בדיקות
npx tsc --noEmit
```

---

## Environment Variables

```bash
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_SITE_URL=https://focusai.co.il
```

---

## המלצות עיקריות

### קריטי (מיידי)
1. הוסף דף נגישות
2. אבטח API routes של admin

### קצר טווח (1-2 שבועות)
1. השלם Dashboard תלמידים
2. הוסף loading states
3. נקה inline styles

### בינוני (1-2 חודשים)
1. אינטגרציית תשלומים
2. נגן וידאו
3. מעקב התקדמות

### ארוך טווח (3+ חודשים)
1. מערכת התראות
2. יצירת תעודות
3. אנליטיקס מתקדם

---

## סטטיסטיקות

| מדד | ערך |
|-----|-----|
| קבצי TypeScript | ~100 |
| Collections | 17 |
| Globals | 4 |
| Frontend Routes | 12 |
| API Routes | 15 |
| Components | ~20 |

---

## קבצים חשובים

| קובץ | תיאור |
|------|--------|
| `CLAUDE.md` | הנחיות עבודה |
| `AGENTS.md` | כללי Payload |
| `payload.config.ts` | הגדרות CMS |
| `src/lib/getSharedContent.ts` | Cached content |
| `src/app/sitemap.ts` | SEO Sitemap |

---

## לינקים

- **Production:** https://focusai.co.il
- **Admin:** https://focusai.co.il/admin
- **Payload Docs:** https://payloadcms.com/docs

---

**לפרטים מלאים:** ראה `SYSTEM_REPORT.md`
