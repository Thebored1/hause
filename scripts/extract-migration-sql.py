"""Extracts the raw SQL from the Payload migration into a paste-ready file.

The migration is TypeScript wrapping one tagged template per direction. This
pulls the `up` template out verbatim — no rewriting, so what you paste is
exactly what `payload migrate` would have executed.

Two things are added on top of the extracted DDL, both of which Payload would
otherwise do for you:

  - a transaction, so a failure half-way leaves the database untouched rather
    than half-migrated
  - a row in `payload_migrations`, so Payload knows this migration has already
    run and does not try to apply it again on the next deploy

Verified rather than assumed: the script asserts the `up` template contains no
`${...}` interpolation and no escaped backticks, which would mean the raw text
is not literal SQL.
"""
import io
import re

SRC = 'src/migrations/20260812_190051_seo.ts'
NAME = '20260812_190051_seo'
OUT = 'src/migrations/20260812_190051_seo.sql'

s = io.open(SRC, encoding='utf-8').read()

up_start = s.index('export async function up')
down_start = s.index('export async function down')
up = s[up_start:down_start]

# The single tagged template inside `up`.
open_tok = 'sql`'
i = up.index(open_tok) + len(open_tok)
j = up.index('`', i)
body = up[i:j]

assert up.count(open_tok) == 1, 'expected exactly one sql`` block in up()'
assert '${' not in body, 'template interpolation found — not literal SQL'
assert '\\`' not in body, 'escaped backtick found — not literal SQL'
# An initial migration builds payload_migrations itself; a later one expects
# it to exist already. That difference decides both the wording and the batch
# number below, so it is detected rather than assumed.
is_initial = 'CREATE TABLE "payload_migrations"' in body

header = """-- Hause Interiors - %s for Supabase (Postgres)
--
-- Extracted verbatim from src/migrations/%s.ts, which is what
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
""" % ('initial schema' if is_initial else 'schema update', NAME)

footer = """
-- Mark this migration as applied, exactly as `payload migrate` would.
-- The batch number continues from whatever is already recorded, so the
-- history stays in order however many updates come later.
INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
SELECT '%s', COALESCE(MAX("batch"), 0) + 1, now(), now() FROM "payload_migrations";

COMMIT;
""" % NAME

io.open(OUT, 'w', encoding='utf-8', newline='\n').write(header + body.strip('\n') + '\n' + footer)

lines = (header + body + footer).count('\n')
print('wrote %s  (%d statements, %d lines)' % (OUT, body.count(';'), lines))
