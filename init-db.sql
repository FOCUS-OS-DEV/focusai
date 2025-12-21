-- Database initialization for Payload CMS
-- IMPORTANT: Never use DROP TABLE in production!

-- Enable UUID extension (required for Payload CMS 3.x)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add missing columns to users table (safe - IF NOT EXISTS)
DO $$
BEGIN
    -- role column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'student';
    END IF;
END $$;

-- Add missing relationship columns to payload_locked_documents_rels
-- This fixes schema sync issues when new collections are added
DO $$
BEGIN
    -- Only run if the table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payload_locked_documents_rels') THEN
        -- courses_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'courses_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN courses_id integer;
        END IF;
        -- lessons_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'lessons_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN lessons_id integer;
        END IF;
        -- enrollments_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'enrollments_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN enrollments_id integer;
        END IF;
        -- progress_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'progress_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN progress_id integer;
        END IF;
        -- purchases_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'purchases_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN purchases_id integer;
        END IF;
        -- messages_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'messages_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN messages_id integer;
        END IF;
        -- certificates_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'certificates_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN certificates_id integer;
        END IF;
        -- coupons_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'coupons_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN coupons_id integer;
        END IF;
        -- pages_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'pages_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN pages_id integer;
        END IF;
        -- posts_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'posts_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN posts_id integer;
        END IF;
        -- contacts_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'contacts_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN contacts_id integer;
        END IF;
        -- recordings_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'recordings_id') THEN
            ALTER TABLE payload_locked_documents_rels ADD COLUMN recordings_id integer;
        END IF;
    END IF;
END $$;

-- Tables are managed by Payload CMS migrations
-- Run: npx payload migrate
