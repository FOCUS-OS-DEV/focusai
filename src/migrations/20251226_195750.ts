import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Only create the Pages global tables that are missing
  // The other tables already exist in the database
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_thank_you_buttons_style" AS ENUM('primary', 'secondary', 'whatsapp');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  CREATE TABLE IF NOT EXISTS "pages_about_mission_paragraphs" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_about_values" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar DEFAULT '🎯',
    "title" varchar NOT NULL,
    "description" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_thank_you_what_next_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar DEFAULT '📱',
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_thank_you_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL,
    "link" varchar NOT NULL,
    "style" "enum_pages_thank_you_buttons_style" DEFAULT 'primary',
    "icon" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_ai_ready_trust_badges" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar DEFAULT '🎓',
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_ai_ready_syllabus_meetings" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "number" numeric NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "icon" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_ai_ready_syllabus_meetings_topics" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_ai_ready_syllabus_meetings_tools" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_ai_ready_why_now_cards" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar DEFAULT '🎯',
    "title" varchar NOT NULL,
    "description" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "about_hero_title" varchar DEFAULT 'אנחנו',
    "about_hero_title_highlight" varchar DEFAULT 'Focus AI Academy',
    "about_hero_subtitle" varchar DEFAULT 'האקדמיה המובילה בישראל ללימודי בינה מלאכותית ואוטומציה עסקית. אנחנו מכשירים את הדור הבא של מובילי המהפכה הדיגיטלית.',
    "about_mission_badge" varchar DEFAULT 'המשימה שלנו',
    "about_mission_title" varchar DEFAULT 'להפוך את הבינה המלאכותית',
    "about_mission_title_highlight" varchar DEFAULT 'לנגישה לכולם',
    "about_team_badge" varchar DEFAULT 'הצוות שלנו',
    "about_team_title" varchar DEFAULT 'הכירו את המומחים',
    "about_team_subtitle" varchar DEFAULT 'צוות מומחים מהשורה הראשונה בתחום הבינה המלאכותית והאוטומציה, עם ניסיון מוכח בהטמעת פתרונות AI בחברות מובילות',
    "about_cta_title" varchar DEFAULT 'מוכנים להצטרף?',
    "about_cta_subtitle" varchar DEFAULT 'בואו נדבר על איך Focus AI Academy יכולה לעזור לכם להוביל את המהפכה הדיגיטלית',
    "about_cta_primary_button_text" varchar DEFAULT 'הקורסים שלנו',
    "about_cta_primary_button_link" varchar DEFAULT '/courses',
    "about_cta_secondary_button_text" varchar DEFAULT 'WhatsApp',
    "about_cta_secondary_button_link" varchar DEFAULT 'https://wa.me/972539466408',
    "courses_hero_title" varchar DEFAULT 'המסלולים',
    "courses_hero_title_highlight" varchar DEFAULT 'שלנו',
    "courses_hero_subtitle" varchar DEFAULT 'מגוון הכשרות מעשיות בתחום הבינה המלאכותית - מהיסודות ועד לרמה המתקדמת',
    "courses_empty_state_title" varchar DEFAULT 'לא נמצאו קורסים התואמים את החיפוש',
    "courses_empty_state_subtitle" varchar DEFAULT 'נסו לשנות את הפילטרים או לחפש משהו אחר',
    "courses_empty_state_button_text" varchar DEFAULT 'הצג את כל הקורסים',
    "courses_cta_title" varchar DEFAULT 'לא בטוחים מה מתאים לכם?',
    "courses_cta_subtitle" varchar DEFAULT 'נשמח לעזור לכם לבחור את המסלול המתאים ביותר לצרכים שלכם',
    "courses_cta_primary_button_text" varchar DEFAULT 'שיחת ייעוץ חינם',
    "courses_cta_primary_button_link" varchar DEFAULT '#contact',
    "courses_cta_secondary_button_text" varchar DEFAULT 'WhatsApp',
    "courses_cta_secondary_button_link" varchar DEFAULT 'https://wa.me/972539466408',
    "blog_hero_title" varchar DEFAULT 'הבלוג',
    "blog_hero_title_highlight" varchar DEFAULT 'שלנו',
    "blog_hero_subtitle" varchar DEFAULT 'מאמרים, טיפים ותובנות מעולם הבינה המלאכותית והאוטומציה העסקית',
    "blog_empty_state_no_results" varchar DEFAULT 'לא נמצאו מאמרים התואמים את החיפוש',
    "blog_empty_state_no_posts" varchar DEFAULT 'עוד אין מאמרים בבלוג',
    "blog_empty_state_no_posts_subtitle" varchar DEFAULT 'מאמרים חדשים יתווספו בקרוב!',
    "blog_empty_state_filter_subtitle" varchar DEFAULT 'נסו לשנות את הפילטרים או לחפש משהו אחר',
    "blog_cta_title" varchar DEFAULT 'רוצים ללמוד עוד?',
    "blog_cta_subtitle" varchar DEFAULT 'הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית ומקצועית',
    "blog_cta_primary_button_text" varchar DEFAULT 'הקורסים שלנו',
    "blog_cta_primary_button_link" varchar DEFAULT '/courses',
    "blog_cta_secondary_button_text" varchar DEFAULT 'WhatsApp',
    "blog_cta_secondary_button_link" varchar DEFAULT 'https://wa.me/972539466408',
    "blog_post_cta_title" varchar DEFAULT 'אהבתם את המאמר?',
    "blog_post_cta_subtitle" varchar DEFAULT 'הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית',
    "thank_you_icon" varchar DEFAULT '🎉',
    "thank_you_title" varchar DEFAULT 'תודה רבה',
    "thank_you_subtitle" varchar DEFAULT 'הפרטים שלך התקבלו בהצלחה!',
    "thank_you_description" varchar DEFAULT 'נציג שלנו יצור איתך קשר בהקדם האפשרי (בדרך כלל תוך 24 שעות)',
    "thank_you_what_next_title" varchar DEFAULT 'מה עכשיו?',
    "ai_ready_hero_badge" varchar DEFAULT 'AI BUILT',
    "ai_ready_hero_title" varchar DEFAULT 'ARE YOU',
    "ai_ready_hero_title_highlight" varchar DEFAULT 'AI READY?',
    "ai_ready_hero_subtitle" varchar DEFAULT 'הכשרה ייחודית בת 8 מפגשים שתלמד אתכם לעבוד עם הכלים המתקדמים ביותר בעולם ה-AI ולהטמיע אותם בעבודה היומיומית שלכם.',
    "ai_ready_hero_primary_cta" varchar DEFAULT 'הרשמה להכשרה',
    "ai_ready_hero_secondary_cta" varchar DEFAULT 'לסילבוס המלא',
    "ai_ready_audience_title" varchar DEFAULT 'למי ההכשרה מתאימה?',
    "ai_ready_audience_subtitle" varchar,
    "ai_ready_benefits_title" varchar DEFAULT 'מה מקבלים בהכשרה?',
    "ai_ready_benefits_subtitle" varchar,
    "ai_ready_pricing_title" varchar DEFAULT 'מסלולי הכשרה',
    "ai_ready_pricing_subtitle" varchar,
    "ai_ready_pricing_next_cohort_date" varchar DEFAULT '27.02.2026',
    "ai_ready_pricing_frontal_track_title" varchar DEFAULT 'מסלול פרונטלי',
    "ai_ready_pricing_frontal_track_schedule" varchar DEFAULT 'הרצליה פיתוח | ימי שישי | 9:00-12:00',
    "ai_ready_pricing_frontal_track_original_price" varchar DEFAULT '7,900 ₪',
    "ai_ready_pricing_frontal_track_price" varchar DEFAULT '4,900',
    "ai_ready_pricing_frontal_track_price_note" varchar DEFAULT 'מחיר השקה מוקדם',
    "ai_ready_pricing_zoom_track_title" varchar DEFAULT 'מסלול Zoom',
    "ai_ready_pricing_zoom_track_schedule" varchar DEFAULT 'אונליין | ימי שישי | 9:00-12:00',
    "ai_ready_pricing_zoom_track_original_price" varchar DEFAULT '3,900 ₪',
    "ai_ready_pricing_zoom_track_price" varchar DEFAULT '2,490',
    "ai_ready_pricing_zoom_track_price_note" varchar DEFAULT 'מחיר השקה מוקדם',
    "ai_ready_testimonials_badge" varchar DEFAULT 'מה אומרים עלינו',
    "ai_ready_testimonials_title" varchar DEFAULT 'הסטודנטים שלנו',
    "ai_ready_testimonials_title_highlight" varchar DEFAULT 'מספרים',
    "ai_ready_about_title" varchar DEFAULT 'הסיפור של Focus AI',
    "ai_ready_team_title" varchar DEFAULT 'צוות המרצים',
    "ai_ready_team_subtitle" varchar DEFAULT 'המומחים שילוו אתכם לאורך ההכשרה',
    "ai_ready_cta_title" varchar DEFAULT 'מוכנים להפוך ל-AI Ready?',
    "ai_ready_cta_subtitle" varchar DEFAULT 'עוד צעד קטן ואתם בפנים, בואו נדבר!',
    "ai_ready_form_title" varchar DEFAULT 'רוצים לשמוע עוד?',
    "ai_ready_form_subtitle" varchar DEFAULT 'השאירו פרטים ונחזור אליכם תוך 24 שעות',
    "ai_ready_form_button_text" varchar DEFAULT 'שלחו פרטים',
    "ai_ready_syllabus_badge" varchar DEFAULT '📚 תכנית לימודים',
    "ai_ready_syllabus_title" varchar DEFAULT 'סילבוס במיתקד יישומי ופרקטי',
    "ai_ready_syllabus_subtitle" varchar DEFAULT '8 מפגשים שיעניקו לך את הכלים לשגשוג בעידן ה-AI - פרונטלי או בזום, בימים וערבים',
    "ai_ready_why_now_badge" varchar DEFAULT '⏰ למה עכשיו?',
    "ai_ready_why_now_title" varchar DEFAULT 'למה עכשיו זה הזמן?',
    "course_single_buttons_register" varchar DEFAULT 'הרשמה לקורס',
    "course_single_buttons_syllabus" varchar DEFAULT 'לסילבוס המלא',
    "course_single_buttons_contact" varchar DEFAULT 'דברו איתנו',
    "course_single_buttons_back_home" varchar DEFAULT 'חזרה לדף הבית',
    "course_single_sections_who_is_it_for" varchar DEFAULT 'למי זה מתאים?',
    "course_single_sections_why_now" varchar DEFAULT 'למה עכשיו?',
    "course_single_sections_what_you_get" varchar DEFAULT 'מה תקבלו בהכשרה?',
    "course_single_sections_highlights" varchar DEFAULT 'מה תלמדו?',
    "course_single_sections_syllabus" varchar DEFAULT 'הסילבוס',
    "course_single_sections_team" varchar DEFAULT 'הצוות',
    "course_single_sections_testimonials" varchar DEFAULT 'מה אומרים הבוגרים?',
    "course_single_sections_faq" varchar DEFAULT 'שאלות נפוצות',
    "course_single_alerts_spots_left" varchar DEFAULT 'נותרו מקומות אחרונים למחזור הקרוב',
    "course_single_cta_title" varchar DEFAULT 'מוכנים להתחיל?',
    "course_single_cta_subtitle" varchar DEFAULT 'הצטרפו למאות בוגרים שכבר עובדים עם AI',
    "common_cta_whatsapp_number" varchar DEFAULT '972539466408',
    "common_cta_whatsapp_text" varchar DEFAULT 'WhatsApp',
    "common_cta_contact_button_text" varchar DEFAULT 'שיחת ייעוץ חינם',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );
  `)

  // Add foreign key constraints (if tables were just created)
  await db.execute(sql`
  DO $$ BEGIN
    ALTER TABLE "pages_about_mission_paragraphs" ADD CONSTRAINT "pages_about_mission_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_about_values" ADD CONSTRAINT "pages_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_thank_you_what_next_items" ADD CONSTRAINT "pages_thank_you_what_next_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_thank_you_buttons" ADD CONSTRAINT "pages_thank_you_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_ai_ready_trust_badges" ADD CONSTRAINT "pages_ai_ready_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_ai_ready_syllabus_meetings_topics" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_ai_ready_syllabus_meetings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_ai_ready_syllabus_meetings_tools" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_ai_ready_syllabus_meetings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_ai_ready_syllabus_meetings" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_ai_ready_why_now_cards" ADD CONSTRAINT "pages_ai_ready_why_now_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  `)

  // Create indexes
  await db.execute(sql`
  CREATE INDEX IF NOT EXISTS "pages_about_mission_paragraphs_order_idx" ON "pages_about_mission_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_about_mission_paragraphs_parent_id_idx" ON "pages_about_mission_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_about_values_order_idx" ON "pages_about_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_about_values_parent_id_idx" ON "pages_about_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_thank_you_what_next_items_order_idx" ON "pages_thank_you_what_next_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_thank_you_what_next_items_parent_id_idx" ON "pages_thank_you_what_next_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_thank_you_buttons_order_idx" ON "pages_thank_you_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_thank_you_buttons_parent_id_idx" ON "pages_thank_you_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_trust_badges_order_idx" ON "pages_ai_ready_trust_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_trust_badges_parent_id_idx" ON "pages_ai_ready_trust_badges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_topics_order_idx" ON "pages_ai_ready_syllabus_meetings_topics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_topics_parent_id_idx" ON "pages_ai_ready_syllabus_meetings_topics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_tools_order_idx" ON "pages_ai_ready_syllabus_meetings_tools" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_tools_parent_id_idx" ON "pages_ai_ready_syllabus_meetings_tools" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_order_idx" ON "pages_ai_ready_syllabus_meetings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_parent_id_idx" ON "pages_ai_ready_syllabus_meetings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_why_now_cards_order_idx" ON "pages_ai_ready_why_now_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_ai_ready_why_now_cards_parent_id_idx" ON "pages_ai_ready_why_now_cards" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_about_mission_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_about_values" CASCADE;
  DROP TABLE IF EXISTS "pages_thank_you_what_next_items" CASCADE;
  DROP TABLE IF EXISTS "pages_thank_you_buttons" CASCADE;
  DROP TABLE IF EXISTS "pages_ai_ready_trust_badges" CASCADE;
  DROP TABLE IF EXISTS "pages_ai_ready_syllabus_meetings_topics" CASCADE;
  DROP TABLE IF EXISTS "pages_ai_ready_syllabus_meetings_tools" CASCADE;
  DROP TABLE IF EXISTS "pages_ai_ready_syllabus_meetings" CASCADE;
  DROP TABLE IF EXISTS "pages_ai_ready_why_now_cards" CASCADE;
  DROP TABLE IF EXISTS "pages" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_thank_you_buttons_style";
  `)
}
