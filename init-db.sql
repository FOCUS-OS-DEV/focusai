-- Database initialization for Payload CMS
-- IMPORTANT: Never use DROP TABLE in production!

-- Enable UUID extension (required for Payload CMS 3.x)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables are managed by Payload CMS migrations
-- Run: npx payload migrate
