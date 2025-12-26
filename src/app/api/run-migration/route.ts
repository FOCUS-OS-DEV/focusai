import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const results: Record<string, string> = {}

  try {
    console.log('🔄 Running migrations...')

    const payload = await getPayload({ config })
    results.payloadInit = 'success'

    // Run migrations using Payload's migrate method
    try {
      const dbAdapter = payload.db as { migrate?: () => Promise<void> }
      if (dbAdapter.migrate) {
        await dbAdapter.migrate()
        results.migrate = 'success'
      } else {
        results.migrate = 'migrate method not available'
      }
    } catch (migrateError) {
      results.migrate =
        'error: ' + (migrateError instanceof Error ? migrateError.message : String(migrateError))
    }

    // Check if pages table now exists
    const pagesTableCheck = await payload.db.drizzle.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'pages'
      );
    `)
    const pagesTableExists = (pagesTableCheck.rows[0] as { exists: boolean })?.exists
    results.pagesTableExists = String(pagesTableExists)

    // If pages table still doesn't exist, run manual SQL
    if (!pagesTableExists) {
      console.log('📋 Pages table missing, running manual creation...')

      try {
        // Create the enum type
        await payload.db.drizzle.execute(sql`
          DO $$ BEGIN
            CREATE TYPE "public"."enum_pages_thank_you_buttons_style" AS ENUM('primary', 'secondary', 'whatsapp');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;
        `)
        results.enumCreation = 'success'

        // Create the pages table
        await payload.db.drizzle.execute(sql`
          CREATE TABLE IF NOT EXISTS "pages" (
            "id" serial PRIMARY KEY NOT NULL,
            "about_hero_title" varchar DEFAULT 'אנחנו',
            "about_hero_title_highlight" varchar DEFAULT 'Focus AI Academy',
            "about_hero_subtitle" varchar,
            "about_mission_badge" varchar DEFAULT 'המשימה שלנו',
            "about_mission_title" varchar,
            "about_mission_title_highlight" varchar,
            "about_team_badge" varchar DEFAULT 'הצוות שלנו',
            "about_team_title" varchar,
            "about_team_subtitle" varchar,
            "about_cta_title" varchar,
            "about_cta_subtitle" varchar,
            "about_cta_primary_button_text" varchar,
            "about_cta_primary_button_link" varchar,
            "about_cta_secondary_button_text" varchar,
            "about_cta_secondary_button_link" varchar,
            "courses_hero_title" varchar,
            "courses_hero_title_highlight" varchar,
            "courses_hero_subtitle" varchar,
            "courses_empty_state_title" varchar,
            "courses_empty_state_subtitle" varchar,
            "courses_empty_state_button_text" varchar,
            "courses_cta_title" varchar,
            "courses_cta_subtitle" varchar,
            "courses_cta_primary_button_text" varchar,
            "courses_cta_primary_button_link" varchar,
            "courses_cta_secondary_button_text" varchar,
            "courses_cta_secondary_button_link" varchar,
            "blog_hero_title" varchar,
            "blog_hero_title_highlight" varchar,
            "blog_hero_subtitle" varchar,
            "blog_empty_state_no_results" varchar,
            "blog_empty_state_no_posts" varchar,
            "blog_empty_state_no_posts_subtitle" varchar,
            "blog_empty_state_filter_subtitle" varchar,
            "blog_cta_title" varchar,
            "blog_cta_subtitle" varchar,
            "blog_cta_primary_button_text" varchar,
            "blog_cta_primary_button_link" varchar,
            "blog_cta_secondary_button_text" varchar,
            "blog_cta_secondary_button_link" varchar,
            "blog_post_cta_title" varchar,
            "blog_post_cta_subtitle" varchar,
            "thank_you_icon" varchar DEFAULT '🎉',
            "thank_you_title" varchar,
            "thank_you_subtitle" varchar,
            "thank_you_description" varchar,
            "thank_you_what_next_title" varchar,
            "ai_ready_hero_badge" varchar,
            "ai_ready_hero_title" varchar,
            "ai_ready_hero_title_highlight" varchar,
            "ai_ready_hero_subtitle" varchar,
            "ai_ready_hero_primary_cta" varchar,
            "ai_ready_hero_secondary_cta" varchar,
            "ai_ready_audience_title" varchar,
            "ai_ready_audience_subtitle" varchar,
            "ai_ready_benefits_title" varchar,
            "ai_ready_benefits_subtitle" varchar,
            "ai_ready_pricing_title" varchar,
            "ai_ready_pricing_subtitle" varchar,
            "ai_ready_pricing_next_cohort_date" varchar,
            "ai_ready_pricing_frontal_track_title" varchar,
            "ai_ready_pricing_frontal_track_schedule" varchar,
            "ai_ready_pricing_frontal_track_original_price" varchar,
            "ai_ready_pricing_frontal_track_price" varchar,
            "ai_ready_pricing_frontal_track_price_note" varchar,
            "ai_ready_pricing_zoom_track_title" varchar,
            "ai_ready_pricing_zoom_track_schedule" varchar,
            "ai_ready_pricing_zoom_track_original_price" varchar,
            "ai_ready_pricing_zoom_track_price" varchar,
            "ai_ready_pricing_zoom_track_price_note" varchar,
            "ai_ready_testimonials_badge" varchar,
            "ai_ready_testimonials_title" varchar,
            "ai_ready_testimonials_title_highlight" varchar,
            "ai_ready_about_title" varchar,
            "ai_ready_team_title" varchar,
            "ai_ready_team_subtitle" varchar,
            "ai_ready_cta_title" varchar,
            "ai_ready_cta_subtitle" varchar,
            "ai_ready_form_title" varchar,
            "ai_ready_form_subtitle" varchar,
            "ai_ready_form_button_text" varchar,
            "ai_ready_syllabus_badge" varchar,
            "ai_ready_syllabus_title" varchar,
            "ai_ready_syllabus_subtitle" varchar,
            "ai_ready_why_now_badge" varchar,
            "ai_ready_why_now_title" varchar,
            "course_single_buttons_register" varchar,
            "course_single_buttons_syllabus" varchar,
            "course_single_buttons_contact" varchar,
            "course_single_buttons_back_home" varchar,
            "course_single_sections_who_is_it_for" varchar,
            "course_single_sections_why_now" varchar,
            "course_single_sections_what_you_get" varchar,
            "course_single_sections_highlights" varchar,
            "course_single_sections_syllabus" varchar,
            "course_single_sections_team" varchar,
            "course_single_sections_testimonials" varchar,
            "course_single_sections_faq" varchar,
            "course_single_alerts_spots_left" varchar,
            "course_single_cta_title" varchar,
            "course_single_cta_subtitle" varchar,
            "common_cta_whatsapp_number" varchar,
            "common_cta_whatsapp_text" varchar,
            "common_cta_contact_button_text" varchar,
            "updated_at" timestamp(3) with time zone,
            "created_at" timestamp(3) with time zone
          );
        `)
        results.pagesTableCreation = 'success'

        // Create related tables
        await payload.db.drizzle.execute(sql`
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
        `)
        results.relatedTablesCreation = 'success'

        // Add foreign key constraints
        await payload.db.drizzle.execute(sql`
          DO $$ BEGIN
            ALTER TABLE "pages_about_mission_paragraphs" ADD CONSTRAINT "pages_about_mission_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_about_values" ADD CONSTRAINT "pages_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_thank_you_what_next_items" ADD CONSTRAINT "pages_thank_you_what_next_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_thank_you_buttons" ADD CONSTRAINT "pages_thank_you_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_ai_ready_trust_badges" ADD CONSTRAINT "pages_ai_ready_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_ai_ready_syllabus_meetings" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_ai_ready_syllabus_meetings_topics" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_ai_ready_syllabus_meetings"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_ai_ready_syllabus_meetings_tools" ADD CONSTRAINT "pages_ai_ready_syllabus_meetings_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_ai_ready_syllabus_meetings"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;

          DO $$ BEGIN
            ALTER TABLE "pages_ai_ready_why_now_cards" ADD CONSTRAINT "pages_ai_ready_why_now_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
          EXCEPTION WHEN duplicate_object THEN null; END $$;
        `)
        results.foreignKeysCreation = 'success'

        // Create indexes
        await payload.db.drizzle.execute(sql`
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
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_order_idx" ON "pages_ai_ready_syllabus_meetings" USING btree ("_order");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_parent_id_idx" ON "pages_ai_ready_syllabus_meetings" USING btree ("_parent_id");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_topics_order_idx" ON "pages_ai_ready_syllabus_meetings_topics" USING btree ("_order");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_topics_parent_id_idx" ON "pages_ai_ready_syllabus_meetings_topics" USING btree ("_parent_id");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_tools_order_idx" ON "pages_ai_ready_syllabus_meetings_tools" USING btree ("_order");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_syllabus_meetings_tools_parent_id_idx" ON "pages_ai_ready_syllabus_meetings_tools" USING btree ("_parent_id");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_why_now_cards_order_idx" ON "pages_ai_ready_why_now_cards" USING btree ("_order");
          CREATE INDEX IF NOT EXISTS "pages_ai_ready_why_now_cards_parent_id_idx" ON "pages_ai_ready_why_now_cards" USING btree ("_parent_id");
        `)
        results.indexesCreation = 'success'
      } catch (sqlError) {
        results.manualCreation =
          'error: ' + (sqlError instanceof Error ? sqlError.message : String(sqlError))
      }
    }

    // Final check
    const finalCheck = await payload.db.drizzle.execute(sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'pages%'
      ORDER BY table_name;
    `)
    results.pagesTablesAfter = JSON.stringify(
      finalCheck.rows.map((r) => (r as { table_name: string }).table_name)
    )

    return NextResponse.json({
      success: true,
      message: 'Migration completed',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Migration failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: String(error),
        results,
      },
      { status: 500 }
    )
  }
}
