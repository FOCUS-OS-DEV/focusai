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

-- Tables are managed by Payload CMS migrations
-- Run: npx payload migrate
