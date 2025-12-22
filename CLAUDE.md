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
