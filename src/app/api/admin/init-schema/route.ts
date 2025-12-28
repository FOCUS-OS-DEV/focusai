import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

// This endpoint creates all base Payload tables needed for the CMS to function
// After running this, Payload's push: true will sync the rest of the schema
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.secret !== 'RESET_NOW_PLEASE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })
    const results: Record<string, string> = {}

    // Step 1: Create core Payload tables
    console.log('Creating core Payload tables...')

    await payload.db.drizzle.execute(sql`
      -- Users table (required for Payload auth)
      CREATE TABLE IF NOT EXISTS "users_sessions" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "created_at" timestamp(3) with time zone,
        "expires_at" timestamp(3) with time zone NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "first_name" varchar,
        "last_name" varchar,
        "role" varchar DEFAULT 'student',
        "phone" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "email" varchar NOT NULL,
        "reset_password_token" varchar,
        "reset_password_expiration" timestamp(3) with time zone,
        "salt" varchar,
        "hash" varchar,
        "login_attempts" numeric DEFAULT 0,
        "lock_until" timestamp(3) with time zone
      );

      CREATE TABLE IF NOT EXISTS "users_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "courses_id" integer
      );

      -- Media table
      CREATE TABLE IF NOT EXISTS "media" (
        "id" serial PRIMARY KEY NOT NULL,
        "alt" varchar NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "url" varchar,
        "thumbnail_u_r_l" varchar,
        "filename" varchar,
        "mime_type" varchar,
        "filesize" numeric,
        "width" numeric,
        "height" numeric,
        "focal_x" numeric,
        "focal_y" numeric
      );

      -- Payload system tables
      CREATE TABLE IF NOT EXISTS "payload_kv" (
        "id" serial PRIMARY KEY NOT NULL,
        "key" varchar NOT NULL,
        "data" jsonb NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
        "id" serial PRIMARY KEY NOT NULL,
        "global_slug" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "users_id" integer,
        "media_id" integer
      );

      CREATE TABLE IF NOT EXISTS "payload_preferences" (
        "id" serial PRIMARY KEY NOT NULL,
        "key" varchar,
        "value" jsonb,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "users_id" integer
      );

      CREATE TABLE IF NOT EXISTS "payload_migrations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar,
        "batch" numeric,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
    `)
    results.coreTables = 'created'

    // Step 2: Create enums
    console.log('Creating enums...')
    await payload.db.drizzle.execute(sql`
      DO $$ BEGIN CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'instructor', 'student'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_type" AS ENUM('frontal', 'digital', 'workshop', 'coaching'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_cohorts_status" AS ENUM('upcoming', 'active', 'completed'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_cohorts_format" AS ENUM('in-person', 'online', 'hybrid'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_cohorts_day_of_week" AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_enrollments_status" AS ENUM('pending', 'active', 'completed', 'cancelled'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_contacts_status" AS ENUM('new', 'contacted', 'qualified', 'converted', 'lost'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_pages_thank_you_buttons_style" AS ENUM('primary', 'secondary', 'whatsapp'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    `)
    results.enums = 'created'

    // Step 3: Create collection tables
    console.log('Creating collection tables...')
    await payload.db.drizzle.execute(sql`
      -- Courses
      CREATE TABLE IF NOT EXISTS "courses" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "subtitle" varchar,
        "excerpt" varchar,
        "description" jsonb,
        "type" "enum_courses_type" DEFAULT 'frontal',
        "duration" varchar,
        "schedule" varchar,
        "location" varchar,
        "has_zoom" boolean DEFAULT false,
        "max_students" numeric,
        "instructor_ratio" varchar,
        "certificate" boolean DEFAULT true,
        "certificate_description" varchar,
        "cta_text" varchar DEFAULT 'הרשמה לקורס',
        "cta_type" varchar DEFAULT 'form',
        "cta_link" varchar,
        "status" "enum_courses_status" DEFAULT 'draft',
        "order" numeric DEFAULT 0,
        "featured" boolean DEFAULT false,
        "seo_meta_title" varchar,
        "seo_meta_description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Cohorts
      CREATE TABLE IF NOT EXISTS "cohorts" (
        "id" serial PRIMARY KEY NOT NULL,
        "course_id" integer NOT NULL,
        "start_date" timestamp(3) with time zone NOT NULL,
        "end_date" timestamp(3) with time zone,
        "format" "enum_cohorts_format" DEFAULT 'in-person',
        "day_of_week" "enum_cohorts_day_of_week",
        "start_time" varchar,
        "end_time" varchar,
        "location" varchar,
        "price" numeric,
        "original_price" numeric,
        "price_note" varchar,
        "max_students" numeric,
        "available_seats" numeric,
        "registration_open" boolean DEFAULT true,
        "status" "enum_cohorts_status" DEFAULT 'upcoming',
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Categories
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "color" varchar DEFAULT '#8B5CF6',
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Posts
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "excerpt" varchar,
        "content" jsonb,
        "category_id" integer,
        "author_id" integer,
        "status" "enum_posts_status" DEFAULT 'draft',
        "published_at" timestamp(3) with time zone,
        "reading_time" numeric,
        "seo_meta_title" varchar,
        "seo_meta_description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Instructors
      CREATE TABLE IF NOT EXISTS "instructors" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "role" varchar NOT NULL,
        "bio" varchar,
        "linkedin" varchar,
        "order" numeric DEFAULT 0,
        "featured" boolean DEFAULT true,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Testimonials
      CREATE TABLE IF NOT EXISTS "testimonials" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "role" varchar,
        "company" varchar,
        "quote" varchar NOT NULL,
        "rating" numeric DEFAULT 5,
        "featured" boolean DEFAULT true,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Contacts (leads)
      CREATE TABLE IF NOT EXISTS "contacts" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "email" varchar NOT NULL,
        "phone" varchar,
        "message" varchar,
        "source" varchar,
        "course_interest" varchar,
        "status" "enum_contacts_status" DEFAULT 'new',
        "notes" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Partners
      CREATE TABLE IF NOT EXISTS "partners" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "type" varchar DEFAULT 'academic',
        "website" varchar,
        "order" numeric DEFAULT 0,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Lessons
      CREATE TABLE IF NOT EXISTS "lessons" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "description" varchar,
        "video_url" varchar,
        "duration" numeric,
        "order" numeric DEFAULT 0,
        "cohort_id" integer,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Enrollments
      CREATE TABLE IF NOT EXISTS "enrollments" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "cohort_id" integer NOT NULL,
        "status" "enum_enrollments_status" DEFAULT 'pending',
        "enrolled_at" timestamp(3) with time zone,
        "completed_at" timestamp(3) with time zone,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Progress
      CREATE TABLE IF NOT EXISTS "progress" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "lesson_id" integer NOT NULL,
        "completed" boolean DEFAULT false,
        "watched_seconds" numeric DEFAULT 0,
        "last_watched_at" timestamp(3) with time zone,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Attendance
      CREATE TABLE IF NOT EXISTS "attendance" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "lesson_id" integer NOT NULL,
        "cohort_id" integer NOT NULL,
        "present" boolean DEFAULT false,
        "notes" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Assignments
      CREATE TABLE IF NOT EXISTS "assignments" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "description" jsonb,
        "cohort_id" integer,
        "due_date" timestamp(3) with time zone,
        "max_score" numeric DEFAULT 100,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Submissions
      CREATE TABLE IF NOT EXISTS "submissions" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "assignment_id" integer NOT NULL,
        "content" jsonb,
        "file_url" varchar,
        "score" numeric,
        "feedback" varchar,
        "submitted_at" timestamp(3) with time zone,
        "graded_at" timestamp(3) with time zone,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      -- Certificates
      CREATE TABLE IF NOT EXISTS "certificates" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "course_id" integer NOT NULL,
        "cohort_id" integer,
        "certificate_number" varchar NOT NULL,
        "issued_at" timestamp(3) with time zone,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
    `)
    results.collectionTables = 'created'

    // Step 4: Create global tables
    console.log('Creating global tables...')
    await payload.db.drizzle.execute(sql`
      -- Site Settings
      CREATE TABLE IF NOT EXISTS "site_settings" (
        "id" serial PRIMARY KEY NOT NULL,
        "site_name" varchar DEFAULT 'Focus AI Academy',
        "site_description" varchar,
        "contact_email" varchar,
        "contact_phone" varchar,
        "contact_whatsapp" varchar,
        "contact_address" varchar,
        "social_facebook" varchar,
        "social_instagram" varchar,
        "social_linkedin" varchar,
        "social_tiktok" varchar,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      );

      -- Navigation
      CREATE TABLE IF NOT EXISTS "navigation" (
        "id" serial PRIMARY KEY NOT NULL,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      );

      CREATE TABLE IF NOT EXISTS "navigation_main_menu" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "label" varchar NOT NULL,
        "link" varchar NOT NULL,
        "highlight" boolean DEFAULT false
      );

      -- Homepage
      CREATE TABLE IF NOT EXISTS "homepage" (
        "id" serial PRIMARY KEY NOT NULL,
        "hero_title" varchar,
        "hero_title_highlight" varchar,
        "hero_subtitle" varchar,
        "hero_primary_cta_text" varchar,
        "hero_primary_cta_link" varchar,
        "hero_secondary_cta_text" varchar,
        "hero_secondary_cta_link" varchar,
        "global_stats_graduates" numeric DEFAULT 500,
        "global_stats_courses" numeric DEFAULT 50,
        "global_stats_companies" numeric DEFAULT 100,
        "global_stats_satisfaction" numeric DEFAULT 98,
        "about_title" varchar,
        "about_subtitle" varchar,
        "about_content" varchar,
        "sections_programs_title" varchar,
        "sections_programs_subtitle" varchar,
        "sections_testimonials_badge" varchar,
        "sections_testimonials_title" varchar,
        "sections_testimonials_title_highlight" varchar,
        "sections_team_badge" varchar,
        "sections_team_title" varchar,
        "sections_team_subtitle" varchar,
        "sections_partners_title" varchar,
        "newsletter_title" varchar,
        "newsletter_description" varchar,
        "newsletter_button_text" varchar,
        "newsletter_webhook_url" varchar,
        "bottom_cta_title" varchar,
        "bottom_cta_subtitle" varchar,
        "bottom_cta_show_form" boolean DEFAULT true,
        "bottom_cta_show_whatsapp" boolean DEFAULT true,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      );

      CREATE TABLE IF NOT EXISTS "homepage_why_us" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar NOT NULL,
        "description" varchar NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "homepage_about_features" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar NOT NULL
      );

      -- Pages global
      CREATE TABLE IF NOT EXISTS "pages" (
        "id" serial PRIMARY KEY NOT NULL,
        "about_hero_title" varchar DEFAULT 'אנחנו',
        "about_hero_title_highlight" varchar DEFAULT 'Focus AI Academy',
        "about_hero_subtitle" varchar,
        "courses_hero_title" varchar,
        "courses_hero_title_highlight" varchar,
        "courses_hero_subtitle" varchar,
        "blog_hero_title" varchar,
        "blog_hero_title_highlight" varchar,
        "blog_hero_subtitle" varchar,
        "thank_you_icon" varchar DEFAULT '🎉',
        "thank_you_title" varchar,
        "thank_you_subtitle" varchar,
        "thank_you_description" varchar,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      );
    `)
    results.globalTables = 'created'

    // Step 5: Create indexes
    console.log('Creating indexes...')
    await payload.db.drizzle.execute(sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
      CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
      CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "courses_status_idx" ON "courses" USING btree ("status");
      CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
      CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "posts_status_idx" ON "posts" USING btree ("status");
      CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
    `)
    results.indexes = 'created'

    // Check final table count
    const tableCount = await payload.db.drizzle.execute(sql`
      SELECT COUNT(*) as count FROM information_schema.tables
      WHERE table_schema = 'public';
    `)
    results.tableCount = String((tableCount.rows[0] as { count: string }).count)

    console.log('Schema initialization complete!')

    return NextResponse.json({
      success: true,
      message: 'Schema initialized successfully. Redeploy to trigger push: true for remaining schema sync.',
      results,
    })
  } catch (error) {
    console.error('Schema init error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
