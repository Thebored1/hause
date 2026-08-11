-- Upgrade for a database that already ran 20260811_125959_initial.sql
--
-- Do NOT paste 20260811_142757_initial.sql on top of that database: it would
-- fail on the first statement, because the types and tables already exist.
--
-- The only schema difference between the two is one column. The contact form
-- has always asked the visitor for a budget, but the enquiries table had
-- nowhere to put it, so every submission dropped that answer.
--
-- The UPDATE renames the recorded migration to match the file now on disk.
-- Without it Payload sees 20260811_142757_initial as outstanding and a later
-- `payload migrate` would try to apply the entire schema a second time.
--
-- Safe to run twice: the ADD COLUMN is guarded by IF NOT EXISTS, and the
-- UPDATE matches nothing once it has already run.

BEGIN;

ALTER TABLE "enquiries" ADD COLUMN IF NOT EXISTS "budget" varchar;

UPDATE "payload_migrations"
   SET "name" = '20260811_142757_initial'
 WHERE "name" = '20260811_125959_initial';

COMMIT;

-- Check it worked - expect one row, budget / character varying:
--
--   SELECT column_name, data_type
--     FROM information_schema.columns
--    WHERE table_name = 'enquiries' AND column_name = 'budget';
--
-- And one row reading 20260811_142757_initial:
--
--   SELECT name FROM "payload_migrations";
