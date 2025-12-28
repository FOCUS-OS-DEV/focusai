import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

// Creates the full courses table schema with all array fields
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.secret !== 'RESET_NOW_PLEASE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })
    const results: Record<string, string> = {}

    // Create enums for courses
    console.log('Creating enums...')
    await payload.db.drizzle.execute(sql`
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_type" AS ENUM('frontal', 'digital', 'workshop', 'coaching'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_cohorts_format" AS ENUM('in-person', 'online', 'hybrid'); EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN CREATE TYPE "public"."enum_courses_cohorts_day_of_week" AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    `)
    results.enums = 'created'

    // Main courses table
    console.log('Creating courses table...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "subtitle" varchar,
        "description" jsonb,
        "excerpt" varchar,
        "featured_image_id" integer,
        "type" "enum_courses_type" DEFAULT 'frontal',
        "duration" varchar,
        "schedule" varchar,
        "location" varchar,
        "has_zoom" boolean DEFAULT false,
        "max_students" numeric,
        "instructor_ratio" varchar,
        "certificate" varchar,
        "certificate_description" varchar,
        "price" numeric,
        "show_price" boolean DEFAULT true,
        "next_cohort_date" varchar,
        "cta_text" varchar DEFAULT 'הרשמה לקורס',
        "cta_type" varchar DEFAULT 'form',
        "cta_link" varchar,
        "status" "enum_courses_status" DEFAULT 'draft',
        "order" numeric DEFAULT 0,
        "featured" boolean DEFAULT false,
        "seo_meta_title" varchar,
        "seo_meta_description" varchar,
        "seo_og_image_id" integer,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "courses_status_idx" ON "courses" USING btree ("status");
    `)
    results.coursesTable = 'created'

    // Pricing tracks
    console.log('Creating pricing tracks tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_pricing_tracks" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar,
        "schedule" varchar,
        "price" numeric,
        "original_price" numeric,
        "price_note" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_pricing_tracks_order_idx" ON "courses_pricing_tracks" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_pricing_tracks_parent_id_idx" ON "courses_pricing_tracks" USING btree ("_parent_id");

      CREATE TABLE IF NOT EXISTS "courses_pricing_tracks_features" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_pricing_tracks_features_order_idx" ON "courses_pricing_tracks_features" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_pricing_tracks_features_parent_id_idx" ON "courses_pricing_tracks_features" USING btree ("_parent_id");
    `)
    results.pricingTracks = 'created'

    // Cohorts
    console.log('Creating cohorts tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_cohorts" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "start_date" timestamp(3) with time zone,
        "end_date" timestamp(3) with time zone,
        "format" "enum_courses_cohorts_format" DEFAULT 'in-person',
        "day_of_week" "enum_courses_cohorts_day_of_week",
        "start_time" varchar,
        "end_time" varchar,
        "location" varchar,
        "price" numeric,
        "original_price" numeric,
        "price_note" varchar,
        "max_students" numeric,
        "available_seats" numeric,
        "registration_open" boolean DEFAULT true
      );
      CREATE INDEX IF NOT EXISTS "courses_cohorts_order_idx" ON "courses_cohorts" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_cohorts_parent_id_idx" ON "courses_cohorts" USING btree ("_parent_id");
    `)
    results.cohorts = 'created'

    // Why Now
    console.log('Creating why now tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_why_now" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar,
        "description" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_why_now_order_idx" ON "courses_why_now" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_why_now_parent_id_idx" ON "courses_why_now" USING btree ("_parent_id");
    `)
    results.whyNow = 'created'

    // Trust Badges
    console.log('Creating trust badges tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_trust_badges" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "text" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_trust_badges_order_idx" ON "courses_trust_badges" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_trust_badges_parent_id_idx" ON "courses_trust_badges" USING btree ("_parent_id");
    `)
    results.trustBadges = 'created'

    // Highlights
    console.log('Creating highlights tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_highlights" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "text" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
    `)
    results.highlights = 'created'

    // Syllabus
    console.log('Creating syllabus tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_syllabus" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "number" numeric,
        "title" varchar,
        "description" varchar,
        "icon" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_syllabus_order_idx" ON "courses_syllabus" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_syllabus_parent_id_idx" ON "courses_syllabus" USING btree ("_parent_id");

      CREATE TABLE IF NOT EXISTS "courses_syllabus_topics" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_syllabus_topics_order_idx" ON "courses_syllabus_topics" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_syllabus_topics_parent_id_idx" ON "courses_syllabus_topics" USING btree ("_parent_id");

      CREATE TABLE IF NOT EXISTS "courses_syllabus_tools" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_syllabus_tools_order_idx" ON "courses_syllabus_tools" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_syllabus_tools_parent_id_idx" ON "courses_syllabus_tools" USING btree ("_parent_id");
    `)
    results.syllabus = 'created'

    // FAQ
    console.log('Creating FAQ tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_faq" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "question" varchar,
        "answer" jsonb
      );
      CREATE INDEX IF NOT EXISTS "courses_faq_order_idx" ON "courses_faq" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_faq_parent_id_idx" ON "courses_faq" USING btree ("_parent_id");
    `)
    results.faq = 'created'

    // Gallery
    console.log('Creating gallery tables...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_gallery" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "image_id" integer,
        "caption" varchar
      );
      CREATE INDEX IF NOT EXISTS "courses_gallery_order_idx" ON "courses_gallery" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "courses_gallery_parent_id_idx" ON "courses_gallery" USING btree ("_parent_id");
    `)
    results.gallery = 'created'

    // Relationships
    console.log('Creating courses_rels table...')
    await payload.db.drizzle.execute(sql`
      CREATE TABLE IF NOT EXISTS "courses_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "instructors_id" integer,
        "testimonials_id" integer
      );
      CREATE INDEX IF NOT EXISTS "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
      CREATE INDEX IF NOT EXISTS "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
    `)
    results.rels = 'created'

    // Add foreign keys
    console.log('Adding foreign keys...')
    await payload.db.drizzle.execute(sql`
      DO $$ BEGIN ALTER TABLE "courses_pricing_tracks" ADD CONSTRAINT "courses_pricing_tracks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_pricing_tracks_features" ADD CONSTRAINT "courses_pricing_tracks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_pricing_tracks"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_cohorts" ADD CONSTRAINT "courses_cohorts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_why_now" ADD CONSTRAINT "courses_why_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_trust_badges" ADD CONSTRAINT "courses_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_syllabus" ADD CONSTRAINT "courses_syllabus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_syllabus_topics" ADD CONSTRAINT "courses_syllabus_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_syllabus"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_syllabus_tools" ADD CONSTRAINT "courses_syllabus_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_syllabus"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_faq" ADD CONSTRAINT "courses_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_gallery" ADD CONSTRAINT "courses_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    `)
    results.foreignKeys = 'created'

    // Check table count
    const tableCount = await payload.db.drizzle.execute(sql`
      SELECT COUNT(*) as count FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name LIKE 'courses%';
    `)
    results.coursesTableCount = (tableCount.rows[0] as { count: string }).count

    console.log('Courses schema created successfully!')

    return NextResponse.json({
      success: true,
      message: 'Courses schema created successfully',
      results,
    })
  } catch (error) {
    console.error('Create courses schema error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
