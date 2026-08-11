-- Hause Interiors - initial schema for Supabase (Postgres)
--
-- Extracted verbatim from src/migrations/20260811_142757_initial.ts, which is what
-- `payload migrate` would run. Paste the whole file into the Supabase SQL
-- editor and run it once, against an empty database.
--
-- Wrapped in a transaction: if any statement fails, nothing is applied and you
-- can fix and re-run, rather than being left half-migrated.
--
-- The final INSERT records the migration in `payload_migrations`. Without it
-- Payload considers this migration outstanding and would try to apply it again
-- on your next deploy, which would fail on tables that already exist.

BEGIN;
   CREATE TYPE "public"."enum_pages_blocks_services_grid_services_icon" AS ENUM('home', 'globe', 'sparkles', 'zap', 'layers', 'box');
  CREATE TYPE "public"."enum_pages_blocks_promo_banner_spacing" AS ENUM('normal', 'loose');
  CREATE TYPE "public"."enum_pages_blocks_promo_banner_card_shadow" AS ENUM('sm', 'md');
  CREATE TYPE "public"."enum_pages_blocks_pillars_grid_pillars_icon" AS ENUM('shield-check', 'file-check', 'target', 'eye', 'globe');
  CREATE TYPE "public"."enum_pages_blocks_process_deep_dive_steps_theme" AS ENUM('light', 'sand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_services_showcase_services_theme" AS ENUM('light', 'sand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_assurance_ribbon_cards_icon" AS ENUM('shield-check', 'clock', 'award');
  CREATE TYPE "public"."enum_pages_blocks_philosophy_grid_philosophies_icon" AS ENUM('compass', 'sliders', 'shield-check', 'award');
  CREATE TYPE "public"."enum_pages_blocks_checklist_feature_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_checklist_feature_tone" AS ENUM('ivory', 'sand');
  CREATE TYPE "public"."enum_pages_blocks_numbered_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_numbered_cards_tone" AS ENUM('ivory', 'sand');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_cards_icon" AS ENUM('clock', 'layout-grid', 'zap', 'shield-check', 'users', 'building', 'sparkles', 'layers', 'check-circle');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_title_tracking" AS ENUM('tight', 'normal');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_services_icon" AS ENUM('home', 'globe', 'sparkles', 'zap', 'layers', 'box');
  CREATE TYPE "public"."enum__pages_v_blocks_promo_banner_spacing" AS ENUM('normal', 'loose');
  CREATE TYPE "public"."enum__pages_v_blocks_promo_banner_card_shadow" AS ENUM('sm', 'md');
  CREATE TYPE "public"."enum__pages_v_blocks_pillars_grid_pillars_icon" AS ENUM('shield-check', 'file-check', 'target', 'eye', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_process_deep_dive_steps_theme" AS ENUM('light', 'sand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_services_showcase_services_theme" AS ENUM('light', 'sand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_assurance_ribbon_cards_icon" AS ENUM('shield-check', 'clock', 'award');
  CREATE TYPE "public"."enum__pages_v_blocks_philosophy_grid_philosophies_icon" AS ENUM('compass', 'sliders', 'shield-check', 'award');
  CREATE TYPE "public"."enum__pages_v_blocks_checklist_feature_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_checklist_feature_tone" AS ENUM('ivory', 'sand');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_cards_tone" AS ENUM('ivory', 'sand');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_cards_cards_icon" AS ENUM('clock', 'layout-grid', 'zap', 'shield-check', 'users', 'building', 'sparkles', 'layers', 'check-circle');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_cards_title_tracking" AS ENUM('tight', 'normal');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'quoted', 'won', 'closed');
  CREATE TYPE "public"."enum_site_settings_header_service_items_icon" AS ENUM('home', 'building', 'kitchen', 'layers', 'hammer');
  CREATE TABLE "pages_blocks_hero_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"name" varchar,
  	"image" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title_line1" varchar,
  	"title_line2" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"cta_href" varchar,
  	"secondary_label" varchar,
  	"secondary_href" varchar,
  	"spaces_label" varchar,
  	"stats_intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"icon" "enum_pages_blocks_services_grid_services_icon" DEFAULT 'home',
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Services',
  	"title" varchar DEFAULT 'Interior design services that work for the way you live.',
  	"intro" varchar,
  	"feature_image" varchar DEFAULT '/images/sp-living.jpg',
  	"stat_label" varchar DEFAULT 'Site Supervision',
  	"stat_value" varchar DEFAULT '100%',
  	"stat_body" varchar,
  	"cta_label" varchar DEFAULT 'Book a free consultation',
  	"cta_href" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"image" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"alt" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_us_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_why_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_locations_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"body" varchar,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"bg_image" varchar,
  	"studio_label" varchar,
  	"contact_label" varchar,
  	"studio_address" varchar,
  	"contact_details" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bg_image" varchar,
  	"primary_cta_text" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_text" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ask_title" varchar,
  	"ask_body" varchar,
  	"ask_label" varchar,
  	"ask_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_section_projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_section_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"location" varchar,
  	"area" varchar,
  	"scope" varchar,
  	"timeline" varchar,
  	"image" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details_budgets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details_next_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"address" varchar,
  	"hours" varchar,
  	"next_steps_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"spacing" "enum_pages_blocks_promo_banner_spacing" DEFAULT 'normal',
  	"card_shadow" "enum_pages_blocks_promo_banner_card_shadow" DEFAULT 'sm',
  	"show_arrow" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_regions_directory_regions_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_regions_directory_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"badge" varchar,
  	"subtext" varchar,
  	"desc" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_regions_directory" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"specialties_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pillars_grid_pillars_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_pillars_grid_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"icon" "enum_pages_blocks_pillars_grid_pillars_icon" DEFAULT 'shield-check'
  );
  
  CREATE TABLE "pages_blocks_pillars_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_columns_negatives" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_columns_positives" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"negative_label" varchar,
  	"positive_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rating_bar_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_rating_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stars" numeric,
  	"summary" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid_testimonials_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"client" varchar,
  	"designation" varchar,
  	"project" varchar,
  	"location" varchar,
  	"rating" numeric,
  	"quote" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_strip_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_deep_dive_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_process_deep_dive_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"image" varchar,
  	"theme" "enum_pages_blocks_process_deep_dive_steps_theme" DEFAULT 'light'
  );
  
  CREATE TABLE "pages_blocks_process_deep_dive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"deliverables_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_commitment_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_showcase_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_services_showcase_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"tagline" varchar,
  	"desc" varchar,
  	"image" varchar,
  	"theme" "enum_pages_blocks_services_showcase_services_theme" DEFAULT 'light',
  	"is_external_or_contact" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_services_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_assurance_ribbon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_assurance_ribbon_cards_icon" DEFAULT 'shield-check',
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_assurance_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_studio_story_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_studio_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body1" varchar,
  	"body2" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_eyebrow" varchar,
  	"image_caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_philosophy_grid_philosophies" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"icon" "enum_pages_blocks_philosophy_grid_philosophies_icon" DEFAULT 'compass'
  );
  
  CREATE TABLE "pages_blocks_philosophy_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_network_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_team_network" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_eyebrow" varchar,
  	"image_caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_ribbon_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_grid_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_values_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reach_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_checklist_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_checklist_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_side" "enum_pages_blocks_checklist_feature_image_side" DEFAULT 'right',
  	"tone" "enum_pages_blocks_checklist_feature_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"columns" "enum_pages_blocks_numbered_cards_columns" DEFAULT '3',
  	"tone" "enum_pages_blocks_numbered_cards_tone" DEFAULT 'sand',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_list_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_card_list_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_icon_cards_cards_icon" DEFAULT 'clock',
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"title_tracking" "enum_pages_blocks_icon_cards_title_tracking" DEFAULT 'tight',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stage_grid_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"wide" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_stage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_layout_cards_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"best_for" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_layout_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"best_for_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spec_feature_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"options" varchar
  );
  
  CREATE TABLE "pages_blocks_spec_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_dark_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_dark_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_property_cards_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_property_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_ribbon_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_project_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_dark_step_cards_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_dark_step_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"contact_modal" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"name" varchar,
  	"image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title_line1" varchar,
  	"title_line2" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"cta_href" varchar,
  	"secondary_label" varchar,
  	"secondary_href" varchar,
  	"spaces_label" varchar,
  	"stats_intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"icon" "enum__pages_v_blocks_services_grid_services_icon" DEFAULT 'home',
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Services',
  	"title" varchar DEFAULT 'Interior design services that work for the way you live.',
  	"intro" varchar,
  	"feature_image" varchar DEFAULT '/images/sp-living.jpg',
  	"stat_label" varchar DEFAULT 'Site Supervision',
  	"stat_value" varchar DEFAULT '100%',
  	"stat_body" varchar,
  	"cta_label" varchar DEFAULT 'Book a free consultation',
  	"cta_href" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"image" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"alt" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_us_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_locations_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"body" varchar,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"bg_image" varchar,
  	"studio_label" varchar,
  	"contact_label" varchar,
  	"studio_address" varchar,
  	"contact_details" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bg_image" varchar,
  	"primary_cta_text" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_text" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ask_title" varchar,
  	"ask_body" varchar,
  	"ask_label" varchar,
  	"ask_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_section_projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_section_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"category" varchar,
  	"location" varchar,
  	"area" varchar,
  	"scope" varchar,
  	"timeline" varchar,
  	"image" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details_budgets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details_next_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"address" varchar,
  	"hours" varchar,
  	"next_steps_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"spacing" "enum__pages_v_blocks_promo_banner_spacing" DEFAULT 'normal',
  	"card_shadow" "enum__pages_v_blocks_promo_banner_card_shadow" DEFAULT 'sm',
  	"show_arrow" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_regions_directory_regions_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_regions_directory_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"badge" varchar,
  	"subtext" varchar,
  	"desc" varchar,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_regions_directory" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"specialties_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars_grid_pillars_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars_grid_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"icon" "enum__pages_v_blocks_pillars_grid_pillars_icon" DEFAULT 'shield-check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_columns_negatives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_columns_positives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"negative_label" varchar,
  	"positive_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rating_bar_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rating_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stars" numeric,
  	"summary" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_grid_testimonials_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_grid_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"client" varchar,
  	"designation" varchar,
  	"project" varchar,
  	"location" varchar,
  	"rating" numeric,
  	"quote" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_strip_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_deep_dive_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_deep_dive_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"image" varchar,
  	"theme" "enum__pages_v_blocks_process_deep_dive_steps_theme" DEFAULT 'light',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_deep_dive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"deliverables_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_commitment_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_showcase_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_showcase_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"tagline" varchar,
  	"desc" varchar,
  	"image" varchar,
  	"theme" "enum__pages_v_blocks_services_showcase_services_theme" DEFAULT 'light',
  	"is_external_or_contact" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_assurance_ribbon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_assurance_ribbon_cards_icon" DEFAULT 'shield-check',
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_assurance_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_studio_story_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_studio_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body1" varchar,
  	"body2" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_eyebrow" varchar,
  	"image_caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_philosophy_grid_philosophies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"icon" "enum__pages_v_blocks_philosophy_grid_philosophies_icon" DEFAULT 'compass',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_philosophy_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_network_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_network" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_eyebrow" varchar,
  	"image_caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_ribbon_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_grid_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reach_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_checklist_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_checklist_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"image_side" "enum__pages_v_blocks_checklist_feature_image_side" DEFAULT 'right',
  	"tone" "enum__pages_v_blocks_checklist_feature_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_numbered_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_numbered_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"columns" "enum__pages_v_blocks_numbered_cards_columns" DEFAULT '3',
  	"tone" "enum__pages_v_blocks_numbered_cards_tone" DEFAULT 'sand',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_icon_cards_cards_icon" DEFAULT 'clock',
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"title_tracking" "enum__pages_v_blocks_icon_cards_title_tracking" DEFAULT 'tight',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stage_grid_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"wide" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_layout_cards_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"best_for" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_layout_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"best_for_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_feature_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"options" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image" varchar,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dark_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dark_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_property_cards_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_property_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_ribbon_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dark_step_cards_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dark_step_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_contact_modal" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'Hause Interiors',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'Hause Interiors',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"location" varchar,
  	"project_type" varchar,
  	"budget" varchar,
  	"message" varchar,
  	"source" varchar,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
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
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
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
  	"pages_id" integer,
  	"posts_id" integer,
  	"enquiries_id" integer,
  	"media_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "site_settings_header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_header_service_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"icon" "enum_site_settings_header_service_items_icon" DEFAULT 'home'
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"arrow" boolean DEFAULT false,
  	"external" boolean DEFAULT false,
  	"emphasis" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_bottom_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_logo" varchar,
  	"header_services_label" varchar,
  	"header_services_href" varchar,
  	"header_cta_label" varchar,
  	"header_cta_href" varchar,
  	"footer_logo" varchar,
  	"footer_contact_address" varchar,
  	"footer_contact_phone" varchar,
  	"footer_contact_email" varchar,
  	"footer_bottom_company_name" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_spaces" ADD CONSTRAINT "pages_blocks_hero_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_stats" ADD CONSTRAINT "pages_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_services" ADD CONSTRAINT "pages_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_cards" ADD CONSTRAINT "pages_blocks_portfolio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_strip" ADD CONSTRAINT "pages_blocks_portfolio_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio" ADD CONSTRAINT "pages_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us_reasons" ADD CONSTRAINT "pages_blocks_why_us_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us" ADD CONSTRAINT "pages_blocks_why_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_locations_cities" ADD CONSTRAINT "pages_blocks_locations_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_locations" ADD CONSTRAINT "pages_blocks_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero_breadcrumbs" ADD CONSTRAINT "pages_blocks_page_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section_items" ADD CONSTRAINT "pages_blocks_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_section_projects_highlights" ADD CONSTRAINT "pages_blocks_projects_section_projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_section_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_section_projects" ADD CONSTRAINT "pages_blocks_projects_section_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_section" ADD CONSTRAINT "pages_blocks_projects_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details_project_types" ADD CONSTRAINT "pages_blocks_contact_details_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details_budgets" ADD CONSTRAINT "pages_blocks_contact_details_budgets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details_next_steps" ADD CONSTRAINT "pages_blocks_contact_details_next_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details" ADD CONSTRAINT "pages_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner" ADD CONSTRAINT "pages_blocks_promo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_regions_directory_regions_specialties" ADD CONSTRAINT "pages_blocks_regions_directory_regions_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regions_directory_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_regions_directory_regions" ADD CONSTRAINT "pages_blocks_regions_directory_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regions_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_regions_directory" ADD CONSTRAINT "pages_blocks_regions_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars_grid_pillars_details" ADD CONSTRAINT "pages_blocks_pillars_grid_pillars_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillars_grid_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars_grid_pillars" ADD CONSTRAINT "pages_blocks_pillars_grid_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillars_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars_grid" ADD CONSTRAINT "pages_blocks_pillars_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_columns_negatives" ADD CONSTRAINT "pages_blocks_comparison_columns_negatives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_columns_positives" ADD CONSTRAINT "pages_blocks_comparison_columns_positives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_columns" ADD CONSTRAINT "pages_blocks_comparison_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rating_bar_facts" ADD CONSTRAINT "pages_blocks_rating_bar_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rating_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rating_bar" ADD CONSTRAINT "pages_blocks_rating_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid_testimonials_tags" ADD CONSTRAINT "pages_blocks_testimonials_grid_testimonials_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_grid_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_grid_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid" ADD CONSTRAINT "pages_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_strip_photos" ADD CONSTRAINT "pages_blocks_photo_strip_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_photo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_strip" ADD CONSTRAINT "pages_blocks_photo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_deep_dive_steps_deliverables" ADD CONSTRAINT "pages_blocks_process_deep_dive_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_deep_dive_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_deep_dive_steps" ADD CONSTRAINT "pages_blocks_process_deep_dive_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_deep_dive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_deep_dive" ADD CONSTRAINT "pages_blocks_process_deep_dive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_commitment_bar" ADD CONSTRAINT "pages_blocks_commitment_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_showcase_services_features" ADD CONSTRAINT "pages_blocks_services_showcase_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_showcase_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_showcase_services" ADD CONSTRAINT "pages_blocks_services_showcase_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_showcase" ADD CONSTRAINT "pages_blocks_services_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_assurance_ribbon_cards" ADD CONSTRAINT "pages_blocks_assurance_ribbon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_assurance_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_assurance_ribbon" ADD CONSTRAINT "pages_blocks_assurance_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_studio_story_stats" ADD CONSTRAINT "pages_blocks_studio_story_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_studio_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_studio_story" ADD CONSTRAINT "pages_blocks_studio_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_philosophy_grid_philosophies" ADD CONSTRAINT "pages_blocks_philosophy_grid_philosophies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_philosophy_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_philosophy_grid" ADD CONSTRAINT "pages_blocks_philosophy_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_network_points" ADD CONSTRAINT "pages_blocks_team_network_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_network" ADD CONSTRAINT "pages_blocks_team_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_ribbon_items" ADD CONSTRAINT "pages_blocks_gallery_ribbon_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_ribbon" ADD CONSTRAINT "pages_blocks_gallery_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_grid_values" ADD CONSTRAINT "pages_blocks_values_grid_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_grid" ADD CONSTRAINT "pages_blocks_values_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reach_bar" ADD CONSTRAINT "pages_blocks_reach_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checklist_feature_items" ADD CONSTRAINT "pages_blocks_checklist_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checklist_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checklist_feature" ADD CONSTRAINT "pages_blocks_checklist_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_cards_cards" ADD CONSTRAINT "pages_blocks_numbered_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_cards" ADD CONSTRAINT "pages_blocks_numbered_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_feature_cards" ADD CONSTRAINT "pages_blocks_card_list_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_list_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_feature" ADD CONSTRAINT "pages_blocks_card_list_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_cards" ADD CONSTRAINT "pages_blocks_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards" ADD CONSTRAINT "pages_blocks_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stage_grid_stages" ADD CONSTRAINT "pages_blocks_stage_grid_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stage_grid" ADD CONSTRAINT "pages_blocks_stage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layout_cards_options" ADD CONSTRAINT "pages_blocks_layout_cards_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_layout_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layout_cards" ADD CONSTRAINT "pages_blocks_layout_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_feature_specs" ADD CONSTRAINT "pages_blocks_spec_feature_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_feature" ADD CONSTRAINT "pages_blocks_spec_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dark_card_grid_cards" ADD CONSTRAINT "pages_blocks_dark_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dark_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dark_card_grid" ADD CONSTRAINT "pages_blocks_dark_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_property_cards_types" ADD CONSTRAINT "pages_blocks_property_cards_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_property_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_property_cards" ADD CONSTRAINT "pages_blocks_property_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_ribbon_photos" ADD CONSTRAINT "pages_blocks_project_ribbon_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_ribbon" ADD CONSTRAINT "pages_blocks_project_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dark_step_cards_steps" ADD CONSTRAINT "pages_blocks_dark_step_cards_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dark_step_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dark_step_cards" ADD CONSTRAINT "pages_blocks_dark_step_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_canvas" ADD CONSTRAINT "pages_blocks_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_spaces" ADD CONSTRAINT "_pages_v_blocks_hero_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_stats" ADD CONSTRAINT "_pages_v_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_services" ADD CONSTRAINT "_pages_v_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_cards" ADD CONSTRAINT "_pages_v_blocks_portfolio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_strip" ADD CONSTRAINT "_pages_v_blocks_portfolio_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio" ADD CONSTRAINT "_pages_v_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us_reasons" ADD CONSTRAINT "_pages_v_blocks_why_us_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us" ADD CONSTRAINT "_pages_v_blocks_why_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locations_cities" ADD CONSTRAINT "_pages_v_blocks_locations_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_locations" ADD CONSTRAINT "_pages_v_blocks_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_page_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_section_items" ADD CONSTRAINT "_pages_v_blocks_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_section" ADD CONSTRAINT "_pages_v_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_section_projects_highlights" ADD CONSTRAINT "_pages_v_blocks_projects_section_projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_section_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_section_projects" ADD CONSTRAINT "_pages_v_blocks_projects_section_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_section" ADD CONSTRAINT "_pages_v_blocks_projects_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details_project_types" ADD CONSTRAINT "_pages_v_blocks_contact_details_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details_budgets" ADD CONSTRAINT "_pages_v_blocks_contact_details_budgets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details_next_steps" ADD CONSTRAINT "_pages_v_blocks_contact_details_next_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details" ADD CONSTRAINT "_pages_v_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo_banner" ADD CONSTRAINT "_pages_v_blocks_promo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_regions_directory_regions_specialties" ADD CONSTRAINT "_pages_v_blocks_regions_directory_regions_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_regions_directory_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_regions_directory_regions" ADD CONSTRAINT "_pages_v_blocks_regions_directory_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_regions_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_regions_directory" ADD CONSTRAINT "_pages_v_blocks_regions_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars_grid_pillars_details" ADD CONSTRAINT "_pages_v_blocks_pillars_grid_pillars_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillars_grid_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars_grid_pillars" ADD CONSTRAINT "_pages_v_blocks_pillars_grid_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillars_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars_grid" ADD CONSTRAINT "_pages_v_blocks_pillars_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_columns_negatives" ADD CONSTRAINT "_pages_v_blocks_comparison_columns_negatives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_columns_positives" ADD CONSTRAINT "_pages_v_blocks_comparison_columns_positives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_columns" ADD CONSTRAINT "_pages_v_blocks_comparison_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rating_bar_facts" ADD CONSTRAINT "_pages_v_blocks_rating_bar_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rating_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rating_bar" ADD CONSTRAINT "_pages_v_blocks_rating_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_grid_testimonials_tags" ADD CONSTRAINT "_pages_v_blocks_testimonials_grid_testimonials_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_grid_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_grid_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_grid_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_grid" ADD CONSTRAINT "_pages_v_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_strip_photos" ADD CONSTRAINT "_pages_v_blocks_photo_strip_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_photo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_strip" ADD CONSTRAINT "_pages_v_blocks_photo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_deep_dive_steps_deliverables" ADD CONSTRAINT "_pages_v_blocks_process_deep_dive_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_deep_dive_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_deep_dive_steps" ADD CONSTRAINT "_pages_v_blocks_process_deep_dive_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_deep_dive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_deep_dive" ADD CONSTRAINT "_pages_v_blocks_process_deep_dive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_commitment_bar" ADD CONSTRAINT "_pages_v_blocks_commitment_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_showcase_services_features" ADD CONSTRAINT "_pages_v_blocks_services_showcase_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_showcase_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_showcase_services" ADD CONSTRAINT "_pages_v_blocks_services_showcase_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_showcase" ADD CONSTRAINT "_pages_v_blocks_services_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_assurance_ribbon_cards" ADD CONSTRAINT "_pages_v_blocks_assurance_ribbon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_assurance_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_assurance_ribbon" ADD CONSTRAINT "_pages_v_blocks_assurance_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_studio_story_stats" ADD CONSTRAINT "_pages_v_blocks_studio_story_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_studio_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_studio_story" ADD CONSTRAINT "_pages_v_blocks_studio_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_philosophy_grid_philosophies" ADD CONSTRAINT "_pages_v_blocks_philosophy_grid_philosophies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_philosophy_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_philosophy_grid" ADD CONSTRAINT "_pages_v_blocks_philosophy_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_network_points" ADD CONSTRAINT "_pages_v_blocks_team_network_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_network" ADD CONSTRAINT "_pages_v_blocks_team_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_ribbon_items" ADD CONSTRAINT "_pages_v_blocks_gallery_ribbon_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_ribbon" ADD CONSTRAINT "_pages_v_blocks_gallery_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_grid_values" ADD CONSTRAINT "_pages_v_blocks_values_grid_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_values_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_grid" ADD CONSTRAINT "_pages_v_blocks_values_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reach_bar" ADD CONSTRAINT "_pages_v_blocks_reach_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checklist_feature_items" ADD CONSTRAINT "_pages_v_blocks_checklist_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checklist_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checklist_feature" ADD CONSTRAINT "_pages_v_blocks_checklist_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_cards_cards" ADD CONSTRAINT "_pages_v_blocks_numbered_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbered_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_cards" ADD CONSTRAINT "_pages_v_blocks_numbered_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_feature_cards" ADD CONSTRAINT "_pages_v_blocks_card_list_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_list_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_feature" ADD CONSTRAINT "_pages_v_blocks_card_list_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_cards_cards" ADD CONSTRAINT "_pages_v_blocks_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_cards" ADD CONSTRAINT "_pages_v_blocks_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stage_grid_stages" ADD CONSTRAINT "_pages_v_blocks_stage_grid_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stage_grid" ADD CONSTRAINT "_pages_v_blocks_stage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_layout_cards_options" ADD CONSTRAINT "_pages_v_blocks_layout_cards_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_layout_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_layout_cards" ADD CONSTRAINT "_pages_v_blocks_layout_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_feature_specs" ADD CONSTRAINT "_pages_v_blocks_spec_feature_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_feature" ADD CONSTRAINT "_pages_v_blocks_spec_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dark_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_dark_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dark_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dark_card_grid" ADD CONSTRAINT "_pages_v_blocks_dark_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_property_cards_types" ADD CONSTRAINT "_pages_v_blocks_property_cards_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_property_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_property_cards" ADD CONSTRAINT "_pages_v_blocks_property_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_ribbon_photos" ADD CONSTRAINT "_pages_v_blocks_project_ribbon_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_ribbon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_ribbon" ADD CONSTRAINT "_pages_v_blocks_project_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dark_step_cards_steps" ADD CONSTRAINT "_pages_v_blocks_dark_step_cards_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dark_step_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dark_step_cards" ADD CONSTRAINT "_pages_v_blocks_dark_step_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_canvas" ADD CONSTRAINT "_pages_v_blocks_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_nav_links" ADD CONSTRAINT "site_settings_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_service_items" ADD CONSTRAINT "site_settings_header_service_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_bottom_notes" ADD CONSTRAINT "site_settings_footer_bottom_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_spaces_order_idx" ON "pages_blocks_hero_spaces" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_spaces_parent_id_idx" ON "pages_blocks_hero_spaces" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_stats_order_idx" ON "pages_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_stats_parent_id_idx" ON "pages_blocks_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_services_order_idx" ON "pages_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_services_parent_id_idx" ON "pages_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_cards_order_idx" ON "pages_blocks_portfolio_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_cards_parent_id_idx" ON "pages_blocks_portfolio_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_strip_order_idx" ON "pages_blocks_portfolio_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_strip_parent_id_idx" ON "pages_blocks_portfolio_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_order_idx" ON "pages_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_parent_id_idx" ON "pages_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_path_idx" ON "pages_blocks_portfolio" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_us_reasons_order_idx" ON "pages_blocks_why_us_reasons" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us_reasons_parent_id_idx" ON "pages_blocks_why_us_reasons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_us_order_idx" ON "pages_blocks_why_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us_parent_id_idx" ON "pages_blocks_why_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_us_path_idx" ON "pages_blocks_why_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_locations_cities_order_idx" ON "pages_blocks_locations_cities" USING btree ("_order");
  CREATE INDEX "pages_blocks_locations_cities_parent_id_idx" ON "pages_blocks_locations_cities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_locations_order_idx" ON "pages_blocks_locations" USING btree ("_order");
  CREATE INDEX "pages_blocks_locations_parent_id_idx" ON "pages_blocks_locations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_locations_path_idx" ON "pages_blocks_locations" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_hero_breadcrumbs_order_idx" ON "pages_blocks_page_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_breadcrumbs_parent_id_idx" ON "pages_blocks_page_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_section_items_order_idx" ON "pages_blocks_faq_section_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_section_items_parent_id_idx" ON "pages_blocks_faq_section_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_section_order_idx" ON "pages_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_section_parent_id_idx" ON "pages_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_section_path_idx" ON "pages_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_section_projects_highlights_order_idx" ON "pages_blocks_projects_section_projects_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_section_projects_highlights_parent_id_idx" ON "pages_blocks_projects_section_projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_section_projects_order_idx" ON "pages_blocks_projects_section_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_section_projects_parent_id_idx" ON "pages_blocks_projects_section_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_section_order_idx" ON "pages_blocks_projects_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_section_parent_id_idx" ON "pages_blocks_projects_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_section_path_idx" ON "pages_blocks_projects_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_details_project_types_order_idx" ON "pages_blocks_contact_details_project_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_project_types_parent_id_idx" ON "pages_blocks_contact_details_project_types" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_budgets_order_idx" ON "pages_blocks_contact_details_budgets" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_budgets_parent_id_idx" ON "pages_blocks_contact_details_budgets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_next_steps_order_idx" ON "pages_blocks_contact_details_next_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_next_steps_parent_id_idx" ON "pages_blocks_contact_details_next_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_order_idx" ON "pages_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_parent_id_idx" ON "pages_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_path_idx" ON "pages_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_promo_banner_order_idx" ON "pages_blocks_promo_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_promo_banner_parent_id_idx" ON "pages_blocks_promo_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promo_banner_path_idx" ON "pages_blocks_promo_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_regions_directory_regions_specialties_order_idx" ON "pages_blocks_regions_directory_regions_specialties" USING btree ("_order");
  CREATE INDEX "pages_blocks_regions_directory_regions_specialties_parent_id_idx" ON "pages_blocks_regions_directory_regions_specialties" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_regions_directory_regions_order_idx" ON "pages_blocks_regions_directory_regions" USING btree ("_order");
  CREATE INDEX "pages_blocks_regions_directory_regions_parent_id_idx" ON "pages_blocks_regions_directory_regions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_regions_directory_order_idx" ON "pages_blocks_regions_directory" USING btree ("_order");
  CREATE INDEX "pages_blocks_regions_directory_parent_id_idx" ON "pages_blocks_regions_directory" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_regions_directory_path_idx" ON "pages_blocks_regions_directory" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillars_grid_pillars_details_order_idx" ON "pages_blocks_pillars_grid_pillars_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_grid_pillars_details_parent_id_idx" ON "pages_blocks_pillars_grid_pillars_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_grid_pillars_order_idx" ON "pages_blocks_pillars_grid_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_grid_pillars_parent_id_idx" ON "pages_blocks_pillars_grid_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_grid_order_idx" ON "pages_blocks_pillars_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_grid_parent_id_idx" ON "pages_blocks_pillars_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_grid_path_idx" ON "pages_blocks_pillars_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_columns_negatives_order_idx" ON "pages_blocks_comparison_columns_negatives" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_columns_negatives_parent_id_idx" ON "pages_blocks_comparison_columns_negatives" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_columns_positives_order_idx" ON "pages_blocks_comparison_columns_positives" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_columns_positives_parent_id_idx" ON "pages_blocks_comparison_columns_positives" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_columns_order_idx" ON "pages_blocks_comparison_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_columns_parent_id_idx" ON "pages_blocks_comparison_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_columns_path_idx" ON "pages_blocks_comparison_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_rating_bar_facts_order_idx" ON "pages_blocks_rating_bar_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_rating_bar_facts_parent_id_idx" ON "pages_blocks_rating_bar_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rating_bar_order_idx" ON "pages_blocks_rating_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_rating_bar_parent_id_idx" ON "pages_blocks_rating_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rating_bar_path_idx" ON "pages_blocks_rating_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_grid_testimonials_tags_order_idx" ON "pages_blocks_testimonials_grid_testimonials_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_testimonials_tags_parent_id_idx" ON "pages_blocks_testimonials_grid_testimonials_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_testimonials_order_idx" ON "pages_blocks_testimonials_grid_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_testimonials_parent_id_idx" ON "pages_blocks_testimonials_grid_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_order_idx" ON "pages_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_parent_id_idx" ON "pages_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_path_idx" ON "pages_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_photo_strip_photos_order_idx" ON "pages_blocks_photo_strip_photos" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_strip_photos_parent_id_idx" ON "pages_blocks_photo_strip_photos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_strip_order_idx" ON "pages_blocks_photo_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_strip_parent_id_idx" ON "pages_blocks_photo_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_strip_path_idx" ON "pages_blocks_photo_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_deep_dive_steps_deliverables_order_idx" ON "pages_blocks_process_deep_dive_steps_deliverables" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_deep_dive_steps_deliverables_parent_id_idx" ON "pages_blocks_process_deep_dive_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_deep_dive_steps_order_idx" ON "pages_blocks_process_deep_dive_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_deep_dive_steps_parent_id_idx" ON "pages_blocks_process_deep_dive_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_deep_dive_order_idx" ON "pages_blocks_process_deep_dive" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_deep_dive_parent_id_idx" ON "pages_blocks_process_deep_dive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_deep_dive_path_idx" ON "pages_blocks_process_deep_dive" USING btree ("_path");
  CREATE INDEX "pages_blocks_commitment_bar_order_idx" ON "pages_blocks_commitment_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_commitment_bar_parent_id_idx" ON "pages_blocks_commitment_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_commitment_bar_path_idx" ON "pages_blocks_commitment_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_showcase_services_features_order_idx" ON "pages_blocks_services_showcase_services_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_showcase_services_features_parent_id_idx" ON "pages_blocks_services_showcase_services_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_showcase_services_order_idx" ON "pages_blocks_services_showcase_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_showcase_services_parent_id_idx" ON "pages_blocks_services_showcase_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_showcase_order_idx" ON "pages_blocks_services_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_showcase_parent_id_idx" ON "pages_blocks_services_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_showcase_path_idx" ON "pages_blocks_services_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_assurance_ribbon_cards_order_idx" ON "pages_blocks_assurance_ribbon_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_assurance_ribbon_cards_parent_id_idx" ON "pages_blocks_assurance_ribbon_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_assurance_ribbon_order_idx" ON "pages_blocks_assurance_ribbon" USING btree ("_order");
  CREATE INDEX "pages_blocks_assurance_ribbon_parent_id_idx" ON "pages_blocks_assurance_ribbon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_assurance_ribbon_path_idx" ON "pages_blocks_assurance_ribbon" USING btree ("_path");
  CREATE INDEX "pages_blocks_studio_story_stats_order_idx" ON "pages_blocks_studio_story_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_studio_story_stats_parent_id_idx" ON "pages_blocks_studio_story_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_studio_story_order_idx" ON "pages_blocks_studio_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_studio_story_parent_id_idx" ON "pages_blocks_studio_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_studio_story_path_idx" ON "pages_blocks_studio_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_philosophy_grid_philosophies_order_idx" ON "pages_blocks_philosophy_grid_philosophies" USING btree ("_order");
  CREATE INDEX "pages_blocks_philosophy_grid_philosophies_parent_id_idx" ON "pages_blocks_philosophy_grid_philosophies" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_philosophy_grid_order_idx" ON "pages_blocks_philosophy_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_philosophy_grid_parent_id_idx" ON "pages_blocks_philosophy_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_philosophy_grid_path_idx" ON "pages_blocks_philosophy_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_network_points_order_idx" ON "pages_blocks_team_network_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_network_points_parent_id_idx" ON "pages_blocks_team_network_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_network_order_idx" ON "pages_blocks_team_network" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_network_parent_id_idx" ON "pages_blocks_team_network" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_network_path_idx" ON "pages_blocks_team_network" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_ribbon_items_order_idx" ON "pages_blocks_gallery_ribbon_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_ribbon_items_parent_id_idx" ON "pages_blocks_gallery_ribbon_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_ribbon_order_idx" ON "pages_blocks_gallery_ribbon" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_ribbon_parent_id_idx" ON "pages_blocks_gallery_ribbon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_ribbon_path_idx" ON "pages_blocks_gallery_ribbon" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_grid_values_order_idx" ON "pages_blocks_values_grid_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_grid_values_parent_id_idx" ON "pages_blocks_values_grid_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_grid_order_idx" ON "pages_blocks_values_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_grid_parent_id_idx" ON "pages_blocks_values_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_grid_path_idx" ON "pages_blocks_values_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_reach_bar_order_idx" ON "pages_blocks_reach_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_reach_bar_parent_id_idx" ON "pages_blocks_reach_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reach_bar_path_idx" ON "pages_blocks_reach_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_checklist_feature_items_order_idx" ON "pages_blocks_checklist_feature_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_checklist_feature_items_parent_id_idx" ON "pages_blocks_checklist_feature_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checklist_feature_order_idx" ON "pages_blocks_checklist_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_checklist_feature_parent_id_idx" ON "pages_blocks_checklist_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checklist_feature_path_idx" ON "pages_blocks_checklist_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_cards_cards_order_idx" ON "pages_blocks_numbered_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_cards_cards_parent_id_idx" ON "pages_blocks_numbered_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_cards_order_idx" ON "pages_blocks_numbered_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_cards_parent_id_idx" ON "pages_blocks_numbered_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_cards_path_idx" ON "pages_blocks_numbered_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_list_feature_cards_order_idx" ON "pages_blocks_card_list_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_feature_cards_parent_id_idx" ON "pages_blocks_card_list_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_feature_order_idx" ON "pages_blocks_card_list_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_feature_parent_id_idx" ON "pages_blocks_card_list_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_feature_path_idx" ON "pages_blocks_card_list_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_cards_cards_order_idx" ON "pages_blocks_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_cards_parent_id_idx" ON "pages_blocks_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_order_idx" ON "pages_blocks_icon_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_parent_id_idx" ON "pages_blocks_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_path_idx" ON "pages_blocks_icon_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_stage_grid_stages_order_idx" ON "pages_blocks_stage_grid_stages" USING btree ("_order");
  CREATE INDEX "pages_blocks_stage_grid_stages_parent_id_idx" ON "pages_blocks_stage_grid_stages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stage_grid_order_idx" ON "pages_blocks_stage_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_stage_grid_parent_id_idx" ON "pages_blocks_stage_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stage_grid_path_idx" ON "pages_blocks_stage_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_layout_cards_options_order_idx" ON "pages_blocks_layout_cards_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_layout_cards_options_parent_id_idx" ON "pages_blocks_layout_cards_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_layout_cards_order_idx" ON "pages_blocks_layout_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_layout_cards_parent_id_idx" ON "pages_blocks_layout_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_layout_cards_path_idx" ON "pages_blocks_layout_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_spec_feature_specs_order_idx" ON "pages_blocks_spec_feature_specs" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_feature_specs_parent_id_idx" ON "pages_blocks_spec_feature_specs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_feature_order_idx" ON "pages_blocks_spec_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_feature_parent_id_idx" ON "pages_blocks_spec_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_feature_path_idx" ON "pages_blocks_spec_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_dark_card_grid_cards_order_idx" ON "pages_blocks_dark_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_dark_card_grid_cards_parent_id_idx" ON "pages_blocks_dark_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dark_card_grid_order_idx" ON "pages_blocks_dark_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_dark_card_grid_parent_id_idx" ON "pages_blocks_dark_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dark_card_grid_path_idx" ON "pages_blocks_dark_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_property_cards_types_order_idx" ON "pages_blocks_property_cards_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_property_cards_types_parent_id_idx" ON "pages_blocks_property_cards_types" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_property_cards_order_idx" ON "pages_blocks_property_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_property_cards_parent_id_idx" ON "pages_blocks_property_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_property_cards_path_idx" ON "pages_blocks_property_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_ribbon_photos_order_idx" ON "pages_blocks_project_ribbon_photos" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_ribbon_photos_parent_id_idx" ON "pages_blocks_project_ribbon_photos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_ribbon_order_idx" ON "pages_blocks_project_ribbon" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_ribbon_parent_id_idx" ON "pages_blocks_project_ribbon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_ribbon_path_idx" ON "pages_blocks_project_ribbon" USING btree ("_path");
  CREATE INDEX "pages_blocks_dark_step_cards_steps_order_idx" ON "pages_blocks_dark_step_cards_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_dark_step_cards_steps_parent_id_idx" ON "pages_blocks_dark_step_cards_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dark_step_cards_order_idx" ON "pages_blocks_dark_step_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_dark_step_cards_parent_id_idx" ON "pages_blocks_dark_step_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dark_step_cards_path_idx" ON "pages_blocks_dark_step_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_canvas_order_idx" ON "pages_blocks_canvas" USING btree ("_order");
  CREATE INDEX "pages_blocks_canvas_parent_id_idx" ON "pages_blocks_canvas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_canvas_path_idx" ON "pages_blocks_canvas" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_spaces_order_idx" ON "_pages_v_blocks_hero_spaces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_spaces_parent_id_idx" ON "_pages_v_blocks_hero_spaces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_stats_order_idx" ON "_pages_v_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_stats_parent_id_idx" ON "_pages_v_blocks_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_services_order_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_services_parent_id_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_order_idx" ON "_pages_v_blocks_portfolio_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_parent_id_idx" ON "_pages_v_blocks_portfolio_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_strip_order_idx" ON "_pages_v_blocks_portfolio_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_strip_parent_id_idx" ON "_pages_v_blocks_portfolio_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_order_idx" ON "_pages_v_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_parent_id_idx" ON "_pages_v_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_path_idx" ON "_pages_v_blocks_portfolio" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_us_reasons_order_idx" ON "_pages_v_blocks_why_us_reasons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_us_reasons_parent_id_idx" ON "_pages_v_blocks_why_us_reasons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_us_order_idx" ON "_pages_v_blocks_why_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_us_parent_id_idx" ON "_pages_v_blocks_why_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_us_path_idx" ON "_pages_v_blocks_why_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_locations_cities_order_idx" ON "_pages_v_blocks_locations_cities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_locations_cities_parent_id_idx" ON "_pages_v_blocks_locations_cities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_locations_order_idx" ON "_pages_v_blocks_locations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_locations_parent_id_idx" ON "_pages_v_blocks_locations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_locations_path_idx" ON "_pages_v_blocks_locations" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_hero_breadcrumbs_order_idx" ON "_pages_v_blocks_page_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_page_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_order_idx" ON "_pages_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_parent_id_idx" ON "_pages_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_path_idx" ON "_pages_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_section_items_order_idx" ON "_pages_v_blocks_faq_section_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_section_items_parent_id_idx" ON "_pages_v_blocks_faq_section_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_section_order_idx" ON "_pages_v_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_section_parent_id_idx" ON "_pages_v_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_section_path_idx" ON "_pages_v_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_section_projects_highlights_order_idx" ON "_pages_v_blocks_projects_section_projects_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_section_projects_highlights_parent_id_idx" ON "_pages_v_blocks_projects_section_projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_section_projects_order_idx" ON "_pages_v_blocks_projects_section_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_section_projects_parent_id_idx" ON "_pages_v_blocks_projects_section_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_section_order_idx" ON "_pages_v_blocks_projects_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_section_parent_id_idx" ON "_pages_v_blocks_projects_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_section_path_idx" ON "_pages_v_blocks_projects_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_details_project_types_order_idx" ON "_pages_v_blocks_contact_details_project_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_project_types_parent_id_idx" ON "_pages_v_blocks_contact_details_project_types" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_budgets_order_idx" ON "_pages_v_blocks_contact_details_budgets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_budgets_parent_id_idx" ON "_pages_v_blocks_contact_details_budgets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_next_steps_order_idx" ON "_pages_v_blocks_contact_details_next_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_next_steps_parent_id_idx" ON "_pages_v_blocks_contact_details_next_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_order_idx" ON "_pages_v_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_parent_id_idx" ON "_pages_v_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_path_idx" ON "_pages_v_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promo_banner_order_idx" ON "_pages_v_blocks_promo_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promo_banner_parent_id_idx" ON "_pages_v_blocks_promo_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promo_banner_path_idx" ON "_pages_v_blocks_promo_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_regions_directory_regions_specialties_order_idx" ON "_pages_v_blocks_regions_directory_regions_specialties" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_regions_directory_regions_specialties_parent_id_idx" ON "_pages_v_blocks_regions_directory_regions_specialties" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_regions_directory_regions_order_idx" ON "_pages_v_blocks_regions_directory_regions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_regions_directory_regions_parent_id_idx" ON "_pages_v_blocks_regions_directory_regions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_regions_directory_order_idx" ON "_pages_v_blocks_regions_directory" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_regions_directory_parent_id_idx" ON "_pages_v_blocks_regions_directory" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_regions_directory_path_idx" ON "_pages_v_blocks_regions_directory" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillars_grid_pillars_details_order_idx" ON "_pages_v_blocks_pillars_grid_pillars_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_grid_pillars_details_parent_id_idx" ON "_pages_v_blocks_pillars_grid_pillars_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_grid_pillars_order_idx" ON "_pages_v_blocks_pillars_grid_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_grid_pillars_parent_id_idx" ON "_pages_v_blocks_pillars_grid_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_grid_order_idx" ON "_pages_v_blocks_pillars_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_grid_parent_id_idx" ON "_pages_v_blocks_pillars_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_grid_path_idx" ON "_pages_v_blocks_pillars_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_columns_negatives_order_idx" ON "_pages_v_blocks_comparison_columns_negatives" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_columns_negatives_parent_id_idx" ON "_pages_v_blocks_comparison_columns_negatives" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_columns_positives_order_idx" ON "_pages_v_blocks_comparison_columns_positives" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_columns_positives_parent_id_idx" ON "_pages_v_blocks_comparison_columns_positives" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_columns_order_idx" ON "_pages_v_blocks_comparison_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_columns_parent_id_idx" ON "_pages_v_blocks_comparison_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_columns_path_idx" ON "_pages_v_blocks_comparison_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rating_bar_facts_order_idx" ON "_pages_v_blocks_rating_bar_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rating_bar_facts_parent_id_idx" ON "_pages_v_blocks_rating_bar_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rating_bar_order_idx" ON "_pages_v_blocks_rating_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rating_bar_parent_id_idx" ON "_pages_v_blocks_rating_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rating_bar_path_idx" ON "_pages_v_blocks_rating_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_testimonials_tags_order_idx" ON "_pages_v_blocks_testimonials_grid_testimonials_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_testimonials_tags_parent_id_idx" ON "_pages_v_blocks_testimonials_grid_testimonials_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_testimonials_order_idx" ON "_pages_v_blocks_testimonials_grid_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_grid_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_order_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_parent_id_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_path_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_photo_strip_photos_order_idx" ON "_pages_v_blocks_photo_strip_photos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_strip_photos_parent_id_idx" ON "_pages_v_blocks_photo_strip_photos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_strip_order_idx" ON "_pages_v_blocks_photo_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_strip_parent_id_idx" ON "_pages_v_blocks_photo_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_strip_path_idx" ON "_pages_v_blocks_photo_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_steps_deliverables_order_idx" ON "_pages_v_blocks_process_deep_dive_steps_deliverables" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_steps_deliverables_parent_id_idx" ON "_pages_v_blocks_process_deep_dive_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_steps_order_idx" ON "_pages_v_blocks_process_deep_dive_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_steps_parent_id_idx" ON "_pages_v_blocks_process_deep_dive_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_order_idx" ON "_pages_v_blocks_process_deep_dive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_parent_id_idx" ON "_pages_v_blocks_process_deep_dive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_deep_dive_path_idx" ON "_pages_v_blocks_process_deep_dive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_commitment_bar_order_idx" ON "_pages_v_blocks_commitment_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_commitment_bar_parent_id_idx" ON "_pages_v_blocks_commitment_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_commitment_bar_path_idx" ON "_pages_v_blocks_commitment_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_showcase_services_features_order_idx" ON "_pages_v_blocks_services_showcase_services_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_showcase_services_features_parent_id_idx" ON "_pages_v_blocks_services_showcase_services_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_showcase_services_order_idx" ON "_pages_v_blocks_services_showcase_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_showcase_services_parent_id_idx" ON "_pages_v_blocks_services_showcase_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_showcase_order_idx" ON "_pages_v_blocks_services_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_showcase_parent_id_idx" ON "_pages_v_blocks_services_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_showcase_path_idx" ON "_pages_v_blocks_services_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_assurance_ribbon_cards_order_idx" ON "_pages_v_blocks_assurance_ribbon_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_assurance_ribbon_cards_parent_id_idx" ON "_pages_v_blocks_assurance_ribbon_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_assurance_ribbon_order_idx" ON "_pages_v_blocks_assurance_ribbon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_assurance_ribbon_parent_id_idx" ON "_pages_v_blocks_assurance_ribbon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_assurance_ribbon_path_idx" ON "_pages_v_blocks_assurance_ribbon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_studio_story_stats_order_idx" ON "_pages_v_blocks_studio_story_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_studio_story_stats_parent_id_idx" ON "_pages_v_blocks_studio_story_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_studio_story_order_idx" ON "_pages_v_blocks_studio_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_studio_story_parent_id_idx" ON "_pages_v_blocks_studio_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_studio_story_path_idx" ON "_pages_v_blocks_studio_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_philosophy_grid_philosophies_order_idx" ON "_pages_v_blocks_philosophy_grid_philosophies" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_philosophy_grid_philosophies_parent_id_idx" ON "_pages_v_blocks_philosophy_grid_philosophies" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_philosophy_grid_order_idx" ON "_pages_v_blocks_philosophy_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_philosophy_grid_parent_id_idx" ON "_pages_v_blocks_philosophy_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_philosophy_grid_path_idx" ON "_pages_v_blocks_philosophy_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_network_points_order_idx" ON "_pages_v_blocks_team_network_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_network_points_parent_id_idx" ON "_pages_v_blocks_team_network_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_network_order_idx" ON "_pages_v_blocks_team_network" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_network_parent_id_idx" ON "_pages_v_blocks_team_network" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_network_path_idx" ON "_pages_v_blocks_team_network" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_ribbon_items_order_idx" ON "_pages_v_blocks_gallery_ribbon_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_ribbon_items_parent_id_idx" ON "_pages_v_blocks_gallery_ribbon_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_ribbon_order_idx" ON "_pages_v_blocks_gallery_ribbon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_ribbon_parent_id_idx" ON "_pages_v_blocks_gallery_ribbon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_ribbon_path_idx" ON "_pages_v_blocks_gallery_ribbon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_grid_values_order_idx" ON "_pages_v_blocks_values_grid_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_grid_values_parent_id_idx" ON "_pages_v_blocks_values_grid_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_grid_order_idx" ON "_pages_v_blocks_values_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_grid_parent_id_idx" ON "_pages_v_blocks_values_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_grid_path_idx" ON "_pages_v_blocks_values_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reach_bar_order_idx" ON "_pages_v_blocks_reach_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reach_bar_parent_id_idx" ON "_pages_v_blocks_reach_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reach_bar_path_idx" ON "_pages_v_blocks_reach_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_checklist_feature_items_order_idx" ON "_pages_v_blocks_checklist_feature_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checklist_feature_items_parent_id_idx" ON "_pages_v_blocks_checklist_feature_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checklist_feature_order_idx" ON "_pages_v_blocks_checklist_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checklist_feature_parent_id_idx" ON "_pages_v_blocks_checklist_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checklist_feature_path_idx" ON "_pages_v_blocks_checklist_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_numbered_cards_cards_order_idx" ON "_pages_v_blocks_numbered_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_cards_cards_parent_id_idx" ON "_pages_v_blocks_numbered_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_cards_order_idx" ON "_pages_v_blocks_numbered_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_cards_parent_id_idx" ON "_pages_v_blocks_numbered_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_cards_path_idx" ON "_pages_v_blocks_numbered_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_list_feature_cards_order_idx" ON "_pages_v_blocks_card_list_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_feature_cards_parent_id_idx" ON "_pages_v_blocks_card_list_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_feature_order_idx" ON "_pages_v_blocks_card_list_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_feature_parent_id_idx" ON "_pages_v_blocks_card_list_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_feature_path_idx" ON "_pages_v_blocks_card_list_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_cards_cards_order_idx" ON "_pages_v_blocks_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_cards_cards_parent_id_idx" ON "_pages_v_blocks_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_order_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_cards_parent_id_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_path_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stage_grid_stages_order_idx" ON "_pages_v_blocks_stage_grid_stages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stage_grid_stages_parent_id_idx" ON "_pages_v_blocks_stage_grid_stages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stage_grid_order_idx" ON "_pages_v_blocks_stage_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stage_grid_parent_id_idx" ON "_pages_v_blocks_stage_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stage_grid_path_idx" ON "_pages_v_blocks_stage_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_layout_cards_options_order_idx" ON "_pages_v_blocks_layout_cards_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_layout_cards_options_parent_id_idx" ON "_pages_v_blocks_layout_cards_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_layout_cards_order_idx" ON "_pages_v_blocks_layout_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_layout_cards_parent_id_idx" ON "_pages_v_blocks_layout_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_layout_cards_path_idx" ON "_pages_v_blocks_layout_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spec_feature_specs_order_idx" ON "_pages_v_blocks_spec_feature_specs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_feature_specs_parent_id_idx" ON "_pages_v_blocks_spec_feature_specs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_feature_order_idx" ON "_pages_v_blocks_spec_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_feature_parent_id_idx" ON "_pages_v_blocks_spec_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_feature_path_idx" ON "_pages_v_blocks_spec_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_dark_card_grid_cards_order_idx" ON "_pages_v_blocks_dark_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dark_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_dark_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dark_card_grid_order_idx" ON "_pages_v_blocks_dark_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dark_card_grid_parent_id_idx" ON "_pages_v_blocks_dark_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dark_card_grid_path_idx" ON "_pages_v_blocks_dark_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_property_cards_types_order_idx" ON "_pages_v_blocks_property_cards_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_property_cards_types_parent_id_idx" ON "_pages_v_blocks_property_cards_types" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_property_cards_order_idx" ON "_pages_v_blocks_property_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_property_cards_parent_id_idx" ON "_pages_v_blocks_property_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_property_cards_path_idx" ON "_pages_v_blocks_property_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_ribbon_photos_order_idx" ON "_pages_v_blocks_project_ribbon_photos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_ribbon_photos_parent_id_idx" ON "_pages_v_blocks_project_ribbon_photos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_ribbon_order_idx" ON "_pages_v_blocks_project_ribbon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_ribbon_parent_id_idx" ON "_pages_v_blocks_project_ribbon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_ribbon_path_idx" ON "_pages_v_blocks_project_ribbon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_dark_step_cards_steps_order_idx" ON "_pages_v_blocks_dark_step_cards_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dark_step_cards_steps_parent_id_idx" ON "_pages_v_blocks_dark_step_cards_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dark_step_cards_order_idx" ON "_pages_v_blocks_dark_step_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dark_step_cards_parent_id_idx" ON "_pages_v_blocks_dark_step_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dark_step_cards_path_idx" ON "_pages_v_blocks_dark_step_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_canvas_order_idx" ON "_pages_v_blocks_canvas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_canvas_parent_id_idx" ON "_pages_v_blocks_canvas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_canvas_path_idx" ON "_pages_v_blocks_canvas" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_header_nav_links_order_idx" ON "site_settings_header_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_header_nav_links_parent_id_idx" ON "site_settings_header_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_header_service_items_order_idx" ON "site_settings_header_service_items" USING btree ("_order");
  CREATE INDEX "site_settings_header_service_items_parent_id_idx" ON "site_settings_header_service_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_bottom_notes_order_idx" ON "site_settings_footer_bottom_notes" USING btree ("_order");
  CREATE INDEX "site_settings_footer_bottom_notes_parent_id_idx" ON "site_settings_footer_bottom_notes" USING btree ("_parent_id");

-- Mark this migration as applied, exactly as `payload migrate` would.
INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
VALUES ('20260811_142757_initial', 1, now(), now());

COMMIT;
