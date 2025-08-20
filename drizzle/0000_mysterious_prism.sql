-- CREATE TABLE "chat_sessions" (
-- 	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"session_id" text NOT NULL,
-- 	"messages" jsonb DEFAULT '[]' NOT NULL,
-- 	"created_at" timestamp DEFAULT now(),
-- 	"updated_at" timestamp DEFAULT now()
-- );
-- --> statement-breakpoint
-- CREATE TABLE "contacts" (
-- 	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"first_name" text NOT NULL,
-- 	"last_name" text NOT NULL,
-- 	"email" text NOT NULL,
-- 	"project_type" text NOT NULL,
-- 	"budget" text NOT NULL,
-- 	"description" text NOT NULL,
-- 	"created_at" timestamp DEFAULT now()
-- );
-- --> statement-breakpoint
-- CREATE TABLE "users" (
-- 	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"username" text NOT NULL,
-- 	"password" text NOT NULL,
-- 	CONSTRAINT "users_username_unique" UNIQUE("username")
-- );


-- Drop tables if they exist (clean start)
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users table
CREATE TABLE "users" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    CONSTRAINT "users_username_unique" UNIQUE("username")
);

-- Create Contacts table
CREATE TABLE "contacts" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "email" text NOT NULL,
    "project_type" text NOT NULL,
    "budget" text NOT NULL,
    "description" text NOT NULL,
    "created_at" timestamp DEFAULT now()
);

-- Create Chat Sessions table
CREATE TABLE "chat_sessions" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "session_id" text NOT NULL,
    "messages" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);
