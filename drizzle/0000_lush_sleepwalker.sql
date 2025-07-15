CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"date-time" timestamp NOT NULL,
	"capacity" integer DEFAULT 0 NOT NULL,
	"registerations" integer,
	"created-at" timestamp DEFAULT now() NOT NULL,
	"updated-at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_registerations_users_id_fk" FOREIGN KEY ("registerations") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;