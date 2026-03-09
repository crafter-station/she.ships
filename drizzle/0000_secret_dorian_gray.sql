CREATE TABLE "badges" (
	"id" text PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"email" text,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"organization" text,
	"particle_config" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "badges_number_unique" UNIQUE("number"),
	CONSTRAINT "badges_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "posters" (
	"id" text PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"email" text,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"organization" text,
	"photo_url" text,
	"rendered_url" text,
	"filter_settings" jsonb,
	"face_detection" jsonb,
	"template" text DEFAULT 'half-face' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posters_number_unique" UNIQUE("number"),
	CONSTRAINT "posters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "social_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"category" text NOT NULL,
	"post_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
