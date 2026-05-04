import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('Summit Director', 'Program Coordinator', 'Logistics Manager', 'Marketing Lead', 'Technical Director', 'Partnerships Manager');
  CREATE TYPE "public"."enum_registrations_type" AS ENUM('attendee', 'sponsor', 'exhibitor');
  CREATE TYPE "public"."enum_registrations_status" AS ENUM('pending', 'approved', 'rejected', 'paid', 'cancelled');
  CREATE TYPE "public"."enum_registrations_payment_method" AS ENUM('card', 'mobile', 'bank', 'pending');
  CREATE TYPE "public"."enum_registrations_attendee_details_ticket_type" AS ENUM('early-bird-1', 'early-bird-2', 'regular');
  CREATE TYPE "public"."enum_registrations_sponsor_details_sponsorship_tier" AS ENUM('platinum', 'gold', 'silver', 'bronze');
  CREATE TYPE "public"."enum_registrations_exhibitor_details_booth_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_booths_status" AS ENUM('available', 'reserved', 'occupied', 'maintenance');
  CREATE TYPE "public"."enum_booths_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_booths_tier" AS ENUM('premium', 'standard', 'economy');
  CREATE TYPE "public"."enum_tickets_type" AS ENUM('attendee', 'sponsor', 'exhibitor');
  CREATE TYPE "public"."enum_tickets_sub_type" AS ENUM('early-bird-1', 'early-bird-2', 'regular', 'platinum', 'gold', 'silver', 'bronze', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_payments_payment_method" AS ENUM('paynow', 'card', 'mobile', 'bank');
  CREATE TYPE "public"."enum_payments_status" AS ENUM('initiated', 'pending', 'paid', 'failed', 'cancelled');
  CREATE TYPE "public"."enum_speakers_category" AS ENUM('keynote', 'panelist', 'workshop', 'moderator');
  CREATE TYPE "public"."enum_speaker_applications_category" AS ENUM('keynote', 'panelist', 'workshop', 'moderator');
  CREATE TYPE "public"."enum_programs_day" AS ENUM('day-1', 'day-2');
  CREATE TYPE "public"."enum_programs_type" AS ENUM('keynote', 'panel', 'workshop', 'talk', 'networking', 'registration', 'opening', 'closing', 'lunch', 'break');
  CREATE TYPE "public"."enum_programs_track" AS ENUM('main', 'ai', 'security', 'cloud', 'fintech', 'entrepreneurship', 'social');
  CREATE TYPE "public"."enum_programs_venue" AS ENUM('main-auditorium', 'room-a', 'room-b', 'room-c', 'exhibition-hall', 'dining-hall', 'networking-lounge', 'grand-ballroom', 'main-lobby');
  CREATE TYPE "public"."enum_programs_color" AS ENUM('bg-blue-50 border-blue-200', 'bg-purple-50 border-purple-200', 'bg-amber-50 border-amber-200', 'bg-green-50 border-green-200', 'bg-red-50 border-red-200', 'bg-indigo-50 border-indigo-200', 'bg-yellow-50 border-yellow-200', 'bg-gray-50 border-gray-200', 'bg-cyan-50 border-cyan-200');
  CREATE TYPE "public"."enum_blogs_category" AS ENUM('technology-trends', 'digital-transformation', 'industry-insights', 'startup-ecosystem', 'cybersecurity', 'ai-ml', 'fintech', 'event-updates', 'success-stories', 'policy-regulation');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_previous_summits_images_category" AS ENUM('Ceremony', 'Speeches', 'Exhibition', 'Panels', 'Networking', 'Competition', 'Awards', 'Workshops');
  CREATE TYPE "public"."enum_previous_summits_videos_category" AS ENUM('Highlights', 'Speeches', 'Panels', 'Exhibition', 'Competition', 'Interviews');
  CREATE TYPE "public"."enum_previous_summits_color" AS ENUM('from-blue-500 to-cyan-400', 'from-purple-500 to-pink-400', 'from-green-500 to-teal-400', 'from-orange-500 to-red-400', 'from-indigo-500 to-purple-400');
  CREATE TYPE "public"."enum_previous_summits_gradient" AS ENUM('bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500', 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500', 'bg-gradient-to-br from-green-500 via-green-600 to-teal-500', 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-500', 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-500');
  CREATE TYPE "public"."enum_previous_summits_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_gallery_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_gallery_category" AS ENUM('Ceremony', 'Speeches', 'Exhibition', 'Panels', 'Networking', 'Competition', 'Awards', 'Workshops', 'Youth', 'Behind Scenes', 'Media', 'Highlights');
  CREATE TYPE "public"."enum_gallery_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_school_summit_section" AS ENUM('objectives', 'sub-themes', 'target-audience', 'why-attend', 'programme-highlights', 'expected-outcomes', 'featured-cards');
  CREATE TYPE "public"."enum_school_summit_objective_icon" AS ENUM('cpu', 'briefcase', 'lightbulb', 'heart-handshake');
  CREATE TYPE "public"."enum_school_summit_video_type" AS ENUM('youtube', 'direct');
  CREATE TYPE "public"."enum_school_summit_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"type" "enum_registrations_type" NOT NULL,
  	"status" "enum_registrations_status" DEFAULT 'pending',
  	"order_id" varchar,
  	"amount" numeric NOT NULL,
  	"payment_method" "enum_registrations_payment_method" DEFAULT 'pending',
  	"attendee_details_full_name" varchar,
  	"attendee_details_phone" varchar,
  	"attendee_details_organization" varchar,
  	"attendee_details_position" varchar,
  	"attendee_details_country" varchar,
  	"attendee_details_ticket_type" "enum_registrations_attendee_details_ticket_type",
  	"attendee_details_dietary_restrictions" varchar,
  	"sponsor_details_company_name" varchar,
  	"sponsor_details_contact_person" varchar,
  	"sponsor_details_phone" varchar,
  	"sponsor_details_website" varchar,
  	"sponsor_details_sponsorship_tier" "enum_registrations_sponsor_details_sponsorship_tier",
  	"sponsor_details_company_description" varchar,
  	"sponsor_details_number_of_team_members" numeric,
  	"sponsor_details_team_members" varchar,
  	"sponsor_details_interested_in_booth" boolean,
  	"exhibitor_details_company_name" varchar,
  	"exhibitor_details_contact_person" varchar,
  	"exhibitor_details_phone" varchar,
  	"exhibitor_details_website" varchar,
  	"exhibitor_details_industry" varchar,
  	"exhibitor_details_products_services" varchar,
  	"exhibitor_details_booth_size" "enum_registrations_exhibitor_details_booth_size",
  	"exhibitor_details_assigned_booth_id" integer,
  	"exhibitor_details_number_of_team_members" numeric,
  	"exhibitor_details_team_members" varchar,
  	"exhibitor_details_special_requirements" varchar,
  	"qr_code_id" integer,
  	"payment_proof_id" integer,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "booths" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booth_number" varchar NOT NULL,
  	"status" "enum_booths_status" DEFAULT 'available' NOT NULL,
  	"size" "enum_booths_size" NOT NULL,
  	"price" numeric NOT NULL,
  	"tier" "enum_booths_tier" DEFAULT 'standard' NOT NULL,
  	"dimensions_width" numeric DEFAULT 3 NOT NULL,
  	"dimensions_depth" numeric DEFAULT 3 NOT NULL,
  	"position_x" numeric DEFAULT 0 NOT NULL,
  	"position_y" numeric DEFAULT 0 NOT NULL,
  	"position_width" numeric DEFAULT 120 NOT NULL,
  	"position_height" numeric DEFAULT 80 NOT NULL,
  	"amenities_power" boolean DEFAULT true,
  	"amenities_wifi" boolean DEFAULT true,
  	"amenities_display" boolean DEFAULT false,
  	"amenities_furniture" boolean DEFAULT false,
  	"category" varchar,
  	"assigned_to_id" integer,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tickets_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "tickets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"type" "enum_tickets_type" NOT NULL,
  	"sub_type" "enum_tickets_sub_type",
  	"price" numeric NOT NULL,
  	"quantity" numeric NOT NULL,
  	"available" numeric,
  	"early_bird_end" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"registration_id" integer NOT NULL,
  	"order_id" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"currency" varchar DEFAULT 'USD' NOT NULL,
  	"payment_method" "enum_payments_payment_method" NOT NULL,
  	"status" "enum_payments_status" DEFAULT 'pending' NOT NULL,
  	"poll_url" varchar,
  	"instructions" jsonb,
  	"paid_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "speakers_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "speakers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"organization" varchar NOT NULL,
  	"designation" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"category" "enum_speakers_category" DEFAULT 'panelist',
  	"linkedin" varchar,
  	"twitter" varchar,
  	"website" varchar,
  	"email" varchar,
  	"featured" boolean DEFAULT false,
  	"session_title" varchar,
  	"session_time" varchar,
  	"session_location" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "speakers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "speaker_applications_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "speaker_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"designation" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"category" "enum_speaker_applications_category" DEFAULT 'panelist',
  	"linkedin" varchar,
  	"twitter" varchar,
  	"website" varchar,
  	"session_title" varchar,
  	"session_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programs_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"file_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"day" "enum_programs_day" DEFAULT 'day-1' NOT NULL,
  	"date" timestamp(3) with time zone,
  	"start_time" varchar NOT NULL,
  	"end_time" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"type" "enum_programs_type" NOT NULL,
  	"track" "enum_programs_track",
  	"speaker_id" integer,
  	"speaker_name" varchar,
  	"speaker_title" varchar,
  	"venue" "enum_programs_venue" NOT NULL,
  	"capacity" varchar,
  	"featured" boolean DEFAULT false,
  	"color" "enum_programs_color" DEFAULT 'bg-gray-50 border-gray-200',
  	"registration_link" varchar,
  	"notes" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"author_id" integer NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_title" varchar,
  	"author_bio" varchar,
  	"author_avatar_id" integer,
  	"category" "enum_blogs_category" DEFAULT 'technology-trends' NOT NULL,
  	"read_time" numeric DEFAULT 5 NOT NULL,
  	"status" "enum_blogs_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"trending" boolean DEFAULT false,
  	"likes" numeric DEFAULT 0,
  	"comments" numeric DEFAULT 0,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"views" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "previous_summits_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" varchar NOT NULL
  );
  
  CREATE TABLE "previous_summits_themes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme" varchar NOT NULL
  );
  
  CREATE TABLE "previous_summits_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_previous_summits_images_category" NOT NULL,
  	"likes" numeric DEFAULT 0
  );
  
  CREATE TABLE "previous_summits_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer,
  	"video_url" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_previous_summits_videos_category" NOT NULL,
  	"likes" numeric DEFAULT 0
  );
  
  CREATE TABLE "previous_summits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"theme" varchar NOT NULL,
  	"stats_delegates" varchar NOT NULL,
  	"stats_speakers" varchar NOT NULL,
  	"stats_exhibitors" varchar NOT NULL,
  	"stats_startups" varchar NOT NULL,
  	"stats_countries" varchar NOT NULL,
  	"stats_partnerships" varchar NOT NULL,
  	"stats_days" varchar,
  	"color" "enum_previous_summits_color" DEFAULT 'from-blue-500 to-cyan-400' NOT NULL,
  	"gradient" "enum_previous_summits_gradient" DEFAULT 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500' NOT NULL,
  	"status" "enum_previous_summits_status" DEFAULT 'published' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_gallery_type" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_gallery_category" NOT NULL,
  	"year" numeric NOT NULL,
  	"image_id" integer,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"views" numeric DEFAULT 0,
  	"likes" numeric DEFAULT 0,
  	"featured" boolean DEFAULT false,
  	"status" "enum_gallery_status" DEFAULT 'published' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "school_summit_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar
  );
  
  CREATE TABLE "school_summit" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"section" "enum_school_summit_section" NOT NULL,
  	"description" varchar NOT NULL,
  	"objective_icon" "enum_school_summit_objective_icon",
  	"card_image_id" integer,
  	"card_video" varchar,
  	"video_type" "enum_school_summit_video_type",
  	"card_link" varchar,
  	"order" numeric DEFAULT 0,
  	"status" "enum_school_summit_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"registrations_id" integer,
  	"booths_id" integer,
  	"tickets_id" integer,
  	"payments_id" integer,
  	"speakers_id" integer,
  	"speaker_applications_id" integer,
  	"programs_id" integer,
  	"blogs_id" integer,
  	"previous_summits_id" integer,
  	"gallery_id" integer,
  	"school_summit_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "registrations" ADD CONSTRAINT "registrations_exhibitor_details_assigned_booth_id_booths_id_fk" FOREIGN KEY ("exhibitor_details_assigned_booth_id") REFERENCES "public"."booths"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "registrations" ADD CONSTRAINT "registrations_qr_code_id_media_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "registrations" ADD CONSTRAINT "registrations_payment_proof_id_media_id_fk" FOREIGN KEY ("payment_proof_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "booths" ADD CONSTRAINT "booths_assigned_to_id_registrations_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."registrations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tickets_benefits" ADD CONSTRAINT "tickets_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payments" ADD CONSTRAINT "payments_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "speakers_expertise" ADD CONSTRAINT "speakers_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speakers" ADD CONSTRAINT "speakers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "speakers_rels" ADD CONSTRAINT "speakers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speakers_rels" ADD CONSTRAINT "speakers_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speaker_applications_expertise" ADD CONSTRAINT "speaker_applications_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speaker_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_materials" ADD CONSTRAINT "programs_materials_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_materials" ADD CONSTRAINT "programs_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_speaker_id_speakers_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."speakers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_tags" ADD CONSTRAINT "blogs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_summits_highlights" ADD CONSTRAINT "previous_summits_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_summits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "previous_summits_themes" ADD CONSTRAINT "previous_summits_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_summits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "previous_summits_images" ADD CONSTRAINT "previous_summits_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_summits_images" ADD CONSTRAINT "previous_summits_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_summits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "previous_summits_videos" ADD CONSTRAINT "previous_summits_videos_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_summits_videos" ADD CONSTRAINT "previous_summits_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_summits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "school_summit_skills" ADD CONSTRAINT "school_summit_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."school_summit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "school_summit" ADD CONSTRAINT "school_summit_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registrations_fk" FOREIGN KEY ("registrations_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_booths_fk" FOREIGN KEY ("booths_id") REFERENCES "public"."booths"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tickets_fk" FOREIGN KEY ("tickets_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payments_fk" FOREIGN KEY ("payments_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_speakers_fk" FOREIGN KEY ("speakers_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_speaker_applications_fk" FOREIGN KEY ("speaker_applications_id") REFERENCES "public"."speaker_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_previous_summits_fk" FOREIGN KEY ("previous_summits_id") REFERENCES "public"."previous_summits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_school_summit_fk" FOREIGN KEY ("school_summit_id") REFERENCES "public"."school_summit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "registrations_order_id_idx" ON "registrations" USING btree ("order_id");
  CREATE INDEX "registrations_exhibitor_details_exhibitor_details_assign_idx" ON "registrations" USING btree ("exhibitor_details_assigned_booth_id");
  CREATE INDEX "registrations_qr_code_idx" ON "registrations" USING btree ("qr_code_id");
  CREATE INDEX "registrations_payment_proof_idx" ON "registrations" USING btree ("payment_proof_id");
  CREATE INDEX "registrations_updated_at_idx" ON "registrations" USING btree ("updated_at");
  CREATE INDEX "registrations_created_at_idx" ON "registrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "booths_booth_number_idx" ON "booths" USING btree ("booth_number");
  CREATE INDEX "booths_assigned_to_idx" ON "booths" USING btree ("assigned_to_id");
  CREATE INDEX "booths_updated_at_idx" ON "booths" USING btree ("updated_at");
  CREATE INDEX "booths_created_at_idx" ON "booths" USING btree ("created_at");
  CREATE INDEX "tickets_benefits_order_idx" ON "tickets_benefits" USING btree ("_order");
  CREATE INDEX "tickets_benefits_parent_id_idx" ON "tickets_benefits" USING btree ("_parent_id");
  CREATE INDEX "tickets_updated_at_idx" ON "tickets" USING btree ("updated_at");
  CREATE INDEX "tickets_created_at_idx" ON "tickets" USING btree ("created_at");
  CREATE INDEX "payments_registration_idx" ON "payments" USING btree ("registration_id");
  CREATE INDEX "payments_updated_at_idx" ON "payments" USING btree ("updated_at");
  CREATE INDEX "payments_created_at_idx" ON "payments" USING btree ("created_at");
  CREATE INDEX "speakers_expertise_order_idx" ON "speakers_expertise" USING btree ("_order");
  CREATE INDEX "speakers_expertise_parent_id_idx" ON "speakers_expertise" USING btree ("_parent_id");
  CREATE INDEX "speakers_photo_idx" ON "speakers" USING btree ("photo_id");
  CREATE INDEX "speakers_updated_at_idx" ON "speakers" USING btree ("updated_at");
  CREATE INDEX "speakers_created_at_idx" ON "speakers" USING btree ("created_at");
  CREATE INDEX "speakers_rels_order_idx" ON "speakers_rels" USING btree ("order");
  CREATE INDEX "speakers_rels_parent_idx" ON "speakers_rels" USING btree ("parent_id");
  CREATE INDEX "speakers_rels_path_idx" ON "speakers_rels" USING btree ("path");
  CREATE INDEX "speakers_rels_programs_id_idx" ON "speakers_rels" USING btree ("programs_id");
  CREATE INDEX "speaker_applications_expertise_order_idx" ON "speaker_applications_expertise" USING btree ("_order");
  CREATE INDEX "speaker_applications_expertise_parent_id_idx" ON "speaker_applications_expertise" USING btree ("_parent_id");
  CREATE INDEX "speaker_applications_updated_at_idx" ON "speaker_applications" USING btree ("updated_at");
  CREATE INDEX "speaker_applications_created_at_idx" ON "speaker_applications" USING btree ("created_at");
  CREATE INDEX "programs_materials_order_idx" ON "programs_materials" USING btree ("_order");
  CREATE INDEX "programs_materials_parent_id_idx" ON "programs_materials" USING btree ("_parent_id");
  CREATE INDEX "programs_materials_file_idx" ON "programs_materials" USING btree ("file_id");
  CREATE INDEX "programs_speaker_idx" ON "programs" USING btree ("speaker_id");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "blogs_tags_order_idx" ON "blogs_tags" USING btree ("_order");
  CREATE INDEX "blogs_tags_parent_id_idx" ON "blogs_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");
  CREATE INDEX "blogs_author_avatar_idx" ON "blogs" USING btree ("author_avatar_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "previous_summits_highlights_order_idx" ON "previous_summits_highlights" USING btree ("_order");
  CREATE INDEX "previous_summits_highlights_parent_id_idx" ON "previous_summits_highlights" USING btree ("_parent_id");
  CREATE INDEX "previous_summits_themes_order_idx" ON "previous_summits_themes" USING btree ("_order");
  CREATE INDEX "previous_summits_themes_parent_id_idx" ON "previous_summits_themes" USING btree ("_parent_id");
  CREATE INDEX "previous_summits_images_order_idx" ON "previous_summits_images" USING btree ("_order");
  CREATE INDEX "previous_summits_images_parent_id_idx" ON "previous_summits_images" USING btree ("_parent_id");
  CREATE INDEX "previous_summits_images_image_idx" ON "previous_summits_images" USING btree ("image_id");
  CREATE INDEX "previous_summits_videos_order_idx" ON "previous_summits_videos" USING btree ("_order");
  CREATE INDEX "previous_summits_videos_parent_id_idx" ON "previous_summits_videos" USING btree ("_parent_id");
  CREATE INDEX "previous_summits_videos_thumbnail_idx" ON "previous_summits_videos" USING btree ("thumbnail_id");
  CREATE UNIQUE INDEX "previous_summits_year_idx" ON "previous_summits" USING btree ("year");
  CREATE INDEX "previous_summits_updated_at_idx" ON "previous_summits" USING btree ("updated_at");
  CREATE INDEX "previous_summits_created_at_idx" ON "previous_summits" USING btree ("created_at");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_thumbnail_idx" ON "gallery" USING btree ("thumbnail_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "school_summit_skills_order_idx" ON "school_summit_skills" USING btree ("_order");
  CREATE INDEX "school_summit_skills_parent_id_idx" ON "school_summit_skills" USING btree ("_parent_id");
  CREATE INDEX "school_summit_card_image_idx" ON "school_summit" USING btree ("card_image_id");
  CREATE INDEX "school_summit_updated_at_idx" ON "school_summit" USING btree ("updated_at");
  CREATE INDEX "school_summit_created_at_idx" ON "school_summit" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("registrations_id");
  CREATE INDEX "payload_locked_documents_rels_booths_id_idx" ON "payload_locked_documents_rels" USING btree ("booths_id");
  CREATE INDEX "payload_locked_documents_rels_tickets_id_idx" ON "payload_locked_documents_rels" USING btree ("tickets_id");
  CREATE INDEX "payload_locked_documents_rels_payments_id_idx" ON "payload_locked_documents_rels" USING btree ("payments_id");
  CREATE INDEX "payload_locked_documents_rels_speakers_id_idx" ON "payload_locked_documents_rels" USING btree ("speakers_id");
  CREATE INDEX "payload_locked_documents_rels_speaker_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("speaker_applications_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_previous_summits_id_idx" ON "payload_locked_documents_rels" USING btree ("previous_summits_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_school_summit_id_idx" ON "payload_locked_documents_rels" USING btree ("school_summit_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "registrations" CASCADE;
  DROP TABLE "booths" CASCADE;
  DROP TABLE "tickets_benefits" CASCADE;
  DROP TABLE "tickets" CASCADE;
  DROP TABLE "payments" CASCADE;
  DROP TABLE "speakers_expertise" CASCADE;
  DROP TABLE "speakers" CASCADE;
  DROP TABLE "speakers_rels" CASCADE;
  DROP TABLE "speaker_applications_expertise" CASCADE;
  DROP TABLE "speaker_applications" CASCADE;
  DROP TABLE "programs_materials" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "blogs_tags" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "previous_summits_highlights" CASCADE;
  DROP TABLE "previous_summits_themes" CASCADE;
  DROP TABLE "previous_summits_images" CASCADE;
  DROP TABLE "previous_summits_videos" CASCADE;
  DROP TABLE "previous_summits" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "school_summit_skills" CASCADE;
  DROP TABLE "school_summit" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_registrations_type";
  DROP TYPE "public"."enum_registrations_status";
  DROP TYPE "public"."enum_registrations_payment_method";
  DROP TYPE "public"."enum_registrations_attendee_details_ticket_type";
  DROP TYPE "public"."enum_registrations_sponsor_details_sponsorship_tier";
  DROP TYPE "public"."enum_registrations_exhibitor_details_booth_size";
  DROP TYPE "public"."enum_booths_status";
  DROP TYPE "public"."enum_booths_size";
  DROP TYPE "public"."enum_booths_tier";
  DROP TYPE "public"."enum_tickets_type";
  DROP TYPE "public"."enum_tickets_sub_type";
  DROP TYPE "public"."enum_payments_payment_method";
  DROP TYPE "public"."enum_payments_status";
  DROP TYPE "public"."enum_speakers_category";
  DROP TYPE "public"."enum_speaker_applications_category";
  DROP TYPE "public"."enum_programs_day";
  DROP TYPE "public"."enum_programs_type";
  DROP TYPE "public"."enum_programs_track";
  DROP TYPE "public"."enum_programs_venue";
  DROP TYPE "public"."enum_programs_color";
  DROP TYPE "public"."enum_blogs_category";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum_previous_summits_images_category";
  DROP TYPE "public"."enum_previous_summits_videos_category";
  DROP TYPE "public"."enum_previous_summits_color";
  DROP TYPE "public"."enum_previous_summits_gradient";
  DROP TYPE "public"."enum_previous_summits_status";
  DROP TYPE "public"."enum_gallery_type";
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_gallery_status";
  DROP TYPE "public"."enum_school_summit_section";
  DROP TYPE "public"."enum_school_summit_objective_icon";
  DROP TYPE "public"."enum_school_summit_video_type";
  DROP TYPE "public"."enum_school_summit_status";`)
}
