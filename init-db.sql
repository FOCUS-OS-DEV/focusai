-- Payload CMS 3.x with Drizzle - Full Schema
-- Create tables if they don't exist (safe for repeated runs)

-- Users table with all auth fields
CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY,
    "email" varchar(255) NOT NULL UNIQUE,
    "hash" varchar(255),
    "salt" varchar(255),
    "reset_password_token" varchar(255),
    "reset_password_expiration" timestamptz,
    "login_attempts" integer DEFAULT 0,
    "lock_until" timestamptz,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);

-- Users sessions table (required for auth)
CREATE TABLE IF NOT EXISTS "users_sessions" (
    "id" serial PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "session_token" varchar(255) NOT NULL,
    "expires_at" timestamptz NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_sessions_user_idx" ON "users_sessions"("user_id");

-- Media table
CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY,
    "alt" varchar(255) NOT NULL,
    "filename" varchar(255),
    "mime_type" varchar(255),
    "filesize" integer,
    "width" integer,
    "height" integer,
    "focal_x" integer,
    "focal_y" integer,
    "url" varchar(255),
    "thumbnail_u_r_l" varchar(255),
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);

-- Payload preferences
CREATE TABLE IF NOT EXISTS "payload_preferences" (
    "id" serial PRIMARY KEY,
    "key" varchar(255) NOT NULL,
    "value" jsonb,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
    "id" serial PRIMARY KEY,
    "order" integer,
    "parent_id" integer NOT NULL REFERENCES "payload_preferences"("id") ON DELETE CASCADE,
    "path" varchar(255) NOT NULL,
    "users_id" integer REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels"("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels"("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels"("path");

-- Payload locked documents
CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
    "id" serial PRIMARY KEY,
    "global_slug" varchar(255),
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY,
    "order" integer,
    "parent_id" integer NOT NULL REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE,
    "path" varchar(255) NOT NULL,
    "users_id" integer REFERENCES "users"("id") ON DELETE CASCADE,
    "media_id" integer REFERENCES "media"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels"("order");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels"("parent_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels"("path");

-- Payload migrations tracker
CREATE TABLE IF NOT EXISTS "payload_migrations" (
    "id" serial PRIMARY KEY,
    "name" varchar(255),
    "batch" integer,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL
);
