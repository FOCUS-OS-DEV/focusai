-- Database initialization for Payload CMS
-- IMPORTANT: Never use DROP TABLE in production!

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE TABLES (if not exist)
-- =====================================================

-- Users table additions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'student';
    END IF;
END $$;

-- =====================================================
-- COURSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "courses" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "short_description" varchar,
    "description" jsonb,
    "thumbnail_id" integer,
    "preview_video" varchar,
    "price" numeric NOT NULL DEFAULT 0,
    "sale_price" numeric,
    "instructor_id" integer NOT NULL,
    "level" varchar DEFAULT 'beginner',
    "category" varchar,
    "status" varchar DEFAULT 'draft',
    "featured" boolean DEFAULT false,
    "students_count" numeric DEFAULT 0,
    "seo_meta_title" varchar,
    "seo_meta_description" text,
    "seo_meta_image_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- Courses indexes
CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" USING btree ("created_at");

-- Courses features array table
CREATE TABLE IF NOT EXISTS "courses_features" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "feature" varchar NOT NULL
);
CREATE INDEX IF NOT EXISTS "courses_features_order_idx" ON "courses_features" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "courses_features_parent_id_idx" ON "courses_features" USING btree ("_parent_id");

-- Courses requirements array table
CREATE TABLE IF NOT EXISTS "courses_requirements" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "requirement" varchar NOT NULL
);
CREATE INDEX IF NOT EXISTS "courses_requirements_order_idx" ON "courses_requirements" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "courses_requirements_parent_id_idx" ON "courses_requirements" USING btree ("_parent_id");

-- =====================================================
-- LESSONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "lessons" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "course_id" integer NOT NULL,
    "order_index" numeric DEFAULT 0,
    "content" jsonb,
    "video_url" varchar,
    "video_duration" numeric,
    "is_free" boolean DEFAULT false,
    "status" varchar DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "lessons_slug_idx" ON "lessons" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "lessons_course_idx" ON "lessons" USING btree ("course_id");

-- =====================================================
-- ENROLLMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "enrollments" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "course_id" integer NOT NULL,
    "status" varchar DEFAULT 'active',
    "progress" numeric DEFAULT 0,
    "enrolled_at" timestamp(3) with time zone DEFAULT now(),
    "completed_at" timestamp(3) with time zone,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "enrollments_user_idx" ON "enrollments" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "enrollments_course_idx" ON "enrollments" USING btree ("course_id");

-- =====================================================
-- PROGRESS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "progress" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "lesson_id" integer NOT NULL,
    "completed" boolean DEFAULT false,
    "completed_at" timestamp(3) with time zone,
    "watch_time" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "progress_user_idx" ON "progress" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "progress_lesson_idx" ON "progress" USING btree ("lesson_id");

-- =====================================================
-- PURCHASES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "purchases" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "course_id" integer NOT NULL,
    "amount" numeric NOT NULL,
    "currency" varchar DEFAULT 'ILS',
    "status" varchar DEFAULT 'pending',
    "payment_method" varchar,
    "transaction_id" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "purchases_user_idx" ON "purchases" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "purchases_course_idx" ON "purchases" USING btree ("course_id");

-- =====================================================
-- MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "messages" (
    "id" serial PRIMARY KEY NOT NULL,
    "from_id" integer,
    "to_id" integer,
    "subject" varchar,
    "content" text,
    "read" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- CERTIFICATES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "certificates" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "course_id" integer NOT NULL,
    "certificate_number" varchar,
    "issued_at" timestamp(3) with time zone DEFAULT now(),
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- COUPONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "coupons" (
    "id" serial PRIMARY KEY NOT NULL,
    "code" varchar NOT NULL,
    "discount_type" varchar DEFAULT 'percentage',
    "discount_value" numeric NOT NULL,
    "max_uses" numeric,
    "used_count" numeric DEFAULT 0,
    "valid_from" timestamp(3) with time zone,
    "valid_until" timestamp(3) with time zone,
    "active" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "coupons_code_idx" ON "coupons" USING btree ("code");

-- =====================================================
-- PAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "content" jsonb,
    "status" varchar DEFAULT 'draft',
    "meta_title" varchar,
    "meta_description" text,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");

-- =====================================================
-- POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "posts" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "content" jsonb,
    "excerpt" text,
    "author_id" integer,
    "status" varchar DEFAULT 'draft',
    "published_at" timestamp(3) with time zone,
    "featured_image_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");

-- =====================================================
-- CONTACTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "contacts" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "phone" varchar,
    "subject" varchar,
    "message" text,
    "status" varchar DEFAULT 'new',
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- RECORDINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "recordings" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "lesson_id" integer,
    "video_url" varchar,
    "duration" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- GLOBALS TABLES
-- =====================================================
CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "site_name" varchar,
    "logo_id" integer,
    "favicon_id" integer,
    "contact_email" varchar,
    "contact_phone" varchar,
    "contact_whatsapp" varchar,
    "contact_address" text,
    "social_facebook" varchar,
    "social_instagram" varchar,
    "social_linkedin" varchar,
    "social_youtube" varchar,
    "social_twitter" varchar,
    "social_tiktok" varchar,
    "seo_default_title" varchar,
    "seo_title_suffix" varchar,
    "seo_default_description" text,
    "seo_default_image_id" integer,
    "seo_keywords" varchar,
    "scripts_google_analytics" varchar,
    "scripts_facebook_pixel" varchar,
    "scripts_head_scripts" text,
    "scripts_body_scripts" text,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "navigation" (
    "id" serial PRIMARY KEY NOT NULL,
    "cta_button_text" varchar,
    "cta_button_url" varchar,
    "cta_button_is_visible" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "navigation_main_menu" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "label" varchar,
    "url" varchar,
    "open_in_new_tab" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "navigation_footer_menu" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "label" varchar,
    "url" varchar,
    "open_in_new_tab" boolean DEFAULT false
);

-- =====================================================
-- PAYLOAD LOCKED DOCUMENTS RELS - Add missing columns
-- =====================================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payload_locked_documents_rels') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'courses_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN courses_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'lessons_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN lessons_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'enrollments_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN enrollments_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'progress_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN progress_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'purchases_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN purchases_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'messages_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN messages_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'certificates_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN certificates_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'coupons_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN coupons_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'pages_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN pages_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'posts_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN posts_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'contacts_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN contacts_id integer;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'recordings_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN recordings_id integer;
        END IF;
    END IF;
END $$;

-- Insert initial records for globals if they don't exist
INSERT INTO site_settings (id, site_name)
SELECT 1, 'Focus AI Academy'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);

INSERT INTO navigation (id, cta_button_text, cta_button_url, cta_button_is_visible)
SELECT 1, 'צרו קשר', '#contact', true
WHERE NOT EXISTS (SELECT 1 FROM navigation WHERE id = 1);

-- Done!
