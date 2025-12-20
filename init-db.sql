-- Drop ALL existing tables so Payload can recreate them with correct schema
-- Payload CMS 3.x uses UUIDs, not integers

DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
DROP TABLE IF EXISTS "payload_preferences" CASCADE;
DROP TABLE IF EXISTS "users_sessions" CASCADE;
DROP TABLE IF EXISTS "media" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "payload_migrations" CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Let Payload CMS create the tables with push: true
