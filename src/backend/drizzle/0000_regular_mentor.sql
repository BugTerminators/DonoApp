CREATE TABLE "listings" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"created_by" text NOT NULL,
	"received_by" text,
	"category" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expire_at" timestamp,
	"order_pickup_time" timestamp,
	"quantity" varchar(100),
	"status" integer NOT NULL,
	"size" varchar(50),
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text,
	"phone_no" varchar(20),
	"account_type" integer NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"reward_point" integer DEFAULT 0,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_received_by_users_id_fk" FOREIGN KEY ("received_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;