# Focus AI CMS - הנחיות קבועות

@AGENTS.md

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
