-- Payload CMS 3.x Initial Migration
-- Creates required tables for users, media, and system tables

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- payload_migrations table (tracks migrations)
CREATE TABLE IF NOT EXISTS "payload_migrations" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "batch" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
  "email" varchar NOT NULL UNIQUE,
  "hash" varchar,
  "salt" varchar,
  "reset_password_token" varchar,
  "reset_password_expiration" timestamp with time zone,
  "login_attempts" integer DEFAULT 0,
  "lock_until" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Create index on email
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");

-- media table
CREATE TABLE IF NOT EXISTS "media" (
  "id" serial PRIMARY KEY,
  "alt" varchar NOT NULL,
  "filename" varchar,
  "mime_type" varchar,
  "filesize" integer,
  "width" integer,
  "height" integer,
  "focal_x" integer,
  "focal_y" integer,
  "url" varchar,
  "thumbnail_u_r_l" varchar,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- payload_preferences table (admin UI preferences)
CREATE TABLE IF NOT EXISTS "payload_preferences" (
  "id" serial PRIMARY KEY,
  "key" varchar NOT NULL,
  "value" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- payload_preferences_rels table (relations for preferences)
CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  "id" serial PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL REFERENCES "payload_preferences"("id") ON DELETE CASCADE,
  "path" varchar NOT NULL,
  "users_id" integer REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");

-- payload_locked_documents table (document locking)
CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  "id" serial PRIMARY KEY,
  "global_slug" varchar,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- payload_locked_documents_rels table
CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  "id" serial PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE,
  "path" varchar NOT NULL,
  "users_id" integer REFERENCES "users"("id") ON DELETE CASCADE,
  "media_id" integer REFERENCES "media"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");

-- Record this migration
INSERT INTO "payload_migrations" ("name", "batch") 
VALUES ('001_initial', 1)
ON CONFLICT DO NOTHING;
