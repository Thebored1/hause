-- Hause Interiors - schema update for Supabase (Postgres)
--
-- Extracted verbatim from src/migrations/20260812_190051_seo.ts, which is what
-- `payload migrate` would run. Paste the whole file into the Supabase SQL
-- editor and run it once.
--
-- Wrapped in a transaction: if any statement fails nothing is applied, so you
-- can fix it and re-run rather than being left half-migrated.
--
-- The final INSERT records the migration in `payload_migrations`. Without it
-- Payload treats the migration as outstanding and tries to apply it again on
-- the next deploy, which then fails on objects that already exist.

BEGIN;
   CREATE TYPE "public"."enum_pages_meta_schema_type" AS ENUM('page', 'service', 'article');
  CREATE TYPE "public"."enum_pages_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__pages_v_version_meta_schema_type" AS ENUM('page', 'service', 'article');
  CREATE TYPE "public"."enum__pages_v_version_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum_posts_meta_schema_type" AS ENUM('page', 'service', 'article');
  CREATE TYPE "public"."enum_posts_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__posts_v_version_meta_schema_type" AS ENUM('page', 'service', 'article');
  CREATE TYPE "public"."enum__posts_v_version_meta_og_type" AS ENUM('website', 'article');
  CREATE TABLE "site_settings_site_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_business_area_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_schema_type" "enum_pages_meta_schema_type" DEFAULT 'page';
  ALTER TABLE "pages" ADD COLUMN "meta_og_type" "enum_pages_meta_og_type" DEFAULT 'website';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_noindex" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_schema_type" "enum__pages_v_version_meta_schema_type" DEFAULT 'page';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_og_type" "enum__pages_v_version_meta_og_type" DEFAULT 'website';
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_schema_type" "enum_posts_meta_schema_type" DEFAULT 'page';
  ALTER TABLE "posts" ADD COLUMN "meta_og_type" "enum_posts_meta_og_type" DEFAULT 'website';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_noindex" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_schema_type" "enum__posts_v_version_meta_schema_type" DEFAULT 'page';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_og_type" "enum__posts_v_version_meta_og_type" DEFAULT 'website';
  ALTER TABLE "site_settings" ADD COLUMN "site_name" varchar DEFAULT 'Hause Interiors';
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "site_default_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "business_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "business_type" varchar DEFAULT 'InteriorDesignService';
  ALTER TABLE "site_settings" ADD COLUMN "business_telephone" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_street_address" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_locality" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_region" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_postal_code" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_country" varchar DEFAULT 'IN';
  ALTER TABLE "site_settings" ADD COLUMN "business_latitude" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_longitude" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_opening_hours" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_price_range" varchar;
  ALTER TABLE "site_settings_site_same_as" ADD CONSTRAINT "site_settings_site_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_business_area_served" ADD CONSTRAINT "site_settings_business_area_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_site_same_as_order_idx" ON "site_settings_site_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_site_same_as_parent_id_idx" ON "site_settings_site_same_as" USING btree ("_parent_id");
  CREATE INDEX "site_settings_business_area_served_order_idx" ON "site_settings_business_area_served" USING btree ("_order");
  CREATE INDEX "site_settings_business_area_served_parent_id_idx" ON "site_settings_business_area_served" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_site_default_image_id_media_id_fk" FOREIGN KEY ("site_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "site_settings_site_site_default_image_idx" ON "site_settings" USING btree ("site_default_image_id");

-- Mark this migration as applied, exactly as `payload migrate` would.
-- The batch number continues from whatever is already recorded, so the
-- history stays in order however many updates come later.
INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
SELECT '20260812_190051_seo', COALESCE(MAX("batch"), 0) + 1, now(), now() FROM "payload_migrations";

COMMIT;
