import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

// Fix instructors and testimonials tables to match collection definitions
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.secret !== 'RESET_NOW_PLEASE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })
    const results: Record<string, string> = {}

    // Drop and recreate instructors table with all columns
    console.log('Recreating instructors table...')
    await payload.db.drizzle.execute(sql`
      DROP TABLE IF EXISTS instructors_specialties CASCADE;
      DROP TABLE IF EXISTS instructors CASCADE;

      CREATE TABLE "instructors" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "slug" varchar,
        "title" varchar,
        "bio" jsonb,
        "short_bio" varchar,
        "image_id" integer,
        "external_image_url" varchar,
        "email" varchar,
        "linkedin" varchar,
        "order" numeric DEFAULT 0,
        "featured" boolean DEFAULT true,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

      CREATE UNIQUE INDEX "instructors_slug_idx" ON "instructors" USING btree ("slug");

      CREATE TABLE "instructors_specialties" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "specialty" varchar
      );
      CREATE INDEX "instructors_specialties_order_idx" ON "instructors_specialties" USING btree ("_order");
      CREATE INDEX "instructors_specialties_parent_id_idx" ON "instructors_specialties" USING btree ("_parent_id");

      ALTER TABLE "instructors_specialties" ADD CONSTRAINT "instructors_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
    `)
    results.instructors = 'recreated'

    // Fix testimonials table
    console.log('Recreating testimonials table...')
    await payload.db.drizzle.execute(sql`
      DROP TABLE IF EXISTS testimonials CASCADE;

      DO $$ BEGIN CREATE TYPE "public"."enum_testimonials_status" AS ENUM('pending', 'approved', 'rejected'); EXCEPTION WHEN duplicate_object THEN null; END $$;

      CREATE TABLE "testimonials" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "role" varchar,
        "image_id" integer,
        "external_image_url" varchar,
        "content" varchar NOT NULL,
        "rating" numeric DEFAULT 5,
        "course_id" integer,
        "video_url" varchar,
        "featured" boolean DEFAULT true,
        "status" "enum_testimonials_status" DEFAULT 'approved',
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
    `)
    results.testimonials = 'recreated'

    // Update courses_rels to reference instructors and testimonials
    console.log('Updating courses_rels foreign keys...')
    await payload.db.drizzle.execute(sql`
      DO $$ BEGIN ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
      DO $$ BEGIN ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    `)
    results.coursesRelsFks = 'added'

    console.log('Schema fix completed!')

    return NextResponse.json({
      success: true,
      message: 'Instructors and testimonials tables fixed',
      results,
    })
  } catch (error) {
    console.error('Fix instructors error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
