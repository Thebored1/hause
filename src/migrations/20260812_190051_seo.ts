import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE INDEX "site_settings_site_site_default_image_idx" ON "site_settings" USING btree ("site_default_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_site_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_business_area_served" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_site_same_as" CASCADE;
  DROP TABLE "site_settings_business_area_served" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_site_default_image_id_media_id_fk";
  
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "site_settings_site_site_default_image_idx";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_noindex";
  ALTER TABLE "pages" DROP COLUMN "meta_canonical";
  ALTER TABLE "pages" DROP COLUMN "meta_schema_type";
  ALTER TABLE "pages" DROP COLUMN "meta_og_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_noindex";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_schema_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_og_type";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_noindex";
  ALTER TABLE "posts" DROP COLUMN "meta_canonical";
  ALTER TABLE "posts" DROP COLUMN "meta_schema_type";
  ALTER TABLE "posts" DROP COLUMN "meta_og_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_noindex";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_schema_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_og_type";
  ALTER TABLE "site_settings" DROP COLUMN "site_name";
  ALTER TABLE "site_settings" DROP COLUMN "site_description";
  ALTER TABLE "site_settings" DROP COLUMN "site_default_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "business_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "business_type";
  ALTER TABLE "site_settings" DROP COLUMN "business_telephone";
  ALTER TABLE "site_settings" DROP COLUMN "business_email";
  ALTER TABLE "site_settings" DROP COLUMN "business_street_address";
  ALTER TABLE "site_settings" DROP COLUMN "business_locality";
  ALTER TABLE "site_settings" DROP COLUMN "business_region";
  ALTER TABLE "site_settings" DROP COLUMN "business_postal_code";
  ALTER TABLE "site_settings" DROP COLUMN "business_country";
  ALTER TABLE "site_settings" DROP COLUMN "business_latitude";
  ALTER TABLE "site_settings" DROP COLUMN "business_longitude";
  ALTER TABLE "site_settings" DROP COLUMN "business_opening_hours";
  ALTER TABLE "site_settings" DROP COLUMN "business_price_range";
  DROP TYPE "public"."enum_pages_meta_schema_type";
  DROP TYPE "public"."enum_pages_meta_og_type";
  DROP TYPE "public"."enum__pages_v_version_meta_schema_type";
  DROP TYPE "public"."enum__pages_v_version_meta_og_type";
  DROP TYPE "public"."enum_posts_meta_schema_type";
  DROP TYPE "public"."enum_posts_meta_og_type";
  DROP TYPE "public"."enum__posts_v_version_meta_schema_type";
  DROP TYPE "public"."enum__posts_v_version_meta_og_type";`)
}
